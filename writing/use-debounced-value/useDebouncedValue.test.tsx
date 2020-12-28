import { act, renderHook } from '@testing-library/react-hooks'
import { useDebouncedValue } from './useDebouncedValue'

jest.useFakeTimers()

test('should return the first value immediately', () => {
  let value = 1
  const { result } = renderHook(() => useDebouncedValue(value))
  expect(result.current).toEqual(1)
})

test('should not update the value immediately after a change', () => {
  let value = 1
  const { result, rerender } = renderHook(() => useDebouncedValue(value))
  expect(result.current).toEqual(1)

  value = 2
  rerender()
  expect(result.current).toEqual(1)
})

test('should update the value after the delay time', () => {
  let value = 1
  const { result, rerender } = renderHook(() => useDebouncedValue(value, 100))
  expect(result.current).toEqual(1)

  value = 2
  rerender()
  jest.advanceTimersByTime(99)
  expect(result.current).toEqual(1)

  act(() => {
    jest.advanceTimersByTime(1)
  })
  expect(result.current).toEqual(2)
})

test('should default to a delay of 0', () => {
  let value = 1
  const { result, rerender } = renderHook(() => useDebouncedValue(value))
  expect(result.current).toEqual(1)

  value = 2
  rerender()
  act(() => {
    // Just run the next tick of the call stack.
    jest.advanceTimersByTime(0)
  })
  expect(result.current).toEqual(2)
})
