---
title: Type definitions for async functions in TypeScript
description: Understanding how JavaScript async functions work under the hood helps us know exactly how to type them in TypeScript.
date: 2020-04-22
draft: false
image:
  url: 'photo-boards-shapes.jpg'
  alt: 'Abstract wall decor in blue, yellow and brown'
tags:
  - typescript
  - promises
  - async
---

One of the things that tripped me up when I first started using TypeScript was how to write type definitions for async functions.

Async/await syntax were added to ECMAScript in 2017 (or ES8), and it's incredibly useful for dealing with asynchronous code. If you're unfamiliar with async/await, this is what the syntax looks like:

```js
async function fetchData(id) {
  const result = await fetch(`https://example.com/users/${id}`)
  const json = result.json()

  // json is an array of users
  return json
}
```

Or, if you prefer using arrow functions, the above function's equivalent would look like this:

```js
const fetchData = async id => {
  const result = await fetch(`https://example.com/users/${id}`)
  const json = result.json()

  // json is an array of users
  return json
}
```

Changing a regular function into an async function happens just by using the `async` keyword in front of the function declaration. By doing this, we're able to use the `await` keyword to simply have our function pause execution until whatever we're `await`ing is resolved.

Before we get to writing TypeScript definitions, it's important that we have a thorough understanding of how JavaScript [promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) work. The reason for this is that async/await is just a pretty syntax for promises! So when we get around to type definitions, typing an async function is exactly the same as typing a function that returns a promise.

Our sample function _without async/await_ would look like this:

```js
function fetchData(id) {
  // resolves with an array of users
  return fetch(`https://example.com/users/${id}`).then(result => result.json())
}
```

This function and the async/await version are _the same_ in terms of how they behave and what type of values they return. The difference is purely in the syntax.

_💬 **A quick note:** since async/await is just a pretty syntax for promises, you might find that in some cases using the regular promise syntax feels cleaner. This is ok—it's not wrong to use async/await and promises interchangeably based on the situation. I personally think our example lends itself more to promises since there's only a single `.then` being chained._

## Now to the type definitions!

Armed with the knowledge that an async function is a fancy syntax for a function that returns a promise, we can move on to writing the type definitions.

TypeScript has a built in `Promise` type we can use to describe promises—it's a [generic type](https://www.typescriptlang.org/docs/handbook/generics.html) so we'll pass in the _type_ that the promise resolves with.

```ts
interface User {
  id: string
  name: string
}

// This type describes a promise resolving with an array of user objects.
type UsersPromise = Promise<User[]>
```

Once we've identified how to wrap our `User` interface in the `Promise` type all that's left to do is attach it to our function and add the other type annotations:

```ts
interface User {
  id: string
  name: string
}

async function fetchData(id: string): Promise<User[]> {
  const result = await fetch(`https://example.com/users/${id}`)
  const json = result.json()

  // json is an array of users
  return json
}
```

We give `id` a type of `string` so that TypeScript knows how to infer its type, and then just attach the `Promise<User[]>` to `fetchData` as the return value. This tells TypeScript that the function operates asynchronously and anyone using it will need to either `await` it or use `fetchData(id).then(users => {})` to actually make use of the fetched `users` data.

If you prefer to use [type aliases](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases) for your functions, you can use the same TypeScript syntax along with declaring the function slightly differently to type the async function with a type alias:

```ts
interface User {
  id: string
  name: string
}

// Type alias
type FetchData = (id: string) => Promise<User[]>

const fetchData: FetchData = async id => {
  const result = await fetch(`https://example.com/users/${id}`)
  const json = result.json()

  // json is an array of users
  return json
}
```

This can be especially useful to decrease verbosity if the async function you're typing has multiple or complex parameters.

---

Thanks for reading—I hope that this was helpful to you in figuring out how to still use async/await syntax while giving TypeScript enough info to properly infer the shapes of the data your async functions are returning.

As always, feel free to hit me up on my [Twitter](https://twitter.com/benjamminj) or [LinkedIn](https://www.linkedin.com/in/benjamin-d-johnson/) with any thoughts. If you found a typo in this article or have some feedback for improvement please feel free to [sumbit a pull request](https://github.com/benjamminj/portfolio).
