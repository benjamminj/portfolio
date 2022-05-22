---
title: Coding with empathy
description: It's important to write code with emotional awareness. When we forget that code is also for humans to read, we end up with scary codebases that make the future maintainers of our code sad.
date: 2019-02-07
image:
  url: 'battle-board-game-pieces.jpg'
  alt: A team of four game pieces stand in a row
tags:
  - teamwork
  - software-engineering
---

I'm a big fan of [April Wensel](https://compassionatecoding.com/) and her talks on "compassionate code". I love how she drives home the point that software engineering is fundamentally about working with other humans. Yes, it is incredibly important that we have technical expertise, but we also need to be experts in collaboration.

In order to collaborate effectively we need to be engineers that have a high degree of _emotional intelligence_. And while this certainly means decreasing workplace toxicity, emotional intelligence also extends to the code we write. That's what we'll be exploring in this post—writing code with empathy in mind.

## But how can code be empathetic?

It's a good question to ask. After all, we often think of empathy as something connected to our interactions with other people, and we think of code as the time when we get to be "purely technical".

However, as authors of the code we write, we have an opportunity to practice empathy for our code's future maintainers. When we write code that takes into account how future maintainers will feel reading it, we approach our job differently. All of a sudden it become less about just getting things to work or pushing out feature after feature. Instead we start to care about maintainability, readability, and simplicity.

There's a familiar programming quote from [Code For The Maintainer](http://wiki.c2.com/?CodeForTheMaintainer) that emphasizes this aspect of empathy (along with a little melodrama).

> “Always code as if the person who ends up maintaining your code is a violent psychopath who knows where you live.”

What I love about this quote is that it taps into our survival instinct to remind us that it's important to think of the future people that will maintain the code we write today. Sometimes that future maintainer is yourself, sometimes it's someone you've never met. And while it's rare that the future maintainer is gonna come stalking you with murderous intent, they are still human. It's vital that we write code that makes their job a joy—not a living hell.

## So how do we write empathetic code?

A lot of the software industry loves this idea of code being "clean", first introduced by Robert Martin in his book "[Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)". And while I like a ton of these clean coding principles, I think we miss a lot if we only focus on "best practices" or a list rules to make our code "clean" or "unclean".

Instead, I think it's important for us to frame these software "best practices" through the lens of empathy and how they affect the people that consume our code (perhaps other developers using an internal module's API) or make updates to our code. That way it becomes less of a checklist of things that we "have to do" and more established into the _way that we do things_.

Let's take a quick look at some of these software practices, framed through the lens of empathy:

### Automated Tests

Tests are a great way to provide long-term safety to a module of code. By automatically verifying that the code works, they serve as one of the first line of defense against costly bugs and regressions. When I open up a file for the first time and see that it has some comprehensive test coverage, I feel complete freedom to make whatever changes I need to—without the fear of breaking things! By contrast, opening a file without any tests can be downright terrifying. When we write tests we're not only saving our business [time and money](https://medium.com/javascript-scene/the-outrageous-cost-of-skipping-tdd-code-reviews-57887064c412), we're making sure that the future maintainer of our code can feel safe about modifying it.

### Consistent styling

Having a consistent code style goes a long way towards making life easier for future maintainers. Syntax and formatting issues tend to be low-hanging fruit that can usually be automated with tools like [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) (if you're writing JavaScript, for other languages you might need different tools).

Having a consistent code style is empathetic because it allows your teammates to understand the code faster. Not forcing them to spend extra brain cycles reading through inconsistently formatted code allows them to focus on what actually matters: the problem they are trying to solve.

### Choosing good variable names

There's another quote from "Clean Code" that goes along the lines of "you should name every variable with the same care that you would give to naming your firstborn child".

While the metaphor may be a bit hyperbolic, the point still stands: how you name things matters. By spending that extra (often small) effort up-front to choose a descriptive name, you help your team (and your future self) gain context about the code. In the moment we know extra context about _why_ our code is the way it is, so that's the best time to choose a descriptive variable name to remind future maintainers of that context.

### Adding comments

If you can't fit all of the context inside a variable name, leave a helpful comment along with whatever name you chose!

You might have heard some people say that "code should be self-documenting so comments are unnecessary". While it is true that we should strive to make our _code_ as clear as possible, a well-placed comment can pack a ton of extra context that you wouldn't really be able to fit inside a variable.

I'm a big fan of using comments to explain the _why_ behind the code. We don't really need to comment that a `for` loop iterates through the list, but if it's there to solve a specific edge case it's helpful to know what that edge case is. Adding a comment can be super valuable when some future developer stumbles across that code and is trying to figure out exactly why it's in the codebase. That way they know whether it's safe to delete that code or not.

### Documentation

A great way to measure the empathy of your codebase is to watch what happens when a new team member comes on board. How long does it take for them to get the app running locally? What types of questions are they asking? What types of things are they "doing wrong" in their first few PRs?

If you don't have any new team members coming onboard for a while, put yourself in the shoes of a junior developer starting their first day at your company. What types of things about your codebase would be confusing or unclear?

One of the best ways to fight unclarity is through a good set of documentation. Having clear, well-written docs about getting the app running or performing certain tasks can go a long way towards making a codebase friendly and inviting instead of unclear and daunting.

However, docs also have to be written with empathy in mind! Making sure that documentation is extensive enough to provide clarity while not coming across as belittling is a fine balance. One way that I try to assess the clarity of my docs is to "optimize for copy-paste". Assume that the person reading your documentation is going to copy-paste your examples into their code because they're trying to solve a complicated problem on a time crunch. Thinking about docs in this way forces you to write examples that are fully fleshed out.

### And many more!

This is definitely not an exhaustive list of the ways to make our code empathetic. In fact, any of the "best practices" out there could be looked at through the lens of empathy. Take a couple of the best practices that you're passionate about and think about how they positively impact future maintainers and you'll see what I'm talking about!

## Conclusion

At the end of the day, engineering is about communication—we tell the computer what operations to execute, and we tell our teammates what the code is supposed to do. And while the computer doesn't care about how empathetic our code is, our teammates and future maintainers do. By focusing on empathy in the code we write, we will produce higher quality software as a byproduct.
