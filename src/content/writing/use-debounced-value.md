---
title: useDebouncedValue
subtitle: Create a debounced copy of an input value.
date: 2020-12-22
tags:
  - react
  - typescript
  - recipes
---

```tsx
import { useState, useEffect } from 'react';

export const useDebouncedValue = <T extends any>(input: T, delay = 0) => {
	const [value, setValue] = useState(input);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setValue(input);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [input, delay]);

	return value;
};
```

## Context

When building UIs it's nice to respond to user input _immediately_. In React it's generally ok to call `setState` multiple times in quick succession since [React batches state updates](https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous).

However, you _don't_ want to rapidly update a state value if you've got a `useEffect` wired up to it. This could have disastrous results (like DDoSing your API or terrible render performance). 😱

This hook creates a carbon copy of the original state value. The only difference is that the `useDebouncedValue` doesn't update _until its dependency stops updating_.

This makes it much safer to use as a dependency for `useEffect` if your state is rapidly changing.

While debouncing the `fetch` function (or any function called from within `useEffect`) achieves a similar effect, I think debouncing the _value_ results in cleaner logic. Since you trigger an effect whenever dependencies change, you debounce the effect by changing dependencies less. Overall, it feels more inline with React's data flow and the way that `useEffect` works.

## Usage

```tsx
import { useEffect, useState } from 'react';
import { useDebouncedValue } from './useDebouncedValue';

export const Component = () => {
	const [posts, setPosts] = useState([]);
	const [search, setValue] = useState('');
	const debouncedValue = useDebouncedValue(search);

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/posts?search=${debouncedValue}`)
			.then((res) => res.json())
			.then((posts) => setPosts(posts))
			.catch(() => setPosts([]));
	}, [debouncedValue]);

	return (
		<div>
			<label>
				Search
				<input name="search" value={search} onChange={(ev) => setValue(ev.target.value)} />
			</label>

			<div>{posts.length} posts found</div>
		</div>
	);
};
```

## Tests

```tsx
import { act, renderHook } from '@testing-library/react-hooks';
import { useDebouncedValue } from './useDebouncedValue';

jest.useFakeTimers();

test('should return the first value immediately', () => {
	let value = 1;
	const { result } = renderHook(() => useDebouncedValue(value));
	expect(result.current).toEqual(1);
});

test('should not update the value immediately after a change', () => {
	let value = 1;
	const { result, rerender } = renderHook(() => useDebouncedValue(value));
	expect(result.current).toEqual(1);

	value = 2;
	rerender();
	expect(result.current).toEqual(1);
});

test('should update the value after the delay time', () => {
	let value = 1;
	const { result, rerender } = renderHook(() => useDebouncedValue(value, 100));
	expect(result.current).toEqual(1);

	value = 2;
	rerender();
	jest.advanceTimersByTime(99);
	expect(result.current).toEqual(1);

	act(() => {
		jest.advanceTimersByTime(1);
	});
	expect(result.current).toEqual(2);
});

test('should default to a delay of 0', () => {
	let value = 1;
	const { result, rerender } = renderHook(() => useDebouncedValue(value));
	expect(result.current).toEqual(1);

	value = 2;
	rerender();
	act(() => {
		// Just run the next tick of the call stack.
		jest.advanceTimersByTime(0);
	});
	expect(result.current).toEqual(2);
});
```

## Influences and prior art

- **[usehooks.com](https://usehooks.com/useDebounce/)**: I mostly lifted my `useDebouncedValue` function from here. It's not a 100% copy-pasta though: I've renamed a few things, added my own comments, added some tests and ported it to TypeScript.
- **[`useDeferredValue`](https://reactjs.org/docs/concurrent-mode-reference.html#usedeferredvalue)**: This is built-in to React's concurrent mode and will only update the given value after a timeout period. This hook is a big reason why I think that a `useDebouncedValue` hook feels inline with React's data flow. I might not even need `useDebouncedValue` once concurrent mode is stable! 😅
