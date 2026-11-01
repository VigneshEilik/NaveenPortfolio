import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { CaseStudyCard, Work } from '../components/sections/Work'
import { COPIES } from '../components/ui/HorizontalScroller'
import { caseStudies, type CaseStudy } from '../content'
import { installMatchMedia } from './setup'

const realStudy: CaseStudy = {
  isSample: false,
  title: 'Test Trip',
  category: 'International',
  duration: '4 nights / 5 days',
  summary: 'Summary text',
  brief: 'Brief text',
  approach: 'Approach text',
  services: ['Hotels', 'Transfers'],
  highlights: ['Highlight one'],
  outline: ['Day 1 — Arrive', 'Day 2 — Explore'],
  photo: { src: '/images/photos/test', widths: [640, 1080], aspect: 1.5, alt: 'Beach at sunset' },
  link: { label: 'View itinerary', href: 'https://example.org/itinerary.pdf' },
}

describe('Featured work cards', () => {
  it('renders one card per case study with its title', () => {
    render(<Work />)
    const section = document.getElementById('work') as HTMLElement
    expect(within(section).getAllByRole('article')).toHaveLength(caseStudies.length)
    for (const study of caseStudies) {
      expect(within(section).getByRole('heading', { level: 3, name: study.title })).toBeInTheDocument()
    }
  })

  it('includes at least three international trips', () => {
    expect(caseStudies.filter((s) => s.category === 'International').length).toBeGreaterThanOrEqual(3)
  })

  it('sets every card up for the staggered jump-in animation', () => {
    render(<Work />)
    const items = document.querySelectorAll<HTMLLIElement>('#work li[data-jump]:not([aria-hidden])')
    expect(items).toHaveLength(caseStudies.length)
    items.forEach((item, i) => expect(item.style.getPropertyValue('--i')).toBe(String(i)))
  })

  it('lays the trips out in one auto-scrolling, labelled row without controls', () => {
    render(<Work />)
    const row = screen.getByRole('list', { name: /case studies \(auto-scrolling\)/i })
    // Accessible cards: exactly one per trip.
    expect(within(row).getAllByRole('listitem').filter((li) => li.parentElement === row)).toHaveLength(caseStudies.length)
    expect(screen.queryByRole('button', { name: /auto-scroll|previous card|next card/i })).not.toBeInTheDocument()
  })

  it('renders hidden, non-focusable copies so the loop is seamless', () => {
    render(<Work />)
    const all = document.querySelectorAll<HTMLLIElement>('#work li[data-jump]')
    expect(all).toHaveLength(caseStudies.length * COPIES)
    const copies = [...all].filter((li) => li.getAttribute('aria-hidden') === 'true')
    expect(copies).toHaveLength(caseStudies.length * (COPIES - 1))
    for (const li of copies) expect(li.hasAttribute('inert')).toBe(true)
  })


  it('tilts toward a mouse pointer and resets on leave', () => {
    render(<CaseStudyCard study={realStudy} />)
    const card = screen.getByRole('article')
    card.getBoundingClientRect = () => ({ left: 0, top: 0, width: 400, height: 600, right: 400, bottom: 600, x: 0, y: 0, toJSON: () => ({}) })
    fireEvent.pointerMove(card, { pointerType: 'mouse', clientX: 300, clientY: 150 })
    expect(card.style.transform).toMatch(/rotateX\(.+\) rotateY\(.+\)/)
    fireEvent.pointerLeave(card)
    expect(card.style.transform).toBe('')
  })

  it('does not tilt for visitors who prefer reduced motion', () => {
    installMatchMedia(true)
    render(<CaseStudyCard study={realStudy} />)
    const card = screen.getByRole('article')
    fireEvent.pointerMove(card, { pointerType: 'mouse', clientX: 300, clientY: 150 })
    expect(card.style.transform).toBe('')
  })

  it('labels sample entries and shows the sample notice', () => {
    render(<Work />)
    const sampleCount = caseStudies.filter((s) => s.isSample).length
    const visibleBadges = screen.queryAllByText('Sample', { selector: 'span' }).filter((el) => !el.closest('[aria-hidden="true"]'))
    expect(visibleBadges).toHaveLength(sampleCount)
    expect(screen.queryAllByRole('note')).toHaveLength(sampleCount > 0 ? 1 : 0)
  })

  it('expands the glass panel to reveal trip details', async () => {
    const user = userEvent.setup()
    render(<CaseStudyCard study={realStudy} />)
    const toggle = screen.getByRole('button', { name: /view test trip details/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('tab', { name: 'Brief' })).not.toBeInTheDocument()

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(document.getElementById(toggle.getAttribute('aria-controls') ?? '')).toBeVisible()
    expect(screen.getByRole('button', { name: /hide test trip details/i })).toBe(toggle)
  })

  it('shows the brief by default and switches tabs on click', async () => {
    const user = userEvent.setup()
    render(<CaseStudyCard study={realStudy} />)
    await user.click(screen.getByRole('button', { name: /view test trip details/i }))
    expect(screen.getByRole('tab', { name: 'Brief' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Brief text')).toBeVisible()
    expect(screen.getByText('Approach text')).toBeVisible()
    expect(screen.getByText('Day 2 — Explore')).not.toBeVisible()

    await user.click(screen.getByRole('tab', { name: 'Itinerary' }))
    expect(screen.getByRole('tab', { name: 'Itinerary' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('Day 2 — Explore')).toBeVisible()
    expect(screen.getByText('Brief text')).not.toBeVisible()

    await user.click(screen.getByRole('tab', { name: 'Services' }))
    expect(within(screen.getByRole('list', { name: /services coordinated/i })).getAllByRole('listitem')).toHaveLength(2)
  })

  it('supports arrow-key, Home and End navigation between tabs', async () => {
    const user = userEvent.setup()
    render(<CaseStudyCard study={realStudy} />)
    await user.click(screen.getByRole('button', { name: /view test trip details/i }))
    const brief = screen.getByRole('tab', { name: 'Brief' })
    brief.focus()

    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Itinerary' })).toHaveFocus()
    await user.keyboard('{End}')
    expect(screen.getByRole('tab', { name: 'Services' })).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(brief).toHaveFocus()
    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('tab', { name: 'Services' })).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{Home}')
    expect(brief).toHaveAttribute('aria-selected', 'true')
    // Only the active tab is in the Tab order (roving tabindex).
    expect(screen.getAllByRole('tab').filter((t) => t.getAttribute('tabindex') === '0')).toHaveLength(1)
  })

  it('does not show the sample badge for real work', () => {
    render(<CaseStudyCard study={realStudy} />)
    expect(screen.queryByText('Sample')).not.toBeInTheDocument()
  })

  it('lazy-loads responsive project photos with alt text and explicit dimensions', () => {
    render(<CaseStudyCard study={realStudy} />)
    const img = screen.getByRole('img', { name: 'Beach at sunset' })
    expect(img).toHaveAttribute('loading', 'lazy')
    expect(img.getAttribute('srcset')).toBe('/images/photos/test-640.webp 640w, /images/photos/test-1080.webp 1080w')
    expect(img).toHaveAttribute('sizes')
    expect(img).toHaveAttribute('decoding', 'async')
    expect(img).toHaveAttribute('width')
    expect(img).toHaveAttribute('height')
  })

  it('uses an illustration when no photo is provided', () => {
    const { container } = render(<CaseStudyCard study={{ ...realStudy, photo: null }} />)
    expect(container.querySelector('img')).toBeNull()
    expect(container.querySelector('[aria-hidden="true"] svg')).not.toBeNull()
  })

  it('opens project links safely in a new tab', async () => {
    const user = userEvent.setup()
    render(<CaseStudyCard study={realStudy} />)
    await user.click(screen.getByRole('button', { name: /view test trip details/i }))
    const link = screen.getByRole('link', { name: /view itinerary/i })
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('neutralises unsafe project links', async () => {
    const user = userEvent.setup()
    render(<CaseStudyCard study={{ ...realStudy, link: { label: 'Bad', href: 'javascript:alert(1)' } }} />)
    await user.click(screen.getByRole('button', { name: /view test trip details/i }))
    expect(screen.getByRole('link', { name: /bad/i })).toHaveAttribute('href', '#')
  })
})
