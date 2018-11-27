---
title: Recursion, JavaScript, and Operations of Non-Trivial Size
date: 2018-03-05
draft: true
---

Explore Recursion, benefits, tradeoffs, etc.

## Recursion

```javascript
// fibonacci? because that's the way everyone demonstrates recursion?
```

## The Problem

In JS, the call stack is only so big. So if you're doing a REALLY big operation (or one that could potentially go for a long time, recursion could blow up in your face)

```javascript
// get the stack trace, preferably with the same func from pt 1
```

---

## Optimizing with Proper Tail Calls (The Native Way)

Best as far as the code is concerned. If you're using proper tail calls, you'll just get the performance optimizations for free in your recursive functions.

A couple things are part of contract to actually get the optimizations. For the engine to use tail calls, you must.

- the recursive portion of the function must be in "tail position". You must `return` the result of the recursion.
- you must be in `use strict` mode

For a more in-depth look of what `tail position` is, please check out [this post](https://2ality.com/2015/06/tail-call-optimization.html) on 2ality. They've done an amazing job of summing up exactly _what_ you must do to recieve the benefits of tail-call optimization.

However, there's one problem with relying on TCO (before you go and do a ton of recursion)

**Browser support is minimal, at best.** At the time of writing, TCO is only supporting in Safari & Node 6+ (with a flag). This means if you're planning on doing _anything front-end related_, you will need to find some other option.

## A simple, non-disruptive option: Trampolines

Shoutout to FLJS for teaching me about trampolines & their practical application.
Go through a basic trampoline function implementation, basically the one that was in FLJS / my Project Euler stuff.

```javascript
// trampoline fn
```

Note that you will need to modify your original function a tiny bit.

```javascript
// original fn, with the extra () =>
```

By adding the extra arrow function, your recursive function isn't evaluated until called inside the `while` loop, allowing time for the JS engine to pop the previous function call off the stack.

An extra note. If you're using this method, you need to call the _function_ inside the trampoline as your recursion. Because of this I find it helpful to follow a naming convention `{fnName}Rec` to make the recursion a little easier to see.