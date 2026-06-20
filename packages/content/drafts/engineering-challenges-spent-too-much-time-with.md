---
title: Engineering challenges I've spent too much time with
date: 2022-06-02
tags:
  - software-engineering
---

Over the last 10 years of my career there's certain engineering problems that I keep experiencing. Some are very very complex or seem simple on the surface with a giant iceberg of complexity underneath.

I'm not trying to unpack all those problems here. Just going to keep a list of some of the ones I remember, along with a short summary of why that problem is a giant pain. The hope is that I can write some longer form articles about each one and why it's nasty as time goes on.

## Filters

Aka faceted search. Filters seem simple until you peek behind the curtain. Then you see a mess of complexity and tradeoffs. To make matters worse, nearly every app has them in varying levels of quality.

There's too much to go into here, but at a high level:
- State management in the frontend gets tricky, especially if you don't use the URL as the source of truth. Depending on the implementation + API latency, using the URL has its own challenges (avoiding page refreshes, input lag, etc).
- The differences + relationships between "selections", "options", and a "facet/filter" (a group of selections + options) will undoubtedly trip you up at some point.
- Efficiently aggregating results data into options can be a non-trivial database problem once you hit even a moderate scale. It also doesn't matter how many UI bells and whistles you have if the API serving results is slow.
- Showing counts next to options is a standard UX for filters, but you have to decide when to refresh options + counts in response to selections. Every selection refreshes _something_: the challenge is figuring out what refreshes and how to keep the refresh logic sane.
- You also have a number of challenging UX + UI problems: deciding how to display filters, responsiveness (especially if the filters are not in a drawer), virtualization, pagination-vs-infinite-scroll, refetching, caching, URL persistence, etc. Any one of these _individually_ is ~easy, putting them all together is what gets tricky.

When it comes to filters, I have written short novellas about this at the last 3 companies I worked at. I've had the (mis-)fortune to build faceted search like 7-8 times in my career over 4-5 different roles. I'm hoping to write something more long-form here about them in the future to capture a more detailed view of all the problems I've seen.

## Data tables

## Forms

## Server side rendering (SSR)

