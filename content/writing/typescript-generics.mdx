---
title: TypeScript generics
date: 2020-09-11
lastUpdated: 2020-09-12
tags:
  - typescript
---

## tl;dr 🙃

TypeScript generics create reusable type definitions by letting you make some parts configurable. They're like **function parameters for your types.**

## Overview: basic generic types 🧱

Generic types can be difficult to wrap your mind around, especially when you're new to TypeScript. They're certainly tougher than type annotations (`const a: number = 1`) or interfaces.

Part of this is because generic types are **abstract types**.

Their syntax might also be somewhat unfamiliar—especially if you're coming from JavaScript. You might be wondering what these `<>` brackets are doing all over the code. 😱

To dive into generic types, let's start with a couple of type definitions. Imagine we have interfaces for a `User` and a `Post` in a blogging app.

```ts
interface User {
  id: string
  name: string
  email: string
  phoneNumber: string
}

interface Post {
  id: string
  userId: string
  title: string
  body: string
}
```

Now, let's think about data fetching in our fictional blogging application. We probably have some API endpoints that return paginated lists of data. Something like `/api/users` and `/api/:userId/posts`.

The interfaces for the paginated API response could look something like this.

```ts
interface UsersListResponse {
  // Array of User objects
  data: User[]
  page: number
  totalPages: number
  totalCount: number
  perPage: number
}

interface PostsListResponse {
  // Array of Post objects
  data: Post[]
  page: number
  totalPages: number
  totalCount: number
  perPage: number
}
```

You'll notice that the `UsersListResponse` and the `PostsListResponse` are nearly identical. The only thing that isn't copy-pasta is the `data` property—in one it's a `User` array, in the other a `Post` array.

With two interfaces it's not difficult to keep them synced. But as our applications grow we'll get more interfaces and maintaining the _interfaces_ gets progressively more difficult.

TypeScript generics let us create a single source of truth for _types_.

They're function paramaters for type definitions.

With generics, we can rewrite `UsersListResponse` and `PostsListResponse` to look like this.

```ts
interface PaginatedResponse<T> {
  data: T[]
  page: number
  totalPages: number
  totalCount: number
  perPage: number
}

type UsersListResponse = PaginatedResponse<User>
type PostsListResponse = PaginatedResponse<Post>
```

The _generic_ portion is the `<T>` in `PaginatedResponse<T>`—this sets up a type "parameter" named `T`. We can then use `T` inside our interface to configure the _type_ of certain properties.

In this case we want to configure `data` as a `T[]` since it's an array of whatever type `T` is.

_You can name `T` anything you like. Using `T`, `U`, and `K` as generic parameter names is a convention you'll see a lot in TypeScript code—especially for simple interfaces. Think of `T` like using `i` in a `for` loop._

Then, to create our two interfaces from before we can drop the `User` and `Post` types into the `<>` brackets on `PaginatedResponse`. So we end up with the exact same interface as before by doing `PaginatedResponse<User>`.

Leveraging these generic types allows us to easily respond to changes within our codebase in a type safe. For example, what if we added a new type of `Label` to the system? This is all we'd need on the TypeScript front.

```ts
interface Label {
  id: string
  name: string
  color: string
}

type LabelsListData = PaginatedResponse<Label>
```

## A deeper dive: advanced generic types

I hope this small example has shown some of the ways that generic types can help in making your TypeScript code less verbose and more elegant!

The examples above cover some basic usage of generic types. In this section we'll dive a little deeper and look at some extra "tricks" to make our generics even more useful. 💪

### Constrained generic types

Sometimes we want to provide a generic type, but we don't want it to allow any type as a parameter. Instead, we want to limit the parameter to a few approved types.

```ts
interface IndividualResponse<T extends object> {
  data: T
}

// ✅ This compiles correctly.
type UserByIdResponse = IndividualResponse<User>

// 🚨 This gives the following compiler error:
// "Type 'number' does not satisfy the constraint 'object'."
type NumberResponse = IndividualResponse<number>
```

The type constraint is that `extends object` bit. I like to think of it as similar to typing a function argument.

```ts
const add = (a: number, b: number) => a + b
```

In this `add` function TypeScript doesn't care about what values we pass into `a` and `b`. But it does throw compiler errors if those values aren't `number` types. In a similar way our `IndividualResponse` type will allow any type as a parameter as long as it is an `object`. Since `number` isn't an `object` type, we get a compiler error.

### Default generic types

In the same way that we can provide a type constraint to an interface, we can also provide a default type when we're creating generics.

```ts
interface IndividualResponse<T = object> {
  data: object
}

const response: IndividualResponse = someData
const numberResponse: IndividualResponse<number> = someOtherData

// This will have a a type of "object"
response.data

// This will have a a type of "number"
numberResponse.data
```

