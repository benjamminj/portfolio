---
title: Web Workers
date: 2017-12-26
draft: true
---
<!-- 
todo -- rewrite/reflow...doen'st feel natural or focused 
perhaps break into a series of smaller articles
-->
<!-- todo -- catchy intro -->

Over the first year of my time as a front-end developer, I kept hearing about these things called **web workers**. Now, I was never taught _what_ they were, just that they were important.

Let the record show: **web workers aren't new**. At all. They've been around for a looooong time (especially on the time-scale of the web and the pace it evolves.)

I really just want this post to be an introduction to web workers.

## The Problem: Blocking vs. Non-blocking

Let's get right into the crux of the issue: **blocking vs. non-blocking** code.

If you're somewhat familiar with JavaScript, you should know that JavaScript runs inside what we call a **single-threaded** environment.

Long story short, this means that the execution runtime can only do _one thing at any given time_. (If you're not too familiar with the JavaScript call stack/runtime, I recommend giving [this video](https://www.youtube.com/watch?v=8aGhZQkoFbQ) a watch, it's an A+ in my book).

When we can only do one thing at a time any computation-intensive tasks are going to keep other tasks from running. For example, take the following snippet of code

```javascript
const getReallyBigString = () => {
  let string = ''
  for (var i = 0; i < 1e6; i++) {
    string += i
  }

  return string
}
```

Take this snippet and copy paste it into your browser console. Then run `getReallyBigString()` and try clicking around the console.

Chances are, your UI freezes for a few seconds, and any button clicks you make are unresponsive. We call this a **thread-blocking** script since it blocks the JS main thread from executing any other code, effectively rendering our UI unresponsive.

Not the greatest user experience, especially in an age where users are prone to leave a website at the slightest hint of unresponsiveness.

### Asynchronous Code

This is a very well known limitation of the simplicity of working within a single-threaded envrionment, and there are a number of ways of making sure that asynchronous code runs in a fashion that doesn't block the event loop & clog up the UI.

* [Callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function) are a simple way of guaranteeing that code waiting to be run doesn't block anything, but they can get out of control quickly (hence the term "[callback hell](http://callbackhell.com/)")
* [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) have been included natively in JavaScript since the ES2015 spec. They make dealing with asynchrony quite a bit easier, and flatten out the nestedness that led to callback hell.
* [Async/Await](https://developers.google.com/web/fundamentals/primers/async-functions) is the newest kid on the async block, coming along in the ES2017 spec. It offers a slightly cleaner syntax than Promises in most cases.

Chances are, the above three solutions are more than enough for 99% of your use cases. I know they are for me. However, the trouble arises when we need to run something that is higher intensity _and_ synchronous by nature.

Take the above example. Running anything in a `for` loop results in synchronous "thread-blocking" code. The same goes for a lot of the other built-ins, such as `Array.map()` & `Array.reduce()`.

Or perhaps you have a smaller array/iteration length, but you need to do some really heavy lifting _inside_ the function body. Or you need to load & parse more code

Wouldn't it be great if we could spin up a new thread to do heavy computational tasks, and then send the result back to the main thread when it's done?

_Enter web workers._

## The Solution: Web Workers & "Multithreaded JavaScript"

Web workers let you spin up _real OS-level threads_ that can communicate with the main thread via a message protocol.

It's worth nothing that while callbacks, promises, and async/await are part of the JavaScript _language_, web workers are not. They're one of the [browser APIs](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction), similar to the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) or the [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model). These browser APIs, although not part of JavaScript, allow you to use JavaScript to interact with the web browser.

Web workers come in two main types.

1. **Dedicated Workers** allow you spin up a web worker that communicates with a **single** script in the main JS thread. Basically, the script that sets up the worker thread is the only script that's allowed to communicate with the worker. Most workers will fall into this use case, and this type of web worker is highly supported in [all major browsers](https://caniuse.com/#feat=webworkers)
1. **Shared Workers** can communicate with multiple scripts, even if they're in different browser tabs, iframes, etc. While this is super cool and likely opens a lot of interesting use cases, they're only currently supported in [Firefox & Chrome](https://caniuse.com/#feat=sharedworkers).

For the rest of this article we'll primarily be looking at Dedicated Workers
## The Worker Environment

When writing a script that will run inside of a web worker, it's important to note that _the global variables available in the main JS thread aren't available inside of a web worker_. This means that you can't use anything attached to the `window` object.

This also means that you cannot do any DOM manipulation inside of a worker, since the `document` global is unavailable as well.

If you need to access the global worker scope, you can do so using the `self` keyword instead of `window`

### Communicating with a Web Worker

Scripts that initiate a (dedicated) worker communicate with that worker via a clearly defined messaging system. We'll get into this a little more in depth when we build a simple web worker in my next post 🎉.

For a more in depth look _right now_ into messaging between a worker thread and the parent thread see these lovely docs on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers#Sending_messages_to_and_from_a_dedicated_worker).

## Caveats & "Gotchas" of Web Workers

A couple things to note before you go and change all the portions of your applications to use web workers... 😜

1. **Added Complexity**<br />
  Adding a web worker transforms your application into a multithreaded app. This does add some complexity and mental overhead regarding what's happening at any given time in your app. However, because of the strict messagign system that workers need to implement to communicate with the main thread (where all the "unsafe" stuff like DOM manipulation happens), it's actually harder than you'd think to cause concurrency issues while using web workers.
1. **Limited Scope**<br />
  Like we saw before, workers are limited in what they can do. It's not necessarily a bad thing, but it does limit the ways that you are able to use them.
1. **Memory Usage**<br />
  Because web workers span new OS-level threads there is a memory overhead. However, it's up to you as a developer to decide whether the increase in memory usage is worth the performance gains that you would get from using a web worker. In some cases, it's probably not worth it. In others, a life-saver.

## Related Reads

Here's a few links by some people waaaayyyy smarter (and more articulate too!) than I am.

[You Don't Know JS (Kyle Simpson)](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch5.md#web-workers)
[Using Web Workers (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)

## Next Steps

Thanks so much for reading, it really means a ton to me! In my next post I'll go over setting up a simple web worker inside a React component. Stay tuned for more! As always, if you're interested or you have any thoughts feel free to [tweet at me](https://twitter.com/benjamminj) or connect with me on [LinkedIn](https://www.linkedin.com/in/benjamin-d-johnson/)