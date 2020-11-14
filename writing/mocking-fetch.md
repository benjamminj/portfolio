---
title: Mocking the fetch API with Jest
description: Why should we mock the network? We'll take a look at why it's important to mock window.fetch and a couple methods we can use in our test suites.
draft: false
date: 2019-04-26T01:57:43.116Z
image:
  url: 'blue-paint-swirls.jpg'
  alt: 'Abstract swirling colors of blue and red'
tags:
  - testing
  - jest
  - javascript
---

In this tutorial we are going to look at mocking out network calls in unit tests. Specifically we are going to dive into mocking the `window.fetch` API. If you're unfamiliar with the `fetch` API, it's a browser API that allows you to make network requests for data (you can also read more about it [here](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)). We'll look at _why_ we would want to mock `fetch` in our unit tests, as well as a few different mocking approaches that we can use.

## Why would we want to mock out network calls?

Before we go straight into mocking the `fetch` API, I think it's important that we take a step back and ask ourselves _why_ we would want to mock it. Otherwise, we'll just know how to write the mock instead of actually knowing what value it provides.

One of the main reasons we have for mocking `fetch` is that this is how our app interacts with the outside world. If we're writing client-side JavaScript, this is where our application triggers a network call to some backend API (either our own backend or a third-party backend). And if we're writing server-side JavaScript (using `fetch` via a package like `node-fetch`) this is where our server talks to _another_ server outside of itself.

If we simply let `fetch` do its thing without mocking it at all, we introduce the possibility of flakiness into our tests. A unit test would be considered to be _flaky_ if it _does not always produce the exact same output given the same inputs_. The following example will always produce the same output.

```js
function add(a, b) {
  return a + b
}

// This is the test for the `add` function
describe('add', () => {
  test('adds 2 numbers', () => {
    expect(add(1, 2)).toEqual(3)
  })
})
```

