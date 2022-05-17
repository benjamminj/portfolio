---
title: usePrevious
subtitle: Store a reference to the value from the last render.
date: 2021-02-02T00:00:00.000Z
tags:
  - react
  - hooks
  - typescript
  - recipes
---

```tsx
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
```

## Context

This hook can be really useful when you want to bail out of a `useEffect` early. Or if you have a `useEffect` with a few dependencies but you want to wait until a certain one has changed.

Technically, this hooks is kinda a "hack", I feel like it doesn't line up perfectly with React's data flow and programming model for hooks. I _think_ in most cases there's a "better" way—something like flipping a flag based on the dependency that needs to update. But I've found myself reaching for `usePrevious` in most of medium-to-large applications I've built the last few years.

## How it works

`usePrevious` starts of by setting up a `useRef` in the first render. This will initially be `undefined` (since in the first render there isn't a previous value).

Secondly, we set up a `useEffect` to sync that `ref` after each render cycle. [`useEffect` runs _after_ each render](https://reactjs.org/docs/hooks-reference.html#useeffect) is committed to the screen, so in the _next_ render cycle, you'll have the _previous_ render cycle's value stored in `ref.current`

## Usage

```tsx
const Component = ({ query, filter }) => {
  const previousQuery = usePrevious(query)

  useEffect(() => {
    // If the query didn't change, bail out early
    if (query !== previousQuery) return

    // Otherwise, continue fetching as usual.
    fetchData(query, filter)
  }, [query, previousQuery, filter])

  // render data
}
```

## Tests

```tsx
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
```
