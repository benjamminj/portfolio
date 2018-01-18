---
title: Elm — Pros & Cons
date: 2018-01-15
draft: true
---

## Pros

### Strong Typing
Draw a contrast between Elm's amazing type system & the weaker alternatives in JS + types land (Flow, TypeScript)

### Friendly (Yet Strict) Compiler
Contrasted with digging through a 45-line stack trace from webpack when you make a mistake.

Enforced Error Handling for _any operation that can fail_ leads to "compiler-driven-development"...or basically, if it compiles, it works.

### Purely Functional
Elm hides all of the application state inside of the Elm runtime, allowing you to reason about your application in a declarative manner. This leads to fairly readable, code that's super easy to test, since _everything is just a function_

## Cons

### It's Hard To Beat The JavaScript Ecosystem
Say what you want about the JS ecosystem having a new framework each week: there's a _ton_ of competition, and this results in the best solutions rising to the top most of the time.

Also, if you're new to the language or a framework, it's usually not too difficult to get it to interoperate with other portions of your favorite front-end stack (CSS/SCSS/LESS/CSS-in-JS, utility libs, etc.). Since the Elm community is a lot smaller, you're left with less choices (maybe a good thing) or you will have to build more solutions yourself (possibly also a good thing). However, this may hurt your productivity since you will have to hand-write some things that you previously could use thrid parties for.

Make note that this was the biggest pain point I experienced when I was writing Elm in a personal project...I'm one for staying minimal & not relying too heavily on 3rd party packages, but there's a lot to be said for knowing that there's 100s of thousands of blogs about how to do anything in JS & packages to help with almost any monotonous task in the JS ecosystem. A lot of these are huge boosts to productivity.

### JavaScript's Flexibility Is Both a Strength & A Weakness

We like JS because it's dynamic! While it can be a weakness at times (`undefined is not a function`...WAT), it can also be a strength when you need to dynamically assign keys to an object based on string values, or manipulate scrolling data, or _anything_. These flexibilities shouldn't be relied on in every circumstance, but they are extremely powerful when used in a pinch.

### Lack of Support From a Major Company
While this shouldn't be a key factor holding back Elm's widespread adoption, it is. For heaven's sake, it's one of people's biggest concerns about Vue, and look at how insanely popular that JS framework is! The concern is that without the $$$ of funding from big players, Elm might not be around in 5 years, or it might not be able to keep up with the speed at which things are moving.

## Conclusion

I still think that Elm is 100% worth learning &mdash; if you have the time. It's valuable if only for the way that it forces you to think about your operations. What happens if the JSON you recieve from a server doesn't have the key you expect? What if the user's browser fails to give you geolocation data? (Both have been sources of particularly tricky bugs in JS I've worked on in the past year or so). Elm forces you to handle all your errors, dot all your "t's", cross all your "i's". Even if you don't start using it in the workplace, the benefits from stretching your mind are huge.

However, I also know & feel the sentiment of those with reservations towards Elm. Take, for example, the React, Angular, & Vue ecosystems. All of these have component libraries, can use any utility libraries on NPM (loash, momentJS, validator, etc), allowing small startups to move faster than if they had to write all of this from scratch. React is backed by Facebook, Angular by Google, Vue used in production by Alibaba, leaving managers & stakeholders at ease that these will be maintained for a foreseeable long time.