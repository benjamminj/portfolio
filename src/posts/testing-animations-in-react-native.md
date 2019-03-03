---
title: Testing Animated Components in React Native
description: As a result of my issues with testing React Native components with animations I learned quite a bit about how React Native and Jest environment are set up.
date: 2019-02-17
---

I came up upon this issue a couple weeks back and it's been bouncing around my head as food for a blog post since. I've always thought that the "write the blog post you wish you had" concept is great. The hard part is that after you're done solving difficult problems, you barely have any energy left to write the post!

Anyways, I've been working a fair amount in React Native the past few months. It's certainly been a learning experience since this is my first time delving into native development. In addition, something that I'm pretty passionate about is setting up a solid testing suite for whatever project I'm working on (that is, if it doesn't already have tests). I'm a firm believer that a well-written testing suite can [save hours of time and thousands of dollars](https://www.computer.org/csdl/mags/so/2007/03/s3024.pdf).

As a result I've been learning quite a bit about testing React Native apps with Jest. And recently I came up on an especially tricky test. I had this component that contained an animation—via React Native's `Animated` module. Internally, the component triggered some state changes along with some animations. While I can't share the actual component in this post, I do want to document how to manage these types of tricky tests.

In my unit test I wasn't trying to do anything _too_ fancy. Render the component, fire some "onPress" events, and then run some assertions on how the component had changes. But the first time I ran my tests, I ended up with the following error:

```
ReferenceError: You are trying to `import` a file after the Jest environment has been torn down.
```

When the test runs the state update, this triggers the animation inside the component. However, by the time that the animation runs, the test has already run all of its assertions and completed. So by the time the [animation's callback](https://facebook.github.io/react-native/docs/animated#working-with-animations) triggers a `setState`, the component has already unmounted!

## Why can't we just mock `Animated`?

As a first solution, I thought I might be able to get away with mocking out the entire `Animated` module from React Native. However, after some consideration I decided _against_ this for a few reasons.

First off, the `Animated` module is decently complex, and coming up with a solid mock is not a small feat. It contains multiple animation components, functions to control timing and easing, and some of the APIs allow [method chaining](https://javascriptissexy.com/beautiful-javascript-easily-create-chainable-cascading-methods-for-expressiveness/). When mocking it's important to have something that's API-compatible with the real module—or at least the parts that you're using. I found that my component was using a sizable portion of the `Animated` API, so it would take quite a bit of effort to mock it out. While not impossible, it's worth acknowledging that a mock wouldn't be simple.

However, that's not the only reason. Whenever you mock out a module you decrease the similarity that your code _under test_ has to your code _in the real world_. There's a lot of opinions about this, for example this article on [why mocking is a code smell](https://medium.com/javascript-scene/mocking-is-a-code-smell-944a70c90a6a). My preference is to lean more on the side of integration testing and less on mocking when it comes to testing software (especially for front-end apps). So, I wanted to actually use the `Animated` module to make sure that my tests were more accurate.

What I wanted is to mock _something_ in the testing environment that allowed me to use the _real_ `Animated` module _without throwing the Jest error_.

## Why we can't only use `jest.useFakeTimers`

Jest ships with a tool exactly for testing these scenarios—[`jest.useFakeTimers`](https://jestjs.io/docs/en/timer-mocks.html). Using `jest.useFakeTimers` allows us to mock out _time itself_ and how the test runner progresses through time.

So I figured I'd try it out. All you've got to do is call the function at the top of your test suite:

```jsx
beforeEach(() => {
  jest.useFakeTimers()
})
```

And then to advance the fake time, you can do something like this:

```jsx
// inside a test
// move forward 500ms
jest.advanceTimersByTime(500)
```

Turns out this creates an _entirely new error_ specific to only the testing environment. The error goes something like this:

```
Ran 100000 timers, and there are still more! Assuming we've hit an infinite recursion and bailing out...
```

### Why do we get `Ran 100000 timers, and there are still more!`?

This error was even more cryptic to me and the first one! And when it came to finding out the answers, I had to spend a long time digging through StackOverflow posts and GitHub issues. Fortunately, I eventually stumbled on [this StackOverflow answer](https://stackoverflow.com/a/51067606).

Turns out, React creates a polyfilled version of `requestAnimationFrame` in order to run its animations. And that Reach Native's implementation of `global.requestAnimationFrame` uses `setTimeout(fn, 0)` under the hood. While this is all good in normal execution context (it just runs on the next tick of the runtime), when we're using `useFakeTimers` the `setTimeout(fn, 0)` spins off a bunch of new timers (1 per timeout) very quickly. This causes Jest to bail out because the stack gets too large and it thinks that you accidentally created an infinite recursion. Not good!

## Time travelling (and StackOverflow) to save the day

In addition to finding out why I was getting this cryptic error, I also found a really nice solution on StackOverflow that I adapted to actually be able to test animations reliably—without extensive mocking of `Animated`.

This is only slightly adapted—personally, I don't like 100% copy-pasting code from StackOverflow. I find that when I take the time to rewrite the code in my own "words" I understand what's actually happening a bit better—even if it looks almost identical to the original code.

So let's see how we could implement a solution.

First, we need to mock out the `requestAnimationFrame` to not use `setTimeout(fn, 0)` under the hood. If we assume that we'll be using `jest.useFakeTimers` to actually move _forward_ through time, `setTimeout` itself isn't the issue. The issue is `useFakeTimers` along with `setTimeout(fn, 0)`. So what we can do is change the timeout that `requestAnimationFrame` uses under the hood.

```jsx
// in a test setup file, or your test itself
const FRAME_TIME = 10

global.requestAnimationFrame = cb => {
  setTimeout(cb, FRAME_TIME)
}
```

What this does is simulate a new frame every 10 milliseconds. You could put any number here, but the reason why I like 10 for the timeout amount is because it allows us to avoid mathematical gymnastics inside of our unit tests. For example, if we travel forward by 300ms, it's easy to mentally calculate that we'll advance by 30 frames.

Now that we've polyfilled `requestAnimationFrame`, the next order of business is to set up a `timeTravel` function. This makes sure that when we're travelling forward through time we do all of the things necessary so that React Native's animations run correctly in the test environment.

```jsx
// timeTravel.js
import MockDate from 'mockdate'

const FRAME_TIME = 10

const advanceOneFrame = () => {
  const now = Date.now()
  MockDate.set(new Date(now + FRAME_TIME))
  jest.advanceTimersByTime(FRAME_TIME)
}

const timeTravel = (msToAdvance = FRAME_TIME) => {
  const numberOfFramesToRun = msToAdvance / FRAME_TIME
  let framesElapsed = 0

  // Step through each of the frames until we've ran them all
  while (framesElapsed < numberOfFramesToRun) {
    advanceOneFrame()
    framesElapsed++
  }
}

export default timeTravel
```

It's worth noting that we _do_ need this `timeTravel` function in addition to the `requestAnimationFrame` polyfill. The main reason has to do with the way that React Native's `Animated` module calculates elapsed time (and an animation's progress). Under the hood, it uses the current date (`Date.now`) to calculate how much time elapsed since the animation began.

As a result, we have to make sure that each frame we advance in `timeTravel` updates `Date.now`. In the `advanceOneFrame` function we take the current `Date.now` value and make sure that it advances forward by one "frame" (10ms). I'm using a library called [`MockDate`](https://github.com/boblauer/MockDate) which makes testing with dates an absolute breeze. In addition, we advance the Jest timers using `jest.advanceTimersByTime`. This makes sure that our Animation is calculated correctly _and_ our `setTimeout`s get called without creating infinite recursion.

Then, in the `timeTravel` function we take a single argument—the amount of time to "move forward"—and use it to calculate how many frames this would be. After that it's a matter of wrapping our `advanceOneFrame` function inside a `while` loop. This makes sure we keep stepping forward one frame at a time until we've hit our `msToAdvance` number.

Lastly, we need to do a little bit of setup in order to use this function. I find it helpful to create a `setupTimeTravel` function that can be dropped into Jest's `beforeEach` whenever I make test utilities like this. Even though our `setupTimeTravel` function isn't too complex, it's useful since it keeps everything related to this utility contained to one place.

```jsx
// timeTravel.js
export const setupTimeTravel = () => {
  MockDate.set(0)
  jest.useFakeTimers()
}
```

The first line of our `setupTimeTravel` function isn't 100% necessary, but it certainly helps. Because `Animated` relies on `Date.now` to calculate elapsed time, setting it to `0` makes it easier to reason about our animation logic later on. However, you _could_ get by without it, so leave it out if you want to!

However, we do need to use `jest.useFakeTimers` in our `setupTimeTravel` function—if you leave this out the `timeTravel` function won't work!

### Using our `timeTravel` function in a test

Now that we've got our brand new `timeTravel` function, let's see what it could look like in a test!

```jsx
import { timeTravel, setupTimeTravel } from './path-to/timeTravel'

beforeEach(setupTimeTravel)

describe('<ComponentWithAnimation />', () => {
  test('works with animations', () => {
    // render the component
    // trigger some animation

    // this actually moves the timers forward
    // and simulates the frames over 500ms
    timeTravel(500)

    // run assertions on the animated state here
  })
})
```

---

## Conclusion

I thought that this issue with testing React Native Animations was especially interesting. As a result of my issues with testing this component I learned quite a bit about how React Native calculates animation duration as well as how the Jest environment was set up. When I was googling all over for that "Ran 100000 timers, and there are still more!" error, there wasn't too much to find, and if I had this blog post then it certainly would have been helpful! I hope that this was helpful to any of you reading along!

If you enjoyed reading this article, you're welcome to check out and follow me on [Twitter](https://twitter.com/benjamminj). I promise I'll share any time I post something new. And if you want to edit this post at all please feel free to open a [PR on GitHub](https://github.com/benjamminj/portfolio). Thanks for reading! 🎉
