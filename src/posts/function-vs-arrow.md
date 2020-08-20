---
title: '(Personal) code preferences: arrow functions'
date: 2020-08-18
tags:
  - programming
  - javascript
  - preferences
---

Most opinions about code formatting boil down to personal preference.

They're like [Oxford commas](https://www.grammarly.com/blog/what-is-the-oxford-comma-and-why-do-people-care-so-much-about-it/) or essay citations—whether it's "right" or "wrong" depends on the judgment of the style guide you're using.

Styling code consistently is still important. Notably, it makes scanning and reading easier, especially if that code was written by multiple authors.

But most formatting decisions _are_ based on preference. There isn't an "objectively better" way for a lot of styling decisions that cause so much drama on the internet.

When you write a lot of code, chances are you'll develop your own preferences about a number of formatting decisions. And you'll have _real, valid reasons_ behind your formatting decisions. Even if the reason is "I like the way it looks better".

But when you work on a team it's important to divide the important formatting decisions from the ones that are purely personal preference. Spending valuable time arguing with your team over small formatting choices is a prime example of ["bikeshedding"](https://en.wiktionary.org/wiki/bikeshedding).

This article is the first in a series that I have lined up in which I'm writing about _my personal preferences_ and the reasoning behind them.

I fully recognize that my way isn't the only "valid" way. But I think it's valuable to capture **_my_** preference and the reasoning backing it up. I'm perfectly fine laying these preferences aside when working within a team (and I often have).

In this article I'll be sharing my preferences on **_arrow functions and the `function` keyword_**.

---

Instead of writing JavaScript functions using the `function` keyword, just declare them as an arrow function and attach it to a variable.

```js
// Using `function`
function add(a, b) {
  return a + b
}

// Using an arrow function
const add = (a, b) => a + b
```

## Why?

I prefer using this syntax for defining functions because it results in a single way to declare functions in a codebase.

Most codebases that use `function` to declare functions will still have a bunch of arrow functions littered around the codebase. For example, inside of `Array.map` or as props to React components.

I found that when I used a mix of `function` and arrows I had to regularly _decide_ which one to use. If you're not using `this` the two different styles will likely be equivalent, so it's a purely stylistic decision.

Just defaulting to arrow functions means there's one less decision that I have to make when writing functions.

As a second benefit, having a consistent style for functions makes refactoring a little easier. I can pull any existing arrow functions into new files or up to the top level without having to convert them to `function`.

Finally, I like the syntax of the arrow functions a little better. I think the arrow syntax feels a little lighter and draws focus to the input and output of the function itself. This aspect is purely stylistic preference.

## Disclaimers

You can't just replace every `function` with an arrow haphazardly. There's a few cases where using an arrow function instead of `function` is required, and vice versa.

If you're using `this`, `arguments`, `super` or `new.target`, it's important which one you use. Arrow functions won't have any of these bound to itself—they'll just look in their surrounding context.

Arrow function that are bound to a `const` don't hoist to the top of their scope, while `function` does. If you like organizing your code in ["newspaper structure"](https://kentcdodds.com/blog/newspaper-code-structure), then you're much better off using `function`.

Finally, a couple common gripes about arrow functions that I've heard commonly (either in person or on the internet).

- A common argument against arrow functions that they're not actually "shorter" than using `function`. _Technically_, arrow functions are a few more characters (if you're using the [implicit return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)). Personally, I think the syntax is still more compact—it neatly fits on a single line in a way that's easy for a reader to scan.

- Some complain that arrow functions have too many syntax variations. I'll admit, there's a lot of variations to the syntax. But I haven't seen many engineers get too tripped up by them. If you're using a tool like Prettier you can just [let it deal with formatting your arrow functions consistently](https://benjaminjohnson.me/blog/giving-up-control-to-your-tools).

- One of the common complaints about arrow functions is that they show up as "Anonymous function" in a stack trace. This is mostly FUD (fear, uncertainty, and doubt). If you use `function` without a name it'll also appear as "Anonymous" as well. If you assign the arrow function to a variable the name shows up just fine.

---

## tl;dr

I prefer using arrow functions over the `function` keyword. Reasoning behind this preference includes: consistent function syntax, ease of refactoring, and compactness.
