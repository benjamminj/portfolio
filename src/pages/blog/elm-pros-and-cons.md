---
title: Elm — Pros & Cons
date: 2018-01-17
draft: true
---

## Pros

### Strong Typing
Elm is a _strongly-typed_ language, as opposed to JavaScript's _weak typing_. This means that all of the functions you declare have a _type signature_.

For example, if I wrote a function named `add` that takes two numbers & returns the added result, it would look like this.

#### JavaScript
```javascript
const add = (a, b) => a + b
```
#### Elm
```elm
add: Number -> Number -> Number
add a b =
  a + b
```

The key to strong typing comes in when I want to _use_ the function. What happens if I forget to pass a number into add & instead pass strings as my parameters?

```javascript
const sum = add('a', 'b') // returns the string "ab"
```

```elm
sum = add "a" "b" -- throws a really helpful compiler error saying that we passed a String where we should have passed a Number
```

Now, while the Elm snippet that I wrote above included a _type signature_ indicating that the `add` function takes 2 numbers as parameters & returns a number as a result, the Elm compiler is usually smart enough to _infer_ your type signatures for you. This means that you can hack away at your code without having to write typing for most of it. Then you're able to add the suggested type signatures when you go back. I found that as I played around with Elm more and more, I found myself thinking about typings & type signatures as part of thinking about the function rather than an afterthought.

JavaScript has had a few attempts to bring types to it, notably [Flow](https://flow.org/) & [TypeScript](https://www.typescriptlang.org/), but neither of these can be enforced quite in the same way that Elm's type checker works since they add types _on top_ of JavaScript. In addition, I've always felt that the syntax of both Flow & TypeScript can be clunky at times since they have to work around the pre-existing JavaScript syntax. In Elm, type declarations truly feel like a first class citizen & the code _will not compile_ if your types don't match up correctly.

### Enforced Error Handling
In Elm, the compiler will get reaaaaaaallly angry if you don't handle potential points of failure in your application code.

For example, let's say you make a network request for some JSON. You're gonna operate on the JSON to render a blog post (like the one you're reading. Thank you 😜) You expect the JSON to look like this. 

```json
{
  title: String,
  body: String,
  author: String,
  dateCreated: String
}
```

Easy peasy, right? You just get the JSON, and use the appropriate keys to render your blog post.

Not so fast.

What happens if the network went down in between when the user loaded your web page & when they made this request?
What happens if the JSON sends back an array of authors instead of a String?
What happens if `dateCreated` is `null`?

All of these are possiblities, especially if you're relying on a third-party API or you're workign with other developers. And as much as you might want to say "That shouldn't happen. The backend engineers will let me know when they change the payload", the fact is that sometimes this type of stuff happens, even in the best of organizations.

In JavaScript, you _could_ (not saying you always do, & definitely not saying you should!) write the code to assume that the JSON response loads perfectly every time. You might not find out that your app failed until you get either an error saying `Cannot read property \`body\` of \`undefined\`` and now you have to crawl through a debugger. Or you accidentally render the word `null` to your screen.

However, Elm forces you to write error-handling code for any operations that could _potentially fail_. Like network requests, or GeoLocation, or time operations. For the most part, it's able to enforce that you write some type of error handling code or provide some sorts of default values due to the type checker in the compiler. When the compiler sees one of these "potentially failable" operations without error-handling code, it just fails to compile until you write something to handle your errors.

Like I said, it's possible to write JavaScript that handles those potential errors, but it's really helpful to have the compiler on your side when you forget to write an error handler. Many of the bugs I've worked on usually happen because a developer forgot to handle an edge case or write code that was defensive to all points of failure.

### Purely Functional
While a purely functional language is cool, at some point or another a language / framework is going to have to be able to handle user input & application state. Elm does this all internally, allowing developers to interface with it via a paradigm known as "The Elm Architecture". This is extremely similar (almost identical) to the architecture of React + Redux (if you want to read more about The Elm Architecture I recommend [this read](todo link)).

Programming with this paradigm makes your UI a pure function of application state, meaning that it becomes incredibly simple to reason about portions of your app. _Everything in Elm is just a function_, and this tends to produce pretty readable, easy-to-reason-about code (a win in every way!).

## Cons

### It's Hard To Beat The JavaScript Ecosystem
Say what you want about the "JavaScript fatigue" & having a new framework each week: there's a _ton_ of competition in the front-end JS world, and this results in the best solutions rising to the top (most of the time).

Also, if you're new to the language or a framework, it's usually not too difficult to get it to interoperate with other portions of your favorite front-end stack (CSS/SCSS/LESS/CSS-in-JS, utility libs, etc.). Since the Elm community is a lot smaller, you're left with less choices (maybe a good thing) or you will have to build more solutions yourself (possibly also a good thing). However, this may hurt your productivity since you will have to hand-write some things that you previously could use thrid parties for.

Make note that this was the biggest pain point I experienced when I was writing Elm in a personal project...I'm one for staying minimal & not relying too heavily on 3rd party packages, but there's a lot to be said for knowing that there's 100s of thousands of blogs about how to do anything in JS & packages to help with almost any monotonous task in the JS ecosystem. A lot of these are huge boosts to productivity.

### JavaScript's Flexibility Is Both a Strength & A Weakness

We like JS because it's dynamic! While it can be a weakness at times (`undefined is not a function`...WAT), it can also be a strength when you need to dynamically assign keys to an object based on string values, or manipulate scrolling data, or _anything_. These flexibilities shouldn't be relied on in every circumstance, but they are extremely powerful when used with discretion.

### Lack of Support From a Major Company
While this shouldn't be a key factor holding back Elm's widespread adoption, it is. For heaven's sake, it's one of people's biggest concerns about Vue, and look at how insanely popular that JS framework is! The concern is that without the $$$ of funding from big players, Elm might not be around in 5 years, or it might not be able to keep up with the speed at which things are moving.

## Conclusion

I still think that Elm is 100% worth learning &mdash; if you have the time. It's valuable if only for the way that it forces you to think about your operations. What happens if the JSON you recieve from a server doesn't have the key you expect? What if the user's browser fails to give you geolocation data? (Both have been sources of particularly tricky bugs in JS I've worked on in the past year or so). Elm forces you to handle all your errors, dot all your "t's", cross all your "i's". Even if you don't start using it in the workplace, the benefits from stretching your mind are huge.

However, I also know & feel the sentiment of those with reservations towards Elm. Take, for example, the React, Angular, & Vue ecosystems. All of these have component libraries, can use any utility libraries on NPM (lodash, momentJS, validator, etc), allowing small startups to move fast & focus on writing the code that makes their startup unique. 

React is backed by Facebook, Angular by Google, Vue used in production by Alibaba, leaving managers & stakeholders at ease that these will be maintained for a foreseeable long time.