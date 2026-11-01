import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { approachSteps, navItems, profile } from '../content'

describe('App rendering', () => {
  it('renders the hero with name, role and both calls to action', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: profile.name })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /view my work/i })).toHaveAttribute('href', '#work')
    expect(screen.getAllByRole('link', { name: /download resume/i }).length).toBeGreaterThan(0)
  })

  it('renders every section listed in the navigation', () => {
    const { container } = render(<App />)
    for (const item of navItems) {
      const section = container.querySelector(`section#${item.id}`)
      expect(section, `section #${item.id}`).not.toBeNull()
      expect(within(section as HTMLElement).getByRole('heading', { level: 2 })).toBeInTheDocument()
    }
  })

  it('has exactly one h1 and core landmarks', () => {
    render(<App />)
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('provides a skip link to the main content', () => {
    render(<App />)
    const skip = screen.getByRole('link', { name: /skip to main content/i })
    expect(skip).toHaveAttribute('href', '#main')
    expect(document.getElementById('main')).not.toBeNull()
  })

  it('shows the current year in the footer', () => {
    render(<App />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveTextContent(`© ${new Date().getFullYear()} ${profile.name}`)
  })

  it('never shows unfinished [placeholder] text on the live site', () => {
    const { container } = render(<App />)
    expect(container.querySelectorAll('[data-placeholder]')).toHaveLength(0)
    expect(container.textContent).not.toMatch(/\[[^\]]+\]/)
  })

  it('exposes the full rotating headline and real stat values to screen readers', () => {
    render(<App />)
    const hero = document.getElementById('top') as HTMLElement
    for (const word of profile.rotatingWords) {
      expect(hero).toHaveTextContent(word)
    }
    for (const stat of profile.stats) {
      expect(within(hero).getByText(`${stat.value}${stat.suffix ?? ''}`, { selector: '.sr-only' })).toBeInTheDocument()
    }
  })

  it('renders every approach step', () => {
    render(<App />)
    const approach = document.getElementById('approach') as HTMLElement
    for (const step of approachSteps) {
      expect(within(approach).getByRole('heading', { level: 3, name: step.title })).toBeInTheDocument()
    }
  })

  it('never renders raw HTML from content', () => {
    const { container } = render(<App />)
    expect(container.innerHTML).not.toMatch(/<script/i)
  })
})
