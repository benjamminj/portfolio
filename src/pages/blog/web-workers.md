---
title: Web Workers
date: 2017-12-26
draft: true
---
<!-- todo
intro
links
 -->

<!-- todo -- catchy intro -->
Over the first year of my time as a front-end developer, I kept hearing about these things called **web workers**. Now, I was never taught _what_ they were, just that they were important.

## The Problem: Blocking vs. Non-blocking
- perhaps an example of a blocking script vs. a non-blocking version of the same script?
- JS is single threaded — it can only do one thing at a time.
- If you need to perform anything intensive as far as processing goes, within the singel-threaded JS runtime you're fairly limited...either you have to block the thread, or do that type of processing server-side in a way that won't block the user experience.
- thread-blocking is **really bad** — users start to notice degraded performance as soon as frame rate drops below 60fps (maybe get a link for this stat...). If you want users to feel at home and get a near-natvie experience on your app, you need to keep the frame rate at near-mobile performance.


## The Solution: Web Workers & "Multithreaded JavaScript"

- web workers let you spin up new execution threads — at a real OS-level — that can run independent of the main execution thread and allow you to perform intensive operations without blocking your UI
- types of workers (dedicated vs. shared)

## The Worker Environment
## Communication To & From Workers
## Caveats & "Gotchas" of Web Workers
- added complexity. make sure that you actually need to spinning up a worker before you go ahead and add a ton of complexity around multithreading
- limited scope - again, workers can't access the DOM or many of the window APIs. This limits what you can do with them.
- memory - look into the overhead cost of spinning up a worker...is it expensive?

## Related Reads

[You Don't Know JS (Kyle Simpson)](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch5.md#web-workers)

## Setting Up a Simple Web Worker

* Perhaps put into a separate post and link from here?
