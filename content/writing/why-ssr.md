---
title: Why SSR
description: Server-rendering is more than just SEO and speed
date: 2022-05-01
tags:
  - http
  - software-engineering
  - fundamentals
---

A common claim I've heard in recent years goes like this: "We don't need SEO because our app is B2B...so server-rendering (SSR) is overkill".

However, there's many reasons to consider SSR as a good-enough default for most applications. Many apps are a blend of SSR and client-side fetching, and some apps _aren't_ a good fit for SSR.

That said, many apps (most apps?) gain many benefits from leaning in to the server-rendered paradigm. Here's some additional reasons to adopt server-rendering beyond Lighthouse scores.

## Server-rendering yields a simpler mental model

If you _exclusively_ server-render (no client-side JS), every action follows the same workflow:

1. Request enters your server through a HTTP request.
2. Server processes the request and responds, usually HTML or a redirect.
3. HTML document is sent to the user.

Even though your app now runs in two environments (browser & server), you've simplified the data flow. Now you can focus on interaction and pizazz on the client-side and let the server do the heavy-lifting in regards to data.

Going purely client-side usually introduces some additional workflows (examples are just from the React ecosystem). These aren't exclusive to client-side rendering, but they often accompany a more client-centric model.

- Handling request waterfalls (querying per component, [React Suspense](https://reactjs.org/docs/react-api.html#reactsuspense)).
- Caching API responses in-memory in JS ([Apollo](https://www.apollographql.com/docs/react), [React-Query](https://react-query.tanstack.com/)).
- Updating application state without any data fetching ([Redux](https://redux.js.org/), [React State](https://reactjs.org/docs/state-and-lifecycle.html)).
- Form libraries ([Formik](https://formik.org/docs/overview), [React-Hook-Form](https://react-hook-form.com/get-started), [Final Form](https://final-form.org/docs/final-form/getting-started))

Most apps will be a blend of server-side and client-side patterns, but leaning entirely on client-side approaches may actually make things more complicated.

## Speed is good for everyone.

Fast apps are good on high-speed internet, too. Trust me, your enterprise users will appreciate that _your app_ isn't the one tanking their productivity with slow interactions.

_(Also, with remote working, you can't assume that enterprise users have a high-speed connection anymore)_

While SSR doesn't guarantee speed, it gives you fast defaults, and keeps the door open for future optimization.

## Easier to optimize.

You have no control over your user's device, browser, or internet bandwidth. In contrast, you 100% have the ability to make your server _fast_.

Optimizing client-side apps often boils down to: A) fetch less often, B) optimize asset loading ([PRPL pattern](https://web.dev/apply-instant-loading-with-prpl/)), and C) [don't block the main thread](https://web.dev/mainthread-work-breakdown/). So once you've done all 3 of those you're completely at the mercy of your users' internet connections and device specs.

When your server hsa long response times you have many more options to speed it up. You can optimize the infrastructure (scale vertically/horizontally, multi-region, edge, etc), add caching (CDNs, key-value stores, `Cache-Control` headers) or fix slow code paths (your server or upstream services).

You're able to pick the optimization that makes the most sense at any given time, rather than hitting a wall.

As an added benefit you get some of the client-side optimizations "for free" when you lean in to the server-centric model. Like fetching less via `Cache-Control` headers and keeping the main thread clear (since your server is doing the heavy lifting)

## Server-rendered HTML is probably more accessible.

SSR does not guarantee accessible HTML interfaces. That's up to you, the developer.

However.

HTML forms are _way_ easier to do when you have server-rendering. And if your HTML form works without JavaScript it has a much higher chance of being more accessible than 90% of the JS-only SPA forms out there.

Turns out screen readers are great at reading HTML documents.

## You can have your cake and eat it, too.

SSR might not be able to deliver the 100% polished experience your users expect. You may (probably) want to use a JS framework to build components and structure your UI.

Good news! Most JS frameworks support server-rendering with minimal configuration ([Next.js](https://nextjs.org/), [Remix](https://remix.run/), [SvelteKit](https://kit.svelte.dev/), [NuxtJS](https://nuxtjs.org/), etc).

So you can get all the benefits of server-rendering, while also being able to write client-side JS to power those smooth, snazzy UXs your users have come to expect.

Better yet, running client-side JS becomes an enhancement rather than _required_.

---

## Conclusion

Server-rendering provides a variety of benefits over the fully client-rendered SPAs of today. With modern JS frameworks, you can easily adopt a server-rendered model without having to give up JS on the frontend. Finally, while SSR comes with _some_ complexity, it makes a number of things simpler, namely data fetching, form handling, and optimization.

Have comments or concerns? Loved what you read? I deliberately don't have comments on my blog, so please hit me up on [Twitter](https://twitter.com/benjamminj)!

## Further Reading

- [This thread on Twitter](https://twitter.com/gortok/status/1519361629896552449)
- [Remix docs](https://remix.run/docs/en/v1/pages/philosophy#serverclient-model)
