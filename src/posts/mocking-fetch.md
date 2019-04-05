---
title: Mocking the fetch API with Jest
description:
draft: true
date: 2019-03-17
# image:
# url: ''
# alt:
---

<!--
KEYWORDS
mock fetch
mock fetch jest
mock fetch api
mock fetch response jest
 -->

In this tutorial we are going to look at mocking out network calls in unit tests.

## Why do we want to mock out network calls?

Before we go straight into mocking the `fetch` API, I think it's important that we take a step back and ask ourselves _why_ we would want to mock it. Otherwise, we'll just know how to write the mock instead of actually knowing what value it provides.

One of the main reasons for mocking the `fetch` API is that this is primarily the location that our app interacts with the outside world. If we're writing client-side JavaScript, this is where our application triggers a network call to some backend API (either ours or a third-party backend). And if we're writing server-side JavaScript (using `fetch` via a package like `node-fetch`) this is where our server talks to _another_ server outside of itself.

If we simply let `fetch` do its thing without mocking it at all, we introduce the possibility of flakiness into our tests. A unit test would be considered to be _flaky_ if it _does not always produce the exact same output given the same inputs_. For example, what happens if your computer is disconnected from the internet? What happens to your test suite if you're working on an airplane (and you _didn't_ pay for in-flight wifi)? What happens when that third-party API is down and you can't even merge a pull request because all of your tests are failing?

In addition, mocking `fetch` allows us to exert fine-grained control over what data a backend API sends back. If we're able to replace all network calls with reliable data, this also means that we can replicate scenarios in our testing environments that would be difficult to reproduce if we were hitting a real API.

For example, it might be difficult to reproduce what happens on the client-side when the API returns 500 errors (without actually breaking the API), but if we're mocking out the responses we can create a specific suite of tests that shows how our app responds to this specific edge case. That way we don't break our app and never find out until the day that edge case actually becomes reality.

## Mocking the fetch API

So, now that we know _why_ we would want to mock out `fetch`, the next question is _how_ do we do it? There's a few ways that we'll explore. Each one has unique tradeoffs—it's difficult to say whether one is "better" or "worse" since they both achieve the same effect.

### Method #1: Replace the global `fetch` with our mocked `fetch`

The first way that we can go about mocking `fetch` is to actually _replace the `global.fetch`_ function with our own mocked `fetch` (If you're not familiar with `global`, it essentially behaves the exact same as `window`, except that it works in both the browser _and_ Node. That way you don't have to change where you're getting `fetch` from per environment. You can read more about `global` [here](TK link)).

It's not usually a good idea to replace things on the `global`/`window` object! True to its name, the stuff on `global` will have effects on _your entire application_. Every time that you add stuff to the `global` namespace you're adding complexity to the app itself and risking the chance of naming collisions and side-effects.

However, in the testing environment we can get away with replacing `global.fetch` with our own mocked version—we just have to make sure that after our tests run we clean our mocks up correctly. That way we don't accidentally replace `fetch` for a separate test suite (which could potentially mock `fetch` with a different response).

Here's what it would look like to mock `global.fetch` by replacing it entirely.

```js
async function withFetch() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const json = res.json()

  return json
}

const unmockedFetch = global.fetch

beforeAll(() => {
  global.fetch = () => Promise.resolve({ json: () => [] })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

describe('withFetch', () => {
  test('works', async () => {
    const json = await withFetch()
    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toEqual(0)
  })
})
```

Let's walk through this example—first, we have the actual `withFetch` function that we'll be testing. Usually this would live in a separate file from your unit test, but for the sake of keeping the example short I've just included it inline with the tests. `withFetch` doesn't really do much—underneath the hood it hits the `placeholderjson` API and grabs an array of posts. This array is 100 posts long and just contains dummy text.

Next, let's skip over the mocking portion and take a quick look at the unit test itself. We can see that the unit test doesn't do much either. It calls the `withFetch` function and waits for it to resolve (since it's an `async` function we use `await` to pause execution until `withFetch` is done grabbing the data). Then it asserts that the returned data is an array of 0 items. If we actually hit the `placeholderjson` API and it rreturns 100 items this test is guaranteed to fail! This test is setup to make sure that we actually mock `fetch` (although another way to test is to turn wifi off and run your tests). In order to make our test pass we will have to replace the `fetch` with our own response of 0 items.

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

In the first part we store a reference to the _actual function_ for `global.fetch`. Since we'll be mocking `global.fetch` out at a later point we want to keep this reference around so that we can cleanup our mock at the end of the test suite.

The second part consists of the actual `fetch` mock. The important thing to note is that the mocked `fetch` API _must be API-compatible_ with the real `fetch` API. Since `fetch` returns a resolved `Promise` with a `json` method, we need to do the same thing inside our mock. In order to mock something effectively you must understand the API (or at least the portion that you're using). You certainly don't need to rewrite the entire module—otherwise it wouldn't be a mock—but you do need to keep the API of you mock similar to the real module.

However, instead of returning 100 posts from the `placeholderjson` API, our `fetch` mock just returns an empty array from its `json` method. You could put anything here—you could put the full 100 posts, have it "return" nothing, or anything in-between! By having control over _what_ the `fetch` mock returns we can reliably test edge cases and how our app responds to API data without being reliant on the network!

Finally, the last portion of our mock is to restore the actual `global.fetch` to its former glory after all the tests have run. `afterAll` is a hook provided by `jest` that runs at the end of the test suite (just like `beforeAll` runs before the test suite), so we use it to set `global.fetch` back to the reference that we stored.

This is important if you're running multiple test suites that rely on `global.fetch`. If you don't clean up the test suite correctly you could see failing tests for code _that is not broken_. What essentially happens is the subsequent test suites use the mock from _the earlier test suite_ and they're not expecting the same response (after all, that mock is likely in an entirely different file 😱). Furthermore, your tests might not run in the exact same order each time so it's never really a good idea to have tests share state. Instead, it's better to think of each test suite in isolation—can it run at any time, will it set up whatever it needs, and can it clean up after itself?

### Method #2: Use `jest.spyOn` to handle the mocking & resetting

## Customizing the mocked response

<!--
OUTLINE
- intro to mocking
- why should we mock network calls?
- setting up our tests in a way that allows us to mock network calls
- writing mocks for network calls
- using network mocks to reproduce edge cases
 -->
