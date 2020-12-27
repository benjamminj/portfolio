import { useState, useEffect } from 'react'

export const useDebouncedValue = <T extends any>(input: T, delay = 0) => {
  const [value, setValue] = useState(input)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue(input)
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [input, delay])

  return value
}
