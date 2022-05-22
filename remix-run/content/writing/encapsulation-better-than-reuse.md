---
title: Encapsulation > reusability
description: Focus on encapsulation, and you'll get reusability as a byproduct.
date: 2022-01-01
tags:
  - software-engineering
---

Encapsulate well and you'll get reusability for free. But it doesn't go two ways: a highly reusable module isn't necessarily well encapsulated.

One reason encapsulation breeds reuse is due to the nature of _hiding information_. Encapsulation allows us to take complex information and stuff it in the closet. Instead of seeing all the complex mess, we've hidden it behind a simpler interface.

In contrast, a module can remain highly reusable while exposing all its complexity. A [leaky abstraction](https://en.wikipedia.org/wiki/Leaky_abstraction) can be still be widely used. But there's a catch: to use it effectively you need to know how it works internally.

If you want to get more reusable code, focus first on abstraction. Ask yourself, "what complexity does this module hide?" If the answer is "none", get rid of the module entirely. [Code that looks the similar isn't always the same.](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction)

Reuse isn't the goal, it's the byproduct.