However, when testing code that uses `fetch` there's a lot of factors that can make our test fail——and many of them are not directly related to input of the function. What happens if your computer is disconnected from the internet? What happens to your test suite if you're working on an airplane (and you _didn't_ pay for in-flight wifi)? What happens when that third-party API is down and you can't even merge a pull request because all of your tests are failing?

Secondly, mocking `fetch` allows us to exert fine-grained control over what data our app receives "from the API".

If we're able to replace all network calls with reliable data, this also means that we can replicate scenarios in our testing environments that would be difficult to reproduce if we were hitting a real API. While it might be difficult to reproduce what happens on the client-side when the API returns 500 errors (without actually breaking the API), if we're mocking out the responses we can easily create a test to cover that edge case.

## Mocking the fetch API

So, now that we know _why_ we would want to mock out `fetch`, the next question is _how_ do we do it? There's a few ways that we'll explore. Each one has unique tradeoffs——it's difficult to say whether one is "better" or "worse" since they both achieve the same effect.

### Method #1: Replace the global `fetch` with our mocked `fetch`

The first way that we can go about mocking `fetch` is to actually _replace the `global.fetch`_ function with our own mocked `fetch` (If you're not familiar with `global`, it essentially behaves the exact same as `window`, except that it works in both the browser _and_ Node. That way you don't have to change where you're getting `fetch` from per environment. You can read more about `global` [here](TK link)).

It's not usually a good idea to replace things on the `global`/`window` object! True to its name, the stuff on `global` will have effects on _your entire application_. Every time that you add stuff to the `global` namespace you're adding complexity to the app itself and risking the chance of naming collisions and side-effects.

However, in the testing environment we can get away with replacing `global.fetch` with our own mocked version——we just have to make sure that after our tests run we clean our mocks up correctly. That way we don't accidentally replace `fetch` for a separate test suite (which might call a different API with a different response).

Here's what it would look like to mock `global.fetch` by replacing it entirely.

```js
// This is the function we'll be testing
async function withFetch() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const json = res.json()

  return json
}

// This is the section where we mock `fetch`
const unmockedFetch = global.fetch

beforeAll(() => {
  global.fetch = () => Promise.resolve({ json: () => [] })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

// This is actual testing suite
describe('withFetch', () => {
  test('works', async () => {
    const json = await withFetch()
    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toEqual(0)
  })
})
```

Let's walk through this example! 😅

First, we have the actual `withFetch` function that we'll be testing. Usually this would live in a separate file from your unit test, but for the sake of keeping the example short I've just included it inline with the tests. `withFetch` doesn't really do much——underneath the hood it hits the [placeholderjson](https://jsonplaceholder.typicode.com/) API and grabs an array of posts. This array in the API response is 100 posts long and each post just contains dummy text.

Next, let's skip over the mocking portion for a sec and take a look at the unit test itself. The unit test calls the `withFetch` function and waits for it to resolve (since it's an `async` function we use `await` to pause execution until `withFetch` resolves). Then we assert that the returned data is an array of 0 items. If we actually hit the [placeholderjson](https://jsonplaceholder.typicode.com/) API and it returns 100 items this test is guaranteed to fail!

This test is setup to make sure that we actually mock `fetch`. In order to make our test pass we will have to replace the `fetch` with our own response of 0 items.

Finally, we have the mock for `global.fetch`. As a quick refresher, the mocking code consists of three parts:

```js
// Part 1
const unmockedFetch = global.fetch

// Part 2
beforeAll(() => {
  global.fetch = () => Promise.resolve({ json: () => [] })
})

// Part 3
afterAll(() => {
  global.fetch = unmockedFetch
})
```

In the first part we store a reference to the _actual function_ for `global.fetch`. Since we'll be mocking `global.fetch` out at a later point we want to keep this reference around so that we can use it to cleanup our mock after we're done testing.

The second part consists of the actual `fetch` mock. The important thing to note is that the mocked `fetch` API _must be API-compatible_ with the real `fetch` API. Since `fetch` returns a resolved `Promise` with a `json` method, we need to do the same thing inside our mock. In order to mock something effectively you must understand the API (or at least the portion that you're using). You certainly don't need to rewrite the entire functionality of the module——otherwise it wouldn't be a mock——but you do need to keep the API of you mock similar to the real module.

However, instead of returning 100 posts from the `placeholderjson` API, our `fetch` mock just returns an empty array from its `json` method. You could put anything here——you could put the full 100 posts, have it "return" nothing, or anything in-between! By having control over _what_ the `fetch` mock returns we can reliably test edge cases and how our app responds to API data without being reliant on the network!

Finally, the last portion of our mock is to restore the actual `global.fetch` to its former glory after all the tests have run. `afterAll` is a hook provided by `jest` that runs at the end of the test suite (just like `beforeAll` runs before the test suite), so we use it to set `global.fetch` back to the reference that we stored.

This is important if you're running multiple test suites that rely on `global.fetch`. If you don't clean up the test suite correctly you could see failing tests for code _that is not broken_. What essentially happens is the subsequent test suites use the mock from _the earlier test suite_ and they're not expecting the same response (after all, that mock might be in an entirely different file 😱).

Furthermore, your tests might not run in the exact same order each time so it's never a good idea to have tests share state. Instead, try to think of each test in isolation——can it run at any time, will it set up whatever it needs, and can it clean up after itself?

### Method #2: Use `jest.spyOn` to do all the hard work for us

Now that we've looked at one way to successfully mock out `fetch`, let's examine a second method using [Jest](https://jestjs.io/). If you haven't used [Jest](https://jestjs.io/) before, it's another testing framework built and maintained by the engineers at Facebook.

One of my favorite aspects of using Jest is how simple it makes it for us to mock out code—even our `window.fetch` function! 🙌

While the first example of mocking `fetch` would work in any JavaScript testing framework (like Mocha or Jasmine), this method of mocking `fetch` is specific to Jest. Here's what it would look like to change our code from earlier to use Jest to mock `fetch`.

```diff
-// Part 1
-const unmockedFetch = global.fetch
-
-// Part 2
-beforeAll(() => {
-  global.fetch = () => Promise.resolve({ json: () => [] })
-})
-
-// Part 3
-afterAll(() => {
-  global.fetch = unmockedFetch
-})

+const fetchMock = jest
+  .spyOn(global, 'fetch')
+  .mockImplementation(() => Promise.resolve({ json: () => [] }))
```

Jest provides a `.spyOn` method that allows you to listen to all calls to any method on an object. To use `jest.spyOn` you pass the object containing the method you want to spy on, and then you pass the _name of the method as a string_ as the second argument.

Jest's `spyOn` method returns a _mock function_, but as of right now we _haven't replaced the fetch function's functionality_. To do that we need to use the `.mockImplementation(callbackFn)` method and insert what we want to replace `fetch` with as the `callbackFn` argument. We can simply use the same `fetch` mock from before, where we replace `fetch` with `() => Promise.resolve({ json: () => [] })`.

If you're not familiar with test spies and mock functions, the TL;DR is that a spy function _doesn't change any functionality_ while a _mock function replaces the functionality_. Test spies let you record all of the things that function was called. Later you can assert things based on what arguments the spy function received. For example, we could assert that `fetch` was called with `https://placeholderjson.org` as its argument:

```js
const fetchMock = jest
  .spyOn(global, 'fetch')
  .mockImplementation(() => Promise.resolve({ json: () => [] }))

describe('withFetch', () => {
  test('works', async () => {
    const json = await withFetch()

    // highlight-start
    expect(fetchMock).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts'
    )
    // highlight-end

    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toEqual(0)
  })
})
```

The cool thing about this method of mocking fetch is that we get a couple extra things for free that we don't when we're replacing the `global.fetch` function manually. First off, instead of managing `beforeAll` and `afterAll` ourselves, we can simply use Jest to mock out the `fetch` function and Jest will handle _all of the setup and teardown for us_! Secondly, we make it a lot easier to spy on what `fetch` was called with and use that in our test assertions.

## Customizing the mocked response for individual tests

In addition to being able to mock out `fetch` for a single file, we also want to be able to customize _how `fetch` is mocked for an individual test_.

The main reason that we want to be able to do this boils down to what the module we're testing is responsible for. If we have a module that calls an API, it's usually also responsible for dealing with a handful of API scenarios.

For example, we know what this module does when the response is 0 items, but what about when there are 10 items? 100 items? What happens if the data is paginated or if the API sends back a 500 error?

Our code that deals with external APIs has to handle a ton of scenarios if we want it to be considered "robust", but we also want to set up automated tests for these scenarios. Getting the API to return a 500 error might actually be a little difficult if you're manually testing from the front-end, so having a mocked `fetch` allows us to run our API handling code with every unit test run.

In order to mock `fetch` for an individual test, we don't have to change much from the previous mocks we wrote! As a first step, we can simply move the mocking code _inside of the test_.

```js
describe('withFetch', () => {
  test('works', async () => {
    // highlight-start
    const fetchMock = jest
      .spyOn(global, 'fetch')
      .mockImplementation(() => Promise.resolve({ json: () => [] }))
    // highlight-end

    const json = await withFetch()
    expect(fetchMock).toHaveBeenCalledWith(
      'https://jsonplaceholder.typicode.com/posts'
    )

    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toEqual(0)
  })
})
```

And that's it! Now, if we were to add another test, all we would need to do is re-implement the mock _for that test_, except we have complete freedom to do a _different_ `mockImplementation` than we did in the first test.

The big caveat of mocking `fetch` for each individual test is there is considerably more boilerplate than mocking it in a `beforeEach` hook or at the top of the module. However, if I need to switch how `fetch` responds for individual tests, a little extra boilerplate is much better than skipping the tests and accidentally shipping bugs to end users.

---

## Conclusion

Mocking `window.fetch` is a valuable tool to have in your automated-testing toolbelt—it makes it incredibly easy to recreate difficult-to-reproduce scenarios and guarantees that your tests will run the same way no matter what (even when disconnected from the internet).

If you enjoyed this tutorial, I'd love to connect! As always, you can [follow me on Twitter](https://twitter.com/benjamminj) or [connect with me on LinkedIn](https://www.linkedin.com/in/benjamin-d-johnson/) to hear about new blog posts as I publish them.
