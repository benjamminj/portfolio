---
title: "Coding with empathy"
subtitle: TK
date: 2019-01-10
draft: true
---

I'm a big fan of [April Wensel](TK link) and her talks on "compassionate code". If you're not familiar with the idea of compassionate coding I'd highly encourage you to check out her talks&mdash;I promise that they will not be a waste of your time!

However, for the purposes of this post compassionate coding can be summed up and framed with the following idea: software engineering is fundamentally about working with other humans. And in order to work with other humans we need to be engineers that have a high degree of _emotional intelligence_.

While this certainly means decreasing the interpersonal toxicity that is often associated with engineering culture, this also means thinking about the empathy that lies beneath the code we write. That's what we'll be exploring in this post——writing code with empathy in mind.

## But how can code be empathetic?

It's a good question to ask. After all, empathy is primarily a human trait, ascribing it as a quality of the code we write feels a little bit silly.

However, if we go with the definition that empathy is the ability to anticipate and share the feeliings of another (to "put yourself in their shoes", as it were), we can definitely identify code that does&mdash;or fails to&mdash;exhibit empathy.

Often we notice code that _lacks empathy_ more than code that is empathetic. You open up a project only to discover thousands of inconsistencies in the way files are formatted, 0% test automation coverage, and an over-abundance of variables named `a`, `q`, and `foo`. Perhaps it's overly abstract and you have to dive through twenty files just to change a button color.

If this code was written by one of your teammates (or yourself in the past) you might feel a little bit of dread knowing that for your next feature or bug fix you will be swimming blindly through this sea of spaghetti code. You know that it's probably going to take forever to get a good idea of how this code works, and you're afraid of changing things because the likelihood of breaking something is extremely high.

Code like this is the exact opposite of empathy: instead of making its maintainers feel safe and confident, it tears them down and destroys morale.

Compare this with code that has been lovingly tended to and well-thought out. Such code can have the potential to enable its maintainers to push boundaries and focus on the stuff that matters: shipping quality stuff to users.

I've seen this effect firsthand——in my few years working as a front-end engineer I've seen a number of nightmare codebases. I've also been fortunate enough to work on _one_ codebase that was lovingly tended to. 

In the messy codebases developers did their job with fear: they simply patched bugs, piled features onto an unstable foundation. You could feel this sense of helplessness when talking about the codebase as a whole (even if some parts of the codebase were rather clean). 

In the clean codebase I saw my team's productivity and morale go through the roof. People felt safety when they needed to go patch a bug or refactor some module to fit new requirements.

## How can we write empathetic code?

However, it's not enough to simply acknowledge that working in a codebase that has been actively tended to is psychologically beneficial. The real question we have to ask ourselves is _how do we make codebases that treat their maintainers with respect?_

We can go through a big laundry list of software "best practices" and tie each one back to empathy, but the most important thing when writing empathetic code is that we as developers _actually have empathy for our users and for our teammates_. If we don't start there any software practices that promote empathy will just feel like another thing on the list of things to do before we push things to production.

Let's take a quick look at some of these software practices, framed through the lens of empathy:

### Automated Tests

Adding tests to prevent regressions and costly bugs from creeping into the codebase can prove to be a major source of empathy for your team members. I know for myself that diving into a complex module of code _without tests_ can be downright terrifying. It's hard to know what you can change without breaking things. When we write tests we're not only saving the business time and money, we're actively taking care of the psychological safety of our teammates. 

### Linting & formatting

Linting and formatting are two of the "low-hanging fruit" as far as code sanity goes. With very little effort it's possible to guarantee that your entire codebase looks and feels (somewhat) consistent. While they won't protect you from a bad architecture or sloppy business logic, automating the stylistic decisions in your codebase frees people to not  waste brain cycles trying to remember whether they should include a semicolon or not. We can show empathy and give our fellow developers the ability to use their brainpower solving bigger problems.

### Choosing good variable names

Choosing good variable names is a struggle you'll face every time you sit down to write a bit of code. One large reason that choosing the perfect variable name is so difficult is that in order to do so we must understand exactly how to communicate to future readers of the code (our team or ourselves) _what_ we were thinking at the moment we authored the code. There's a quote from "Clean Code" by Robert Martin that goes along the lines of "you should name every variable with the same care that you would give to naming your firstborn child".

While the metaphor may be a touch hyperbolic, the point stands: naming things matters. By spending the extra (often small) effort up-front to choose descriptive names, we are helping our team (and ourselves) gain context about what the code they are reading is supposed to do.

### Documentation

One of the best measures of empathy for a codebase is the level of effort that it takes a new team member to get up and running. And crucial to getting up and running quickly is a solid set of documentation.

However, not all projects require equal levels of documentation. If you work on a framework or library you might need to maintain extensive docs and tutorials, whereas if you work on a product team you might be able to get away with less extensive docs. The amount of documentation will vary by the project, but in every case it's helpful to assume that the people reading your docs are just getting started with this codebase (regardless of experience levels).

Another helpful tip I've come across for writing empathetic documentation is to optimize docs for copy-paste. Essentially, assume that the person reading your docs is going to copy-paste the examples into their codebase. This tends to help readers of documentation get up to speed faster, in addition to helping me think through what a thouroughly fleshed-out example looks like.

### And many more!

This is definitely not an exhaustive list of the ways we can make our code empathetic. In fact, I'd argue that a lot of the "clean coding" tips and software "best practices" out there could be looked at through the lens of developer empathy. Whether it's adding continuous integration, A/B testing to see what our users connect with, or even peer review&mdash;writing software is about communicating, and communicating effectively requires a great deal of empathy.
