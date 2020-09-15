import React from 'react'
import { render, screen } from '@testing-library/react'
import { Link } from './Link'

test('should render an "a" tag', () => {
  render(<Link href="/blog">blog</Link>)
  const $a = screen.getByRole('link', { name: 'blog' })
  expect($a).toBeInTheDocument()
  expect($a).toHaveAttribute('href', '/blog')
})

test('should allow rendering as an external link', () => {
  render(
    <Link href="https://google.com" external>
      google
    </Link>
  )

  const $a = screen.getByRole('link', { name: 'google' })
  expect($a).toBeInTheDocument()
  expect($a).toHaveAttribute('href', 'https://google.com')
  expect($a).toHaveAttribute('target', '_blank')
  expect($a).toHaveAttribute('rel', 'noopener noreferrer')
})
