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

You may not be able to get 100% of the polished experience your users expect with server-rendering. You may (probably) want to use a JavaScript framework to structure your UI components. You may have parts of your experience that aren't even possible with server-rendering (for example, a photo-editing app or drawing SVG in the browser).

The thing is, you don't have to choose between fully server-rendered and fully client-side fetching. Most front-end frameworks have the ability to render on the server, and still use JavaScript on the client (Next.js, Remix, SvelteKit, Nuxt, etc).

So you can get all the benefits of leaning in to the server-rendered paradigms, while also getting the benefits of structuring your app using the newest FE framework. And better yet, client-side JS becomes an _enhancement_ to make things more user-friendly, rather than a _requirement_ to accomplish critical user flows.

## Server-rendering yields a simpler mental model

If you _exclusively_ server-render (no client-side JS), every action follows the same workflow:

1. Request enters your server through a HTTP request.
2. Server processes the request and responds, either with an HTML document or a redirect.
3. HTML document is sent to the user.

Adding client-side usually introduces some additional workflows (examples are just from the React ecosystem)

- Handling request waterfalls in client-side JS (querying per component, React Suspense).
- Caching API responses in-memory in JS (Apollo, React-Query). 
- Updating application state without any data fetching (Redux, React State).
- Form libraries (Formik, React-Hook-Form, Final Form)

By storing more application state client-side, you end up making things _way_ more complex.
 
---

## Conclusion

## Further Resources

- [This thread on Twitter](https://twitter.com/gortok/status/1519361629896552449?s=20&t=tuxGsWDMvUuaQkX3189Ksw)
- [Remix docs](https://remix.run/docs/en/v1/pages/philosophy#serverclient-model)


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
