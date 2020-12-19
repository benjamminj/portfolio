import { act, fireEvent, render, screen } from '@testing-library/react'
import { Pre } from './Pre'

test('should render with the contents and css class', () => {
  const code = `const add = (a: number, b: number) => a + b; console.log(a + b)`
  const { container } = render(
    <Pre className="language-tsx">
      <code>{code}</code>
    </Pre>
  )

  expect(screen.getByText(code)).toBeInTheDocument()
  expect(container.querySelectorAll('.language-tsx').length).toEqual(1)
})

test('should allow copying text contents to the clipboard', () => {
  jest.useFakeTimers()

  const code = `const add = (a: number, b: number) => a + b; console.log(a + b)`
  render(
    <Pre className="language-tsx">
      <code>{code}</code>
    </Pre>
  )

  expect(screen.queryByText('Copied!')).toBeNull()

  fireEvent.click(screen.getByText('Copy to clipboard'))
  expect(screen.getByText('Copied!')).toBeInTheDocument()

  act(() => {
    jest.advanceTimersByTime(2001)
  })
  expect(screen.queryByText('Copied!')).toBeNull()
})
