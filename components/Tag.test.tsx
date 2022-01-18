import React from 'react'
import { render, screen } from '@testing-library/preact'
import { Tag } from './Tag'

test('should render a tag with a link to the relevant tags page', () => {
  render(<Tag tag="potato" />)

  const $a = screen.getByRole('link', { name: '#potato' })

  expect($a).toBeInTheDocument()
  expect($a).toHaveAttribute('href', '/tags/potato')
})
