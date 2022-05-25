---
title: Infinite scroll and accessibility
date: 2022-02-03
tags:
  - accessibility
  - html
  -
---

## Outline

- if you do infinite scroll, you better do it right for those using assistive tech

  - if a feature only works for a portion of your users, it doesn't really work.

- if you give a mouse a cookie...

  - if you have enough data to require an infinite scroll, you probably should be
    _windowing_ the data.
  - windowing is really hard to do accessibly.

- infinite scrolling + windowing aren't even necessarily a good UX at all.
  - lose your place, oh whale.
  - users maintain a mental model of where things are with pagination.
  - infinite scrolling is good for data that actually is...infinite.

- if accessibility is the goal, infinite scrolling is probably not the best choice.
  - breaks the footer
  - makes it impossible to jump to the "end" of the page
  - harder for screen reader users to quickly find page content (especially content that hasn't been loaded yet!)

