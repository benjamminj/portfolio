---
title: Writing a memoize function from scratch
date: 2020-10-14
tags:
  - javascript
  - from-scratch
---

## Intro

In this tutorial we'll build our own `memoize` function from scratch.

You might be (or might not be!) familiar with the term "memoize". To give a quick **tl;dr**, "memoize" is kinda a fancy word for "cache". Or to put it a different way, memoizing something is a way of adding caching to it.

When we "memoize" something we cache the results of a function based on its arguments. This can be useful when you have a function that's very performance-intensive.

Chances are you don't need to write your own memoization function for working in most codebases. If you're a `lodash` user, there's `_.memoize`. I've also used `memoize-one` in the past.

But reimplementing things from scratch has other benefits—it's helpful for me when I want to solidify my knowledge of a concept. So here we go, here's `memoize` from scratch!

## The "specs"

Before we dive right in on coding our `memoize` function, let's take a moment and draw up some specifications.

This is how we want `memoize` to look and behave:

```js highlight-lines=3,4
const sumBelow = memoize(someReallyExpensiveFunction)

// returns `499999999067109000` after delay
sumBelow(1e9)
// returns `1999999998067114000` after delay
sumBelow(2e9)

// immediately returns `499999999067109000`
sumBelow(1e9)
```

To further flesh out our "acceptance criteria", here's the things that `memoize` needs to do:

- `memoize` needs to accept a function as an argument
- `memoize` needs to return a _new_ function that can be used with the same arguments as the original function.
- When the memoized function is called, it will run the original function.
- However, **if the memoized function** is called again with the same arguments as a previous call, the result of the first call will be returned **immediately**.

## Writing the function

Alright, let's dive into the code for our `memoize` function.

First, we'll need to set up `memoize` as a function that accepts a function as an argument. (If you're curious, these are often referred to as [higher-order functions](https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99)).

For now, we'll just have `memoize` call the original function with the arguments that were passed to it.

```js
const memoize = fn => {
  return (...args) => {
    const result = fn(...args)
    return result
  }
}
```

As we go through this tutorial we can use the following code to test whether our memoize function is working:

```js
// ...memoize function up above

const sumBelow = limit => {
  const sum = 0

  for (var i = 1; i < limit; i++) {
    sum += i
  }

  return sum
}

const memoSumBelow = memoize(sumBelow)

// Returns after a slight delay
memoSumBelow(1e6)
// Also returns after a small delay
memoSumBelow(2e6)

// Should return immediately!
memoSumBelow(1e6)
```

If we run this with our current `memoize` function, we'll see that `memoSumBelow` returns the **correct** value each time, but it doesn't return immediately on the third call (the second one with `1e6`).

Let's add a cache of calls to `memoize` so we can make that third call return instantly ⚡️

We'll start by just setting up the cache. We'll use a JavaScript `Map` to store the results.

```js
const memoize = fn => {
  const cache = new Map()

  return (...args) => {
    const result = fn(...args)
    return result
  }
}
```

It's important that `const cache` is **outside** of the function that we `return`. (FYI, this is referred to as a [closure](https://whatthefuck.is/closure) if you're interested).

Next, we'll want to create a cache key and put the result of `fn(...args)` in our newly created cache. For now we'll use the first argument as a cache key.

```js
const memoize = fn => {
  const cache = new Map()

  return (...args) => {
    const cacheKey = args[0]

    const result = fn(...args)
    cache.set(cacheKey, result)
    return result
  }
}
```

Now there's one thing left to do—we check the cache to see whether the key exists. If it does, we can grab the item out of the cache instead of running `fn`. If it doesn't, we run `fn(...args)` and cache the result for next time.

```js
const memoize = fn => {
  const cache = new Map()

  return (...args) => {
    const cacheKey = args[0]

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    }

    const result = fn(...args)
    cache.set(cacheKey, result)
    return result
  }
}
```

## Bonus: writing unit tests 🤓

