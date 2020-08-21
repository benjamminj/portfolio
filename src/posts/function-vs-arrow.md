---
title: '(Personal) code preferences: arrow functions'
date: 2020-08-20
tags:
  - programming
  - javascript
  - preferences
---

Most opinions about code formatting boil down to personal preference.

They're like [Oxford commas](https://www.grammarly.com/blog/what-is-the-oxford-comma-and-why-do-people-care-so-much-about-it/) or essay citations—whether it's "right" or "wrong" depends on the judgment of the style guide you're using.

Styling code consistently is still important. Notably, [it makes scanning and reading code easier](https://benjaminjohnson.me/blog/empathetic-code), especially if that code was written by multiple authors.

But most formatting decisions _are_ based on preference. There isn't an objectively better choice.

As you write code, you'll develop your own preferences about how things should be formatted. And those styling decisions should have _real, valid reasons_ backing them.

Sometimes that reason is "I like the way it looks better", and that's ok.

Sometimes that reason is due to language nuances or edge cases, and that's ok.

But when you work on a team it's important to divide the important formatting decisions from the ones that are purely personal preference. Spending valuable time arguing with your team over small formatting choices is a prime example of ["bikeshedding"](https://en.wiktionary.org/wiki/bikeshedding).

This article is the first in a series that I have lined up in which I'm writing about _my personal preferences_ and the reasoning behind them.

I fully recognize that my way isn't the only valid way. But it's still valuable to capture **_my_** preference and the reasoning behind it.

I'm perfectly fine laying these preferences aside when working within a team. I often have—I'm a firm believer that preferences like this should be delegated to [formatter and linters](https://benjaminjohnson.me/blog/giving-up-control-to-your-tools) instead of taking up human effort.

In this article I'll be sharing my preferences on **_arrow functions and the `function` keyword_**.

---

## Prefer arrow functions to `function`

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

I prefer using this syntax because it results in a consistent way to declare functions in a codebase.

Even if you use `function` at the top level, chances are you'll have a number of arrow functions littered around your codebase. For example, inside of `Array.map`, callbacks, and React components' props.

I found that when I used a mix of `function` and arrow functions I had to _decide_ when to use each. Do you do `function` at the top level, arrows everywhere else? `function` when it needs a name, arrow when it's anonymous?

If you're not using `this` they'll mostly likely be equivalent, so it's a purely stylistic decision. There's a few nuances, hold tight for the "Disclaimers" section and we'll get to those.

Defaulting to arrow functions means there's one less decision that I have to make when writing functions.

Having a consistent style for functions also makes refactoring a bit easier. I'm able to pull existing arrow functions into separate files or up to the top level without having to convert them to `function` syntax.

Finally, I like the syntax of the arrow functions a little better. This is purely stylistic—I think the syntax feels a little lighter and draws focus to the functions' input and output.

## Disclaimers

You can't just replace every `function` with an arrow haphazardly. There's a few cases where using an arrow function instead of `function` is required, and vice versa.

If you're using `this`, `arguments`, `super` or `new.target`, it's important which one you use. Arrow functions won't have any of these bound to itself—they'll just look in their surrounding context.

Named arrow functions (`const name = () => {}`) don't [hoist](https://scotch.io/tutorials/understanding-hoisting-in-javascript) to the top of their scope, while `function` does. If you like organizing your code in ["newspaper structure"](https://kentcdodds.com/blog/newspaper-code-structure), then you're much better off using `function`.

Finally, a couple common gripes about arrow functions that I've heard commonly (either in person or on the internet).

- A common argument against arrow functions that they're not actually shorter than using `function`. _Technically_, arrow functions are a few more characters (if you're not using the [implicit return](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)). I still think the syntax is more compact—it neatly fits on a single line in a way that's easy to scan the inputs and outputs.

- Some complain that arrow functions have too many syntax variations. This is a valid complaint—there's a lot of different ways to write arrow functions. But I haven't seen many engineers get tripped up by them. If you're using a tool like Prettier you can just [let it deal with formatting your arrow functions consistently](https://benjaminjohnson.me/blog/giving-up-control-to-your-tools).

- One of the common complaints about arrow functions is that they show up as "Anonymous function" in a stack trace. This is mostly FUD (fear, uncertainty, and doubt). If you use `function` without a name it'll also appear as "Anonymous" as well. If you assign the arrow function to a variable the name shows up just fine.

---

## tl;dr

I prefer using arrow functions over the `function` keyword. Reasoning behind this preference includes: consistent function syntax, ease of refactoring, and compactness.
