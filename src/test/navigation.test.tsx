import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'
import { Header } from '../components/Header'
import { navItems } from '../content'

describe('Navigation', () => {
  it('every nav link points at a section that exists on the page', () => {
    render(<App />)
    const primary = screen.getByRole('navigation', { name: 'Primary' })
    const links = within(primary).getAllByRole('link')
    expect(links).toHaveLength(navItems.length)
    for (const link of links) {
      const id = link.getAttribute('href')?.slice(1) ?? ''
      expect(document.getElementById(id), `#${id}`).not.toBeNull()
    }
  })

  it('nav ids are unique', () => {
    const ids = navItems.map((item) => item.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('opens and closes the mobile menu with the toggle button', async () => {
    const user = userEvent.setup()
    render(<Header />)
    const toggle = screen.getByRole('button', { name: /open menu/i })
    const menu = document.getElementById('mobile-menu')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveAttribute('aria-controls', 'mobile-menu')
    expect(menu).not.toBeVisible()

    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(menu).toBeVisible()
    expect(screen.getByRole('button', { name: /close menu/i })).toBe(toggle)

    await user.click(toggle)
    expect(menu).not.toBeVisible()
  })

  it('closes the mobile menu on Escape and returns focus to the toggle', async () => {
    const user = userEvent.setup()
    render(<Header />)
    const toggle = screen.getByRole('button', { name: /open menu/i })
    await user.click(toggle)
    const firstLink = within(screen.getByRole('navigation', { name: 'Mobile' })).getAllByRole('link')[0]
    firstLink?.focus()

    await user.keyboard('{Escape}')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(toggle).toHaveFocus()
  })

  it('moves focus into the open menu and locks page scroll', async () => {
    const user = userEvent.setup()
    render(<Header />)
    await user.click(screen.getByRole('button', { name: /open menu/i }))
    const mobileNav = screen.getByRole('navigation', { name: 'Mobile' })
    expect(within(mobileNav).getAllByRole('link')[0]).toHaveFocus()
    expect(document.documentElement).toHaveClass('menu-open')

    await user.keyboard('{Escape}')
    expect(document.documentElement).not.toHaveClass('menu-open')
  })

  it('closes the mobile menu after choosing a link', async () => {
    const user = userEvent.setup()
    render(<Header />)
    await user.click(screen.getByRole('button', { name: /open menu/i }))
    const mobileNav = screen.getByRole('navigation', { name: 'Mobile' })
    await user.click(within(mobileNav).getByRole('link', { name: 'Contact' }))
    expect(document.getElementById('mobile-menu')).not.toBeVisible()
  })

  it('all interactive controls are keyboard reachable buttons or links', () => {
    render(<App />)
    for (const button of screen.getAllByRole('button')) {
      expect(button.tagName).toBe('BUTTON')
      expect(button).toHaveAccessibleName()
    }
  })
})
