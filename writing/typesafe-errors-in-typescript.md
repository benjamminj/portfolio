---
title: Leaning into TypeScript for type-safe error handling
description: You get more out of the type system if you think of the compiler as your friend instead of  a gatekeeper.
date: 2020-04-12
draft: false
image:
  url: 'images/pawel-czerwinski-unsplash.jpg'
  alt: 'Abstract rock pattern with vibrant colors'
tags:
  - typescript
  - exception-handling
---

Over the past year I've been working on a large TypeScript project, and I'm happy to say I'm now officially on "team TypeScript".

Previously I've felt a little cautious about jumping on the TypeScript hype train for two main reasons:

- **"It's too verbose."** Compared to JavaScript, TypeScript is certainly much more verbose. Other statically typed languages, like Reason and Elm don't require you to write nearly as many type annotations either.
- **"The type system isn't strong enough."** Using the `any` type lets you break out of type-checking entirely, so the type system is only strong as long as you're diligent enough to add the type annotations correctly. Compare this to Reason and Elm—the other statically-typed languages I've worked in—and you'll see that they both have much stronger type systems.

I've written about both of these before—here's [an article I wrote a while back](https://blog.logrocket.com/what-makes-reasonml-so-great-c2c2fc215ccb/) on why Reason is so cool. I still think Reason is cool, but I'm no longer hesitant about TypeScript.

After working with TypeScript (TS) for a while, I think it has a type system that's _strong enough_ to provide confidence. The verbosity I felt when using TS was more due to unfamiliarity.

I'm a firm believer that when using a static type system you get more out of it by leaning _into_ the type system rather than fighting against the type system. It's best if you think of the compiler as your friend instead of your enemy.

Which brings me to the focus of this article—how we can work _with_ TypeScript to handle errors.

## Why throwing errors isn't type-safe

A very common style of handling errors in JavaScript (and TypeScript) is to `throw` an error. `throw` is built-in to JavaScript—by `throw`ing an `Error` it propagates up the stack until it reaches a `catch` block.

```js
function throwsError() {
  throw new Error('😱')
}

try {
  throwError()
} catch (error) {
  // we have access to the error here.
}
```

Using `throw` to handle errors isn't bad—many server frameworks like NestJS and Express use this method since you can use a single `catch` block at the top of your app. This means you're able to handle all errors in your app in a single location—regardless of their point of origin.

In React you can catch errors coming from your components using [`componentDidCatch`](https://reactjs.org/docs/error-boundaries.html) and creating an `ErrorBoundary` component (I'm not too sure about other front-end frameworks since I mostly work in React).

However, just because `throw` is common doesn't mean it's _type-safe_. Anytime you `throw` an error, you need to have a `catch` block to catch it or it could potentially bubble up and crash your app! TypeScript isn't able to infer that your code using `throw` is nested inside a `catch` block so whenever you use `catch` you're relying on developer diligence instead of the type system to make sure your app won't crash on flaky data.

## Using a `Result` type to leverage the type system

So, how can we manage failure and uncertainty in our app in a way that allows the type system to catch potentially unsafe code for us?

I have a custom type that I use to wrap unsafe code, here's what it looks like:

```ts
type ResultSuccess<T> = { type: 'success'; value: T }

type ResultError = { type: 'error'; error: Error }

type Result<T> = ResultSuccess | ResultError
```

The `Result` type is an example of a TypeScript _union type_—it represents something that could be a `ResultSuccess` _or_ a `ResultError`. `ResultSuccess` and `ResultError` both have a `type` property, but other than that the objects are completely different.

Here's what it would look like to have a function that returns a `Result` type.

```ts
let myFunction = (value: string): Result<number> => {
  if (value === '0') {
    return { type: 'error', error: new Error('The value cannot be 0') }
  }

  return { type: 'success', value }
}
```

This example is fairly small—the function doesn't do much more than checking whether the `value` is `0` or not. However, the benefits of a `Result` type become clearer when we slap it on an API request:

```ts
import axios from 'axios'

let myRequest = async (id: string): Result<User> => {
  try {
    let result = await axios.get(`/my-api/users/${id}`)
    return { type: 'success', value: result.data }
  } catch (error) {
    return { type: 'error', error }
  }
}
```

One note about using `axios` for data fetching is that it will automatically `throw` an error if the API returns anything with a 400-level or 500-level response. While this means you don't _have to_ check for successful responses, this opens us up to the danger that an uncaught exception crashes the entire app.

However, if we wrap the `axios` call in a try/catch block, how do we type that? And what if we actually _do_ want to `throw` an error from our failed requests?

When we have our "risky" code return a `Result`, TypeScript is smart enough to force us to check the `Result` type for a successful response _before_ we try to use the value.

```ts
let fetchDataAndNotify = async () => {
  let data = await myRequest('@benjamminj')

  if (data.type === 'success') {
    return `The user's name is ${data.value.name}`
  }

  return `There was an error fetching this user.`
}
```

I'll admit, having these types of checks around the codebase isn't the "prettiest" thing in the world. But it's certainly better than having the app randomly crash when data is missing or API requests fail. Fault-tolerance and safety are more valuable than avoiding a couple `if` blocks!

Using `Result` allows us to take a potential runtime error and turn it into a compile-type error:

```ts
let fetchDataAndNotify = async () => {
  let data = await myRequest('@benjamminj')

  // This line will be a TS error, since `data.value` doesn't exist on
  // `ResultError` and we don't know for sure that `data` is a `ResultSuccess`
  return `The user's name is ${data.value.name}`
}
```

As an added bonus, if you _do_ want to throw an error, the `ResultError` type contains an actual `Error`. This gives you full control over how and when errors get thrown from your app.

```ts
let renderEssentialData = async () => {
  let data = await myRequest('@benjamminj')

  if (data.type === 'error') {
    // If this data is essential to the app, it's better to fail fast than to
    // show potentially malformed or invalid states.
    throw data.error
  }

  // Do stuff with the data here, TS knows that it's a ResultSuccess type by now.
}
```

And that's it! I've been using this approach for most of the API calls coming into the front-end. I'm really happy with how it's turned out on the apps where I've implemented it! Instead of having random crashes, I'm forced time and time again by the compiler to either design error states for missing data or API failures.

## Influences and Prior Art

This pattern isn't something I came up with out of the blue, so I want to highlight a couple key influences I had in discovering this pattern.

One of the key influences for this `Result` interface came from the [`Option` type in Reason](https://reasonml.github.io/docs/en/null-undefined-option). The `Option` type is the way that Reason allows you to deal with nullable data without compromising its type safety. It's fairly similar to the `Maybe` monad in Elm and Haskell if you're a fan of those languages.

Secondly, I've gotten a lot of great TypeScript patterns from [TypeScript Deep Dive](https://basarat.gitbooks.io/typescript/) by [Basarat Ali Syed](https://github.com/basarat). Specifically, his section on [exception handling](https://basarat.gitbook.io/typescript/type-system/exceptions#you-dont-have-to-throw-an-error) was influential in me using this `Result` pattern.

Lastly, I wanted to reiterate that that the best solutions with TypeScript typically come from leaning _into_ the type system rather than fighting against it. This `Result` type came out of desiring to find a way to force my team (myself included) check for error states rather than optimistically trusting that certain functions (primarily API requests) will always return successfully.

If you enjoyed this, please let me know on my [Twitter](https://twitter.com/benjamminj) or [LinkedIn](https://www.linkedin.com/in/benjamin-d-johnson/) with a share! If you found any errors or bugs in this article let me know or submit a pull request to update this article.

<!-- prettier-ignore -->
*The cover photo for this article is by [Pawel Czerwinski](https://unsplash.com/@pawel_czerwinski) on [Unplash](https://unsplash.com/s/photos/rocks-abstract).*