Let's write some tests for our `memoize` function. I'll be using [Jest](https://jestjs.io/) in these examples.

Before, let's take a step back and brainstorm about the things we _want to test_. We can use our `memoize` specifications that we wrote earlier along with `test.todo`.

```js
// memoize.test.js

test.todo(
  'should run the function if it has not been called with the same arguments'
)

test.todo(
  'should return a cached result if the function has been called with the same arguments'
)
```

In the first test, we'll run our memoized function with arguments that it has _not been called with_. We'll then verify that the underlying `fn` argument got called correctly.

First, let's remove `test.todo` and replace it with an actual test. At the top of our test we'll create a new mock function using `jest.fn()`.

In this case, we don't need something complicated or performance-intensive—we're just testing that the function gets called, so a simple `plus1` function will do. We'll pass it into `memoize`.

```js
// memoize.test.js

test('should run the function if it has not been called with the same arguments', () => {
  const plus1 = jest.fn()
  const memoizedFn = memoize(plus1)
})
```

> _If you're familiar with the [Arrange-Act-Assert pattern](https://wiki.c2.com/?ArrangeActAssert) for writing tests, this bit we just did is the "Arrange" portion of the test._

Next, let's call `plus1` (btw, this is the "Act" portion of Arrange-Act-Assert).

```js
// memoize.test.js

test('should run the function if it has not been called with the same arguments', () => {
  const plus1 = jest.fn(a => a + 1)
  const memoizedFn = memoize(plus1)

  const result = memoizedFn(1)
})
```

Finally, we can add our assertion.

```js
// memoize.test.js

test('should run the function if it has not been called with the same arguments', () => {
  const plus1 = jest.fn(a => a + 1)
  const memoizedFn = memoize(plus1)

  const result = memoizedFn(1)

  expect(result).toEqual(2)
  expect(plus1).toHaveBeenCalledTimes(1)
  expect(plus1).toHaveBeenCalledWith(1)
})
```

In this test we want to assert three things about our `memoize` function:

1. That `memoizedFn` returned the correct value (`.toEqual(2)` in our case).
2. That `memoizedFn` was only called once (`.toHaveBeenCalledTimes(1)`). This will matter more in the next test.
3. That `memoizedFn` actually was called with an argument of `1` (`.toHaveBeenCalledWith(1)`).

For the second test, the first portion of the test looks exactly the same:

```js
// memoize.test.js

test('should return a cached result if the function has been called with the same arguments', () => {
  const plus1 = jest.fn(a => a + 1)
  const memoizedFn = memoize(plus1)
})
```

However, we'll call `memoizedFn` slightly differently. We're going to call it **three times** so that we can test that the cache is working. We'll call it first with `1`, then once with `2`, then again a third time with `1`.

```js
// memoize.test.js

test('should return a cached result if the function has been called with the same arguments', () => {
  const plus1 = jest.fn(a => a + 1)
  const memoizedFn = memoize(plus1)

  memoizedFn(1)
  memoizedFn(2)
  const result = memoizedFn(1)
})
```

Finally, we can write our assertions. We want to make sure that `plus1` **isn't called** the second time.

```js
// memoize.test.js

test('should return a cached result if the function has been called with the same arguments', () => {
  const plus1 = jest.fn(a => a + 1)
  const memoizedFn = memoize(plus1)

  memoizedFn(1)
  memoizedFn(2)
  const result = memoizedFn(1)

  expect(result).toEqual(2)
  expect(plus1).toHaveBeenCalledTimes(2)
})
```

For this test we only want to assert two things:

1. That `memoizedFn` still returns the correct result (`.toEqual(2)`).
2. That `plus1` was only called twice (once with `1`, once with `2`, the third time hit the cache).

## Bonus BONUS: custom cache keys 🤯

As a second bonus, let's add the ability to customize how the cache key is created.

Currently, `memoize` just takes the first argument and uses that as a cache key. This is good enough for a lot of functions, but sometimes you need something a little more robust.

We'll add an optional second argument to `memoize` called `getCacheKey`. As a default we're going to use the first argument, like we had before.

```js
const defaultGetCacheKey = (...args) => args[0]

const memoize = (fn, getCacheKey = defaultGetCacheKey) => {
  const cache = new Map()

  return (...args) => {
    const cacheKey = args[0]

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    }

    const result = fn(...args)
    cache.set(cacheKey, result)
    return result
  }
}
```

Then, all that's left to do is swap `const cacheKey = args[0]` for our new function.

```js
const memoize = (fn, getCacheKey = (...args) => args[0]) => {
  const cache = new Map()

  return (...args) => {
    const cacheKey = getCacheKey(...args)

    if (cache.has(cacheKey)) {
      return cache.get(cacheKey)
    }

    const result = fn(...args)
    cache.set(cacheKey, result)
    return result
  }
}
```

Now, instead of only using the first argument to the memoized function as a cache key, we can use whatever we want!

For example, instead of using the first argument to `add`, we can create a string containing both numbers.

```js
const add = (a, b) => a + b
const memoizedAdd = memoize(add, (a, b) => `${a}-${b}`)

memoizedAdd(1, 3)
memoizedAdd(1, 2)
memoizedAdd(1, 4)

// hits the cache for the key "1-2"
memoizedAdd(1, 2)
```

Finally, let's add a test for this new functionality.

```js
// memoize.test.js

test('should allow customization of the cache key', () => {
  const add = jest.fn((a, b) => a + b)
  const getCacheKey = (a, b) => `${a}-${b}`
  const memoized = memoize(add, getCacheKey)

  memoized(1, 3)
  memoized(1, 2)
  memoized(1, 4)
  const result = memoized(1, 2)

  expect(result).toEqual(3)
  expect(add).toHaveBeenCalledTimes(3)
})
```

In this test we set up our memoized function and then run it three times with fresh input. In each of these first three calls, the _first argument is the same_. This way we can make sure that the cache key is actually changing.

On the fourth time we run the memoized function with arguments that it has already received before.

Lastly, we make our assertions—we'll assert that the fourth time returns the correct result (`3` and not the result of `memoized(1,3)`), and we'll assert that `add` only got called 3 times.

---

## Conclusion

I hope that this was helpful! I know for myself, I learn a ton when I reimplement stuff that I commonly use from scratch.

Feel free to reach out to me on [Twitter](https://twitter.com/benjamminj) or my [LinkedIn](https://www.linkedin.com/in/benjamin-d-johnson/) (reference this article so I know you're not a LinkedIn bot 😱 ).
