import { useEffect, useRef } from 'react'

/**
 * Stores a reference to the previously rendered value.
 *
 * This can be used to execute dependency checks to compare whether a single
 * dependency has changed.
 *
 * During the first render, `undefined` will be returned. Following renders will
 * return a value.
 */
export const usePrevious = <T extends unknown>(value: T) => {
  const ref = useRef<T | undefined>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
