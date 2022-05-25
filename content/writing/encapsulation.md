---
title: Encapsulation
date: 2022-01-01
tags:
  - software-engineering
  - definitions
---

## tl;dr

> _**Encapsulation:** hiding the specific information about a portion of code._

---

We have tons of examples of encapsulation outside the software world.

When you drive a car, you don't need to know about everything happening inside the engine, you use the steering wheel & 2-3 pedals to control the whole thing.

When you unlock a door, you're using a simpler interface for a [complex locking machanism](https://en.wikipedia.org/wiki/Lock_and_key). But all you do is insert the key, turn, and push.

The same ideas apply to writing software, we use encapsulation all the time without thinking twice. Consider this sample JavaScript.

```js
JSON.parse(someJSONValue)
```

When you call `JSON.parse`, you don't need to know everything about _how_ the JSON gets parsed, you only need to know a few things: the JSON you want to parse, and that you get back a parsed JS object (or array).

_(Yes, I know `JSON.parse` takes a couple arguments, but these are optional)._

Encapsulation is fundamental for building large software systems. Hiding complex information about a module allows others to use that module to build bigger things. We allow the people to _focus_ on a single piece of an application without holding everything in their head at once.

In short, encapsulation is the name of the game when it comes to software. we'd all do well to spend lots of brain cycles on encapsulating well.
