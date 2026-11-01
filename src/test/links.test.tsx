import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import App from '../App'
import { contact, profile } from '../content'
import { isExternalHref, mailtoHref, safeHref, telHref } from '../lib/links'

describe('safeHref', () => {
  it.each([
    ['https://www.linkedin.com/in/x', 'https://www.linkedin.com/in/x'],
    ['mailto:a@b.com', 'mailto:a@b.com'],
    ['tel:+911234', 'tel:+911234'],
    ['#contact', '#contact'],
    ['/resume/file.pdf', '/resume/file.pdf'],
  ])('allows %s', (input, expected) => {
    expect(safeHref(input)).toBe(expected)
  })

  it.each(['javascript:alert(1)', ' JavaScript:alert(1)', 'data:text/html,<script>', 'vbscript:x', '//evil.example', 'not a url'])(
    'blocks %s',
    (input) => {
      expect(safeHref(input)).toBe('#')
    },
  )

  it('detects external links', () => {
    expect(isExternalHref('https://x.com')).toBe(true)
    expect(isExternalHref('#about')).toBe(false)
    expect(isExternalHref('mailto:a@b.com')).toBe(false)
  })

  it('builds encoded mailto and tel links', () => {
    expect(mailtoHref('a@b.com', 'Hi & hello')).toBe('mailto:a@b.com?subject=Hi%20%26%20hello')
    expect(telHref('+91 98765 43210')).toBe('tel:+919876543210')
  })
})

describe('Links in the rendered page', () => {
  it('every external link opens in a new tab with noopener noreferrer', () => {
    const { container } = render(<App />)
    const external = [...container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]')]
    expect(external.length).toBeGreaterThan(0)
    for (const link of external) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link.getAttribute('rel')).toBe('noopener noreferrer')
    }
  })

  it('no link uses a dangerous protocol', () => {
    const { container } = render(<App />)
    for (const link of container.querySelectorAll('a[href]')) {
      expect(link.getAttribute('href')).not.toMatch(/^\s*(javascript|data|vbscript):/i)
    }
  })

  it('LinkedIn links point to the configured profile', () => {
    render(<App />)
    const linkedIn = contact.socials.find((s) => s.icon === 'linkedin')
    expect(linkedIn).toBeDefined()
    const links = screen.getAllByRole('link', { name: /linkedin/i })
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) expect(link).toHaveAttribute('href', linkedIn?.href)
  })
})

describe('Resume download', () => {
  it('every resume button downloads the configured PDF', () => {
    render(<App />)
    const buttons = screen.getAllByRole('link', { name: /download resume/i })
    expect(buttons.length).toBeGreaterThanOrEqual(2)
    for (const button of buttons) {
      expect(button).toHaveAttribute('href', profile.resumePath)
      expect(button).toHaveAttribute('download', profile.resumeFileName)
    }
  })

  it('the resume file exists in /public', () => {
    expect(existsSync(resolve(process.cwd(), 'public', profile.resumePath.replace(/^\//, '')))).toBe(true)
  })
})

describe('Contact links', () => {
  it('email links use mailto with the configured address', () => {
    render(<App />)
    const contactSection = document.getElementById('contact') as HTMLElement
    const emailLinks = within(contactSection)
      .getAllByRole('link')
      .filter((a) => a.getAttribute('href')?.startsWith('mailto:'))
    expect(emailLinks.length).toBeGreaterThan(0)
    for (const link of emailLinks) {
      expect(link.getAttribute('href')).toMatch(new RegExp(`^mailto:${contact.email.replace(/\./g, '\\.')}`))
    }
  })

  it('copies the email address to the clipboard', async () => {
    const user = userEvent.setup()
    const writeText = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue(undefined)
    render(<App />)
    await user.click(screen.getByRole('button', { name: /copy email/i }))
    expect(writeText).toHaveBeenCalledWith(contact.email)
    expect(await screen.findByText('Copied')).toBeInTheDocument()
  })
})
