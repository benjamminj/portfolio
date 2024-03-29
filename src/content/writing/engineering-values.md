---
title: Engineering values
date: 2020-10-30T22:21:15.099Z
tags:
  - software-engineering
  - philosophy
---

Recently I've been thinking about high-level values as they pertain to software engineering.

You can tell a lot about an engineering team by their **practices**, but that won't tell you the **values** driving those practices. Engineering values serve as a guiding light driving engineering practices. Rather than a list of rules to follow, values give us the "why" behind the things we do.

## A couple caveats

First, this list isn't exhaustive. There's probably things that I forgot. There's probably things that I'll add as time goes on.

Second, this is a living document. I plan on coming back to this periodically as my views and engineering values evolve.

Finally, if you don't do everything here, that doesn't instantly make you a "bad" engineer. Some of these practices are things I'm currently learning and haven't had extensive experience in.

---

## People first

> _Software development is about real people. Code has two primary audiences—the developers coding on top of it (internal) and people using it (external)._

While programming can be artistic and code can be elegant—elegant code is not the end in and of itself. Rather, it's a path to the goal of serving these two audiences.

You serve the internal audience (often future you!) when your code is easy to work with. You serve the external audience when they actually use the things that you create!

### Supported engineering practices

- Documentation
- Code comments (commenting the "why")
- Automatic formatters and linters
- Intuitive APIs (well-thought-out, ergonomic, understandable interfaces)
- Accessibility
- ADRs
- Good variable names
- Developer experience (DX)
- Automation (automate as much as is reasonably possible)
- Simple code over clever code (however, "simple" is often up to interpretation)
- Static type systems (TypeScript, Flow, ReasonML)
- User testing & research
- A/B testing
- Timely refactoring (don't abstract too early)
- Reasonable work hours (no death marches)

## Duplication is better than bad abstractions

> _Undoing a bad abstraction is more difficult than creating an abstraction for some duplication. Wait to write abstract "DRY" code until you know enough about what you need to create a good interface._

This principle is heavily influenced by Sandi Metz's [The Wrong Abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction).

### Supported engineering practices

- Regular refactoring (both at dedicated times and as-you-go)
- Automated tests (especially integration and end-to-end tests)
- Static type systems
- Code comments (commenting the "why")
- "Hot garbage architecture"
- Timely refactoring

## Optimize for flexibility

> _Changing requirements are to be expected, perhaps even the norm. Optimize code to be flexible and pliable so you can iterate on and polish it over time._

### Supported engineering practices

- Composition
- Automated tests
- Static type systems
- Regular refactoring
- Documentation
- Code comments
- ADRs
- Timely refactoring
- Continuous deployment
- Continuous integration
- Feature flags
- Colocation of files (optimizing to delete code)
- "Hot garbage architecture"
- Pragmatic guidelines over dogmatic laws

## Backwards compatability

> _Don't break things. Have confidence that your new code doesn't break your old code._

### Supported engineering practices

- Semantic versioning
- Automated tests
- Feature flags
- Continuous integration
- Code reviews / pull requests
- Preview apps
- Static type systems
- Observability

## Ship early and often

> _Ship to production as quickly as you possibly can without breaking things. Code in production is money code, and that's the code you're motivated to keep healthy._

### Supported engineering practices

- Feature flags
- Trunk-based development
- Automated tests
- Continuous deployment
- Timely performance optimization (measure before you optimize)
- Observability

---

## Additional Resources

No one comes up with engineering values in a vacuum. Over time we pick up ideas from conference talks, blog articles, and coworkers. We try things out and watch them succeed or fail.

In short—we learn.

Here's some conference talks and articles that have been a huge influence on these engineering principles:

- [The Wrong Abstraction](https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction) by Sandi Metz
- [Hot Garbage: Clean Code is Dead](https://www.youtube.com/watch?reload=9&v=-NP_upexPFg) by Michael Chan
- [A Codebase is an Organism](https://meltingasphalt.com/a-codebase-is-an-organism/) by Kevin Simler
- [On the Spectrum of Abstraction](https://www.youtube.com/watch?v=mVVNJKv9esE) by Cheng Lou
- [Figma's Engineering Values](https://www.figma.com/blog/figmas-engineering-values/) by Thomas Wright
