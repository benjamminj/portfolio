import React from 'react'
import { render, screen } from '@testing-library/react'
import { Box } from './Box'

test('should have a padding of 0 if no "padding" props are provided', () => {
  render(<Box>content</Box>)

  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '0 0 0 0' })
})

test('should set padding on all sides if "padding" prop is present', () => {
  render(<Box padding="m">content</Box>)
  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '16px 16px 16px 16px' })
})

test('should allow responsive "padding" props', () => {
  render(<Box padding={['m', 'l']}>content</Box>)
  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '16px 16px 16px 16px' })
})

test('should set padding on top and bottom if "paddingY" prop is present', () => {
  render(<Box paddingY="m">content</Box>)
  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '16px 0 16px 0' })
})

test('should override "padding" prop if "paddingY" prop is present', () => {
  render(
    <Box padding="xs" paddingY="m">
      content
    </Box>
  )

  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '16px 8px 16px 8px' })
})

test('should set padding on left and right if "paddingX" prop is present', () => {
  render(<Box paddingX="m">content</Box>)
  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '0 16px 0 16px' })
})

test('should override "padding" prop if "paddingX" prop is present', () => {
  render(
    <Box padding="xs" paddingX="m">
      content
    </Box>
  )

  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '8px 16px 8px 16px' })
})

test('should set padding on left if "paddingLeft" prop is present', () => {
  render(<Box paddingLeft="m">content</Box>)

  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '0 0 0 16px' })
})

test('should set padding on right if "paddingRight" prop is present', () => {
  render(<Box paddingRight="m">content</Box>)

  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '0 16px 0 0' })
})

test('should override "padding" and "paddingX" if "paddingLeft" is present', () => {
  render(
    <Box padding="xs" paddingX="s" paddingLeft="m">
      content
    </Box>
  )

  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '8px 12px 8px 16px' })
})

test('should override "padding" and "paddingX" if "paddingRight" is present', () => {
  render(
    <Box padding="xs" paddingX="s" paddingRight="m">
      content
    </Box>
  )

  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '8px 16px 8px 12px' })
})

test('should set padding on top if "paddingTop" prop is present', () => {
  render(<Box paddingTop="m">content</Box>)

  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '16px 0 0 0' })
})

test('should set padding on bottom if "paddingBottom" prop is present', () => {
  render(<Box paddingBottom="m">content</Box>)

  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '0 0 16px 0' })
})

test('should override "padding" and "paddingY" if "paddingTop" is present', () => {
  render(
    <Box padding="xs" paddingY="s" paddingTop="m">
      content
    </Box>
  )

  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '16px 8px 12px 8px' })
})

test('should override "padding" and "paddingY" if "paddingBottom" is present', () => {
  render(
    <Box padding="xs" paddingY="s" paddingBottom="m">
      content
    </Box>
  )

  const $box = screen.getByText('content')
  expect($box).toHaveStyle({ padding: '12px 8px 16px 8px' })
})