It's usually a good idea to add some default type if you're planning on having your interfaces get reused a lot (unless you can infer the type from a function parameter—we'll get to that next).

Lots of libraries use this approach in their type definitions because it gives you some default type safety out of the box without forcing you to use the `<>` syntax every time you use their API. And then if you want better type checking you can use the `<>` and pass your types in. Best of both worlds! 🔥

### Inferring generics from function parameters 🤯

One of the most powerful ways to use TypeScript generics is to infer their type from function parameters.

Consider this simplified version of the `Array.prototype.filter` function.

```ts
const filter = <T = unknown>(
  array: T[],
  validate: (value: T, index: number) => boolean
): T[] => {
  const newArray = []
  for (let i = 0; i < array.length; i++) {
    const value = array[i]
    const isValid = validate(value, i)

    if (isValid) {
      newArray.push(value)
    }
  }

  return newArray
}

const above3 = filter([1, 2, 3, 4, 5], number => number > 3) // Returns [4, 5]

above3 // Type is a "number[]"
```

This is way more confusing on the syntax front. Let's break down what's going on in `filter`.

First, we have `<T = unknown>` in front of the parentheses. This has the same purpose as `interface Name<T>`—this is just the syntax for adding a generic to a function.

```ts
const filter = <T = unknown>(array, validate) => {
  // function body
}
```

Next, let's look at the `array` parameter to `filter`.

```ts
const filter = <T = unknown>(array: T[], validate) => {
  // function body
}
```

This says that the argument we pass as `array` should be our dynamic `T` type.

This alone is actually enough for TypeScript to **infer** that when we call `filter([1, 2, 3, 4], value => value > 3)` that `array` will be a `number[]` and not something else!

But we can go a few steps further.

Let's take a look at the `validate` argument.

```ts
const filter = <T = unknown>(
  array: T[],
  validate: (value: T, index: number) => boolean
) => {
  // function body
}
```

We can also use `T` when typing our `validate` function to say that _whatever the type of the array is, the "value" should be the same type_.

This means that when we do `filter([1, 2, 3, 4], value => value > 3)` the compiler actually knows that `value => value > 3` should be a **number**. If we tried to do `value => value.toUpperCase()` we'd get a compiler error, since `toUpperCase` only exists on `string` types.

Finally, we add `T[]` as the return type of the function.

```ts
const filter = <T = unknown>(
  array: T[],
  validate: (value: T, index: number) => boolean
): T[] => {
  // function body
}
```

This seems like crazy rocket science. Maybe even over-the-top, wouldn't it just be easier to use `any` types?

But it all comes together when we actually put our `filter` function into action.

```ts
const above3 = filter([1, 2, 3, 4, 5], value => value > 3)
```

You'll notice that this **doesn't have any types added**. It's plain JavaScript.

But if we look at the type of `above3` in an IDE we'll see it's a `number[]`. In VSCode you can hover over the variable and you'll see its type. Looking at `value` also shows it's a `number` too. 🔥

We gave enough hints to the compiler that all it needed was `[1, 2, 3, 4, 5]` to figure out all of the type definitions.

---

Defining generic types this way can be difficult to get right. Chances are you'll struggle with the compiler your first few times.

But the reward is type safety without syntax clutter bleeding into other parts of your app. You drastically cut down on verbosity without sacrificing on type safety.

Using generic types this way lets you hide the verbose TypeScript typings inside the function itself. That way you don't force others to manually provide types whenever they're using `filter`.

## A warning about generics 🚧

As you can see, TypeScript generics can range from simple to ridiculously complex. It's easy for them to get out of hand if you're not careful.

Don't go overboard when creating generic types—a little duplication is preferable to overengineering.

TypeScript code is just a tool to help you write JavaScript—it's all going to get compiled down into JavaScript when you ship it. The type definitions are for _developers only_.

Good developer experience does matter, but it doesn't come at the expense of shipping a good user experience. The last thing you want to do is spend a bunch of time on TypeScript typings and ship nothing.

Personally, I cap my attempt at around 30 minutes. That's usually enough for me to get it working. But if I still can't get the generic type right I add `unknown` or `any` and continue with my work. Sometimes I'll circle back around to it, sometimes I won't. 🤷‍♀️

If getting generic types is difficult at first, keep trying! Like all programming concepts, it gets easier with practice.

---

## Resources

For some further reading on TypeScript generics, check out these resources. 🤓

- [Basarat's TypeScript Deep Dive](https://basarat.gitbook.io/typescript/type-system/generics)
- [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/generics.html#using-type-parameters-in-generic-constraints)
