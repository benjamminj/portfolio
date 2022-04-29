---
title: Why SSR is more than just SEO
date: 2022-04-29
tags:
  - http
  - software-engineering
---

- background
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

- resources
  - twitter thread by george stocker
  - remix docs??

