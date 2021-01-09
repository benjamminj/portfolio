import { renderHook } from '@testing-library/react-hooks'
import { usePrevious } from './usePrevious'

test('should return the value of the previous render', () => {
  let value = 1
  const { result, rerender } = renderHook(() => usePrevious(value))
  expect(result.current).toEqual(undefined)
  value = 2
  rerender()
  expect(result.current).toEqual(1)
  rerender()
  expect(result.current).toEqual(2)
})
