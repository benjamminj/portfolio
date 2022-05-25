---
title: 'Cheat sheet: using keys in React'
description: 'A couple recommendations (and warnings) about using the "key" prop'
date: 2020-08-24
tags:
  - react
  - javascript
---

I recently did a little refresher on how React keys work under the hood. Here's my cheat sheet on using React keys "dos and don'ts".

## Use keys when rendering lists

React makes sure you know about this rule with keys—if you render a list of items without keys React throws a console error in development.

For example, consider the following JSX.

```jsx
const items = ['A', 'B', 'C']

const MyList = () => {
  return (
    <ul>
      {items.map(letter => (
        <li>{letter}</li>
      ))}
    </ul>
  )
}
```

If you render this component in a React app you'll see the following error.

```
Warning: Each child in a list should have a unique "key" prop.
```

This error be removed by attaching a `key` prop to each `li` inside of the `map`:

```jsx
const items = ['A', 'B', 'C']

const MyList = () => {
  return (
    <ul>
      {items.map(letter => (
        <li key={letter}>{letter}</li>
      ))}
    </ul>
  )
}
```

React uses these keys to optimize rendering of the list items. When items are added, deleted, or swapped inside of the list, React uses that `key` to determine which items changed.

If the `key` is the same value, but in a different array _position_, then React can just reorder the rendered list items instead of recalculating them. But if the `key` is a different value, React knows it has to rerender the list item.

## Put the key _in the array itself_.

The `key` prop should be applied directly within the array. It doesn't matter whether it's a React component or a JSX element (HTML elements, like `li` or `div`).

The rule of thumb recommended in the React docs is to _use `key` whenever you're inside the `map` method_.

## Use a unique value as a key.

We need to use a _unique_ value for each key. This is important—duplicate keys in our array React will throw another console error!

```jsx
const items = [
  { id: '123', value: 'A' },
  { id: '456', value: 'B' }
  { id: '789', value: 'A' }
]

const MyList = () => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.value}>{item.value}</li>
      ))}
    </ul>
  )
}
```

In the above example, we'll have two items that use `"A"` as their key, since we're using `item.value`. We'll get the following console error:

```
Warning: Encountered two children with the same key, `A`. Keys should be unique
so that components maintain their identity across updates. Non-unique keys may
cause children to be duplicated and/or omitted — the behavior is unsupported
and could change in a future version.
```

Duplicate keys can be a source of some really strange bugs. For example, changing a components' state affects _a different component_ or items that don't properly update when you expect them to. 😱

We can fix this error if we use `id` on each item, which **is** unique. Most times that we're rendering data we'll have something like an `id` that we can use for a `key`.

```jsx
const items = [
  { id: '123', value: 'A' },
  { id: '456', value: 'B' }
  { id: '789', value: 'A' }
]

const MyList = () => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.value}</li>
      ))}
    </ul>
  )
}
```

## Use the array index as a last resort

One might be tempted to use the array index of the list item as the `key` prop. After all, that's unique, right?

In fact, [the React docs explicitly say](https://reactjs.org/docs/lists-and-keys.html#keys) that using the array index as a `key` is not recommended. Under the hood, React already uses the `index` as the key if there isn't an explicit `key` prop.

When you use an `index` as the key, React treats it the same as using _no key_. It only removes the console error.

When using the `index` in the `key`, React isn't able to optimize rendering of added, deleted, and reordered items.

_Note: using an `index` as the `key` is ok **if there is no other unique value** that can be used as a `key`. If you won't be adding, removing, or reordering your arrays, you can likely use `index` and be fine._

If we add an item to the front of our list, every existing item has its' index incremented by `1`. If we're using `index` for the `key`, every key changes and React has to rerender the entire list.

Lastly, using the `index` inside of string `key` doesn't change this behavior—the `key` still changes when we reorder the list. It doesn't matter whether they're on their own or part of a larger string.

```jsx
const list = ['A', 'B', 'C']

const ListWithIndexInString = () => {
  return (
    <ul>
      {list.map((letter, i) => (
        // This is exactly the same as `key={i}`
        <li key={`letter-${i}`}>{letter}</li>
      ))}
    </ul>
  )
}
```

## Keys only need to be unique across siblings

Even though component keys need to be unique within an array, they only need to be unique [**from their sibling components**](https://reactjs.org/docs/lists-and-keys.html#keys-must-only-be-unique-among-siblings). This is important to remember because it simplifies the `key` values that we choose.

This aspect of keys is also one of the most misunderstood (or ignored) that I've seen in the wild.

The following is correct `key` usage, despite the same keys appearing in multiple places:

```jsx
const items = ['A', 'B']

const MyList = () => {
  return (
    <ul>
      {items.map(outerLetter => (
        <div key={outerLetter}>
          {items.map(innerLetter => (
            <li key={innerLetter}>
              {outerLetter}: {innerLetter}
            </li>
          ))}
        </div>
      ))}
    </ul>
  )
}
```

There's no need for use to make keys like `` `outerItem__${outerLetter}` `` and `` `innerItem_${innerLetter}` `` that are unique across the entire component. We just need to make sure that _sibling_ components have unique keys.

Sometimes tracing the `key` values can be a little tricky, especially with the nested `map`s. I find it helpful to think about the tree that React builds while rendering these components:

```js
const tree = {
  root: {
    type: 'ul',
    children: [
      {
        type: 'div',
        key: 'A',
        children: [
          { type: 'li', key: 'A', children: ['A: A'] },
          { type: 'li', key: 'B', children: ['A: B'] },
        ],
      },
      {
        type: 'div',
        key: 'B',
        children: [
          { type: 'li', key: 'A', children: ['B: A'] },
          { type: 'li', key: 'B', children: ['B: B'] },
        ],
      },
    ],
  },
}
```

Using the following tree, we can see that key uniqueness only matters at **each indentation level**. Two components are at different levels of the tree can have the same `key` values without there being any problem.

---

## tl;dr

Use a `key` prop to allow React to optimize adding, deleting and reordering list items. `key` values should be unique, but they only need to be unique across sibling components.

---

## Resources

- [Lists and keys (React docs)](https://reactjs.org/docs/lists-and-keys.html): the official docs on keys are fantastic—they thoroughly explain how to properly (and improperly) use keys.
- [Reconciliation (React docs)](https://reactjs.org/docs/reconciliation.html#recursing-on-children): this is a deep-dive into how React turns JSX into actual rendered HTML, as well as why keys are necessary.
- [Index as a key is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318): this article describes a couple potential bugs that can come from using `index` as the key prop.
