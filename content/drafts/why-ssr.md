---
title: Why SSR is more than just SEO
tags:
  - http
  - software-engineering
---

- background
  - I've often heard the following take when it comes to the question of "why should we (or shouldn't we) do SSR?"
    - "We don't need SSR, this app isn't crawled so we don't need SEO"
    - another variation: "We don't need SSR, since this app is internal we don't need super-speed"

- the big picture
  - SSR is not a silver bullet, but it's a good default regardless of SEO

- unpacking it more
  - speed is good for everyone
  - SEO is good for everyone, even if you're not crawled by google
    - Slack / MS Teams / etc previews
    - It's not a guarantee, but the HTML needed for good SEO tends to help with accessibility
  - SSR leads a more understandable client-server model
  - SSR is not super duper expensive anymore, so that's not an excuse.
    - You don't need to run a server anymore, you can do server-rendering in a lambda function pretty easily these days.
    - Most big "meta-frameworks" support some version of lambda-based deployments.
    - Most places are already running a server even for their client-side rendered applications (Express server on EC2 serving the static files)
