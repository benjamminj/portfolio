---
title: Server-rendering your frontend app isn't "too complex"
description: In fact, it might result in a simpler app overall.
tags:
  - http
  - software-engineering
---

A common pushback I hear regarding server-rendering is that "we don't need the added complexity because {insert reason here}". And while I applaud the goal of reducing complexity, I'm not sure taking SSR off the table actually reduces complexity.

In fact, your 100% client-rendered application might be _more_ complex than if you had server-rendered it. Here's why:

## SSR isn't hard to set up

These days most frontend frameworks will support some form of SSR with minimal config. In the React world alone you've got a few great options to pick from:

- Remix
- Next.js
- Blitz.js
- Redwood.js
- ...and many more ✨

## Some things are inherently easier on the server

At a former job I remember one team having to do some significant rework to make user personalization happen on their client-rendered React app. This would have been much easier had they defaulted to a server-rendered model.

Another example of something that's easier on the server is caching. On the server, you can easily cache requests in a data store like Redis or Memcached with minimal configuration. You can also send `Cache-Control` headers with your responses to help browsers cache data.

In client-rendered React apps, it's usually an in-memory store (read: more JS running) caching API requests for the duration of the session. While this may _seem_ simple, it's a massive headache and a huge surface area for bugs.

## Data flow is more direct on the server

On the server you have a controlled environment where the "lifetime" of a request can be visualized in a fairly linear fashion:

1. Data enters your server via the URL (route + params)
2. Relevant data is fetched (or mutated) from the database or underlying microservices.
3. HTML is rendered and sent to the browser
4. Finally, JS sprinkles extra interactivity and pizzazz.

The client is more flakey. You're bound to the whims of the user's network. Not to mention that now you have to think about concurrent API requests, race conditions, state management, and caching _in your frontend code_.

You'll find that if you keep your client "thinner" (less state and more syncing to the server) data flow just becomes waaaaay easier to understand.

## It's easier to squeeze perf out of your servers than your client

Got a page that's rendering slowly in a server-rendered app?

- Slow DB query (cache + optimize the query)
- Slow microservice (cache + fix the service)
- High memory load (scale horizontally / bump RAM while you work on lowering memory load)

In short, you have the _agency_ to fix the cause behind the slowness quickly.

You have no control over your users' devices — a fully client-rendered app could be slow for a myriad of reasons you don't control.

- Internet speed (nothing you can do!)
- Cheap device (low RAM) (nothing you can do!)
- Request waterfalls (["spinnageddon"](https://twitter.com/ryanflorence/status/1186519682272022528))
- Too much JS running (have to limit dependencies and do profiling work)
