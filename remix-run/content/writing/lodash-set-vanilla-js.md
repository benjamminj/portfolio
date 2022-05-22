---
title: Lodash `set` in raw JavaScript
subtitle: Skip the extra dependency and use this small utility from scratch.
date: 2022-03-17
tags:
  - from-scratch
  - typescript
  - javascript
  - recipes
---

```tsx
/**
 * This is a replacement for lodash _.set(), it contains core functionality but
 * perhaps skips some edge cases.
 */
export const set = <
  T extends Record<string, unknown> = Record<string, unknown>
>(
  obj: Record<keyof T, unknown>,
  path: string | string[],
  value: unknown
): T => {
  // Contains all characters that are not `.`, `[`, or `]`
  const validPathCharactersRegex = /([^[.\]])+/g
  const pathArray = Array.isArray(path)
    ? path
    : path.match(validPathCharactersRegex)

  if (!pathArray) return obj

  let nestedObj = obj
  for (let i = 0; i < pathArray.length; i++) {
    let key: string | number = pathArray[i]

    // First, set the item to an object/array, if it's not the last we want
    // to make a nested path.
    if (nestedObj[key] === undefined) {
      const isIndex = isNaN(Number(pathArray[i + 1]))
      nestedObj[key as keyof T] = isIndex ? {} : []
    }

    // If it's the last in the list, set the item to the value
    if (i === pathArray.length - 1) {
      nestedObj[key as keyof T] = value
    }

    nestedObj = nestedObj[key]
  }

  return obj
}
```

## Context

`set` is a drop-in replacement for Lodash's `_.set` method. It allows you to set the value at a given path. If the path doesn't exist yet, it also creates the path for you! (woohoo, no `undefined` exceptions!).

I find many of my projects only use a few Lodash methods. Sometimes it's just better to just copy them over into the codbase "from scratch" (and save a dependency in the process!). While this `set` method doesn't cover _all_ the edge cases Lodash does, it covers the primary workflows.

This snippet of `set` also is ~200 bytes, so it's super lightweight 😅

## Usage

```tsx
import { set } from './set'

const obj = { a: 1 }

// set a path deep in the object
set(obj, 'b.c.d', 3)
console.log(obj.b.c.d) // 3

// you can also set array items
set(obj, 'b.e[0].f', 4)
console.log(obj.b.e) // [{ f: 4 }]
```

## Tests

```ts
import { set } from './set'

test('should allow setting nested paths', () => {
  const obj = {}
  set(obj, 'a.b.c', 1)
  // @ts-expect-error
  expect(obj.a.b.c).toEqual(1)
})

test('should allow setting nested array paths', () => {
  const obj = {}
  set(obj, 'a.b[0].c', 1)
  set(obj, 'a.b[1].c', 2)
  // @ts-expect-error
  expect(obj.a.b).toEqual([{ c: 1 }, { c: 2 }])
})
```
