---
title: Why SSR
description: Server-rendering is more than just SEO and speed
date: 2022-04-29
tags:
  - http
  - software-engineering
---

<!-- TODO: intro -->
## Speed is good for everyone.

Speed is good for everyone, not just users on low-bandwidth connections. It's wild to me that a common refrain is "our app is B2B, so server-rendering is not helpful because our users are on good internet connections".

Or put a different way: "Our users pay a lot of money for our app, so we don't need to worry about how fast it is".

Speed is an asset. While it may not be the _most important thing_ to your users, it can set you apart from your competitors. You don't wanna be the app that kills your users' productivity daily.

And while SSR doesn't guarantee speed, it gives you performant defaults and keeps the door open on future optimizations.

## Server-rendered HTML is probably more accessible.

SSR does guarantee that you create accessible HTML interfaces. That's up to you, the developer.

However.

Things like HTML forms and cookie-based authentication are _way_ easier to do when you have server-rendering.

Screen readers are great at reading HTML documents. So if you're able to get 90% of your app to _work_ without JavaScript, chances are you'll get more accessibility "for free".

## Easier optimization paths

You have no control over your user's device, browser, or internet bandwidth. In contrast, the server is a controlled environment.

Optimizing the app on the client-side usually consists of avoiding HTTP requests by caching data, optimizing asset loading, and keeping the main JS thread clear. So if your user's device is an underpowered Android phone and they're on a spotty connection, there's nothing you can do to optimize that.

However, if your server is taking a long time to respond you've got a lot of options. You can optimize the infrastructure (scale vertically/horizontally), add caching (CDNs, key-value stores, `Cache-Control` headers) or fix slow code paths (your server or upstream services). 

You're able to pick the optimization that makes the most sense at any given time, rather than hitting a wall.

## You can have your cake and eat it, too.

Web apps have come a long way in the last 10-20 years, and users expect web apps to have polished experiences. In order to make apps feel fancy you'll probably need _some_ client-side JavaScript.

<!-- - **Increase RAM.** Yes, this _is_ throwing money at the problem, but sometimes that's the fastest solution, especially if you experience a spike in traffic
- **Scale horizontally.** If you've got a load balancer you can have multiple servers serving HTML responses.
- **Locate the server closer to the user.** Especially today, you can server-render at "the edge" with Cloudflare, AWS, Netlify, Fly, etc. 
- **Optimize upstream services.** Sometimes an upstream service is the culprit behind slow responses, and it's more cost-effective to spend time fixing the underlying service.
- **Add a cache (like Redis).** 
- Send Cache-Control headers (technically this is a client-side optimization, but still initiated by the server).
- Put your server behind a CDN
- **Refactor slow code paths.** Sometimes the problem is _your_ code, so you've gotta make it more performant.
- etc
 -->
 
 
<!-- - background
  - I've often heard the following take when it comes to the question of "why should we (or shouldn't we) do SSR?"
    - "We don't need SSR, this app isn't crawled so we don't need SEO"
    - another variation: "We don't need SSR, since this app is internal we don't need super-speed"

- the big picture
  - there's a lot more to server-rendering than SEO and speed

- a few reasons
  - simpler client-server model
    - "leans in" to the way the web works
      - URLs, cookies, etc.
  - speed is good for everyone
  - server-rendering HTML is an accessible default
    - progressive enhancement (esp with forms, auth, etc)
  - easier to optimize
    - cache-control headers, CDNs, etc
    - server-side caching (redis, memcache, etc)
    - optimize upstream bottlenecks
  - you can have your cake and eat it, too
    - fast server responses
    - optimistic updates

- resources
  - twitter thread by george stocker
  - remix docs??

 -->
