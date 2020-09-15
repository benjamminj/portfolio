---
title: Service Workers Cheatsheet
description: TBD
draft: true
date: 2019-11-30
# image:
#   url: 'images/battle-board-game-pieces.jpg'
#   alt: A team of four game pieces stand in a row
---

## What even is a service worker?

It was much more difficult than to find a _definition_ for a service worker. There's ton's of tutorials and articles on _how_ to set up a service worker and what they're used for, but at the most fundamental level we want to know _what_ a service worker is.

However, I was able to find a few articles that gave some comprehensive definitions for service workers and how they work (pun intended) under the hood, notably this article from [Chrome developer resources](https://developers.google.com/web/fundamentals/primers/service-workers/)

> "A service worker is a script that your browser runs in the background, separate from a web page, opening the door to features that don't need a web page or user interaction"

Similar to _web workers_, a service worker runs _off the main thread_ of the JavaScript runtime. Since it's not on the main thread, the service worker doesn't have any access to the DOM or any JavaScript running on the main thread—it's only way to communicate with the main thread is via the `postMessage` API

## Rolling your own service worker.

## Workbox

## NextJS

## Resources

- [Service Workies](https://serviceworkies.mastery.games): This is fantastic...it's an in-browser game that walks you through the fundamentals of service workers as well as how to "think in a service worker mindset"
