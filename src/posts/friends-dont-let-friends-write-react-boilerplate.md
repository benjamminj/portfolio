---
title: Friends Don't Let Friends Write React Boilerplate
date: 2018-02-13
image:
  url: 'img/pies.jpg'
  alt: Three pies on a table
---

Have you ever made a pie? If you have, I'm sure you know the amount of detail & precision that goes into that perfect "from-scratch" recipe. Wait a couple minutes too long, and the crust burns. Use too much butter and your pie doesn't have the right texture. Making a creme pie? If you get the measurements wrong your pie could end up as soup (been there, done that. At least it was a tasty mistake).

Makes you wonder why we say "easy as pie", right?

One of the biggest complaints from people about the current JavaScript ecosystem is the state of the tooling. Starting a React project could require 1-3 **days** of setup to get everything working correctly. You've got transpilers, module bundlers, linters, formatters, test runners, etc. Juggling all of these can feel very much like baking a pie &mdash; make one mistake, and you're knee-deep in webpack internals trying to figure out why you can't even get "Hello World" to show up. In many ways it can feel just like baking a pie.

Most of the front-end frameworks have CLIs or boilerplates to alleviate this pain, but conventional wisdom would have you think that writing your own webpack config will result in higher productivity down the road (because after all, you know how it works so you can customize as much as you want). I still see people posting/talking about how good it is to create your own boilerplate.

Most of the time, you don't need a custom boilerplate. Here's why.

## A Couple Disclaimers 🙃

Software engineering is _filled_ with tradeoffs, and the time spent working on tooling is no exception. There may be some cases where spending a bunch of time setting up your project actually does help in the long term. Before we get into details, I wanted to make these two disclaimers, lest anyone draw the wrong conclusions.

- **Learning tooling isn't a waste of time.** But it can be a large barrier to learning something new / delivering faster. There's a lot of tiny choices that you will spend energy on if you spend a lot of time configuring your build chain, and each one of those choices wear you down a little. The good news is that webpack & the other build tools have _amazing docs_ (for the most part), so when you do need to update something, you can usually figure it out on a case-by-case basis.
- **You might need custom functionality, and that's ok.** I understand that some use cases merit a custom configuration built-from-scratch. But I would also argue that in many cases (especially side projects) these are the exception and not the rule. In addition, you can often build your custom functionality on top of an off-the-shelf solution.

Ok. Now that we've got that out of the way, let's get into the why.

## There's a Lot of Good "Boilerplate Frameworks" Out There

For lots of apps, you can piggy-back off of the myriad of boilerplate & bootstrapping frameworks out there. In the React ecosystem, here's 3 of the most popular.

1. [Create-React-App](https://github.com/facebook/create-react-app) (great for smaller projects & learning React! Also lets you "eject" & customize however you want)
2. [NextJS](https://github.com/zeit/next.js/) (server-rendering framework with a rich plugin ecosystem)
3. [Gatsby](https://www.gatsbyjs.org/docs/) (static site generator built on React & GraphQL. Also has a lovely plugin ecosystem).

I use the term "boilerplate frameworks" to describe these type of frameworks/bootstrapping packages since they're not _boilerplates_ in the strictest since of the term. In a boilerplate, you'd typically have access to all of the generated/prepopulated code. However, they allow you to quickly bootstrap an app, fulfilling the initial purpose a boilerplate is meant to serve.

All three of these "boilerplate frameworks" provide opinionated defaults while allowing options for developers to extend functionality. Before you go and spend a bunch of time writing your own config, see if one of these fits what you're looking for (many times it will!). And if you need something one of these doesn't provide, see if there's a plugin (in the case of Gatsby / NextJS, Create-React-App doesn't have plugin functionality). Building on top of one of these solutions or using a plugin with save you **hours** of setup time, meaning you can get your code out to users faster.

## Remember That If You Write Your Own Config, You Will Have to Maintain It.

A lot of these boilerplate frameworks will regularly release updates with security & dependency updates. If your app is built on top of it, you'll get these for free (and fairly painlessly).

Writing your own configuration is a two-edged sword &mdash; you get to update it _any time you want_. You don't have to wait on open source contributions or for the next release. You can change things _today_.

However, when your build pipeline is breaking, you alone have to fix it. When one of your dependencies needs to be updated & that update breaks your build system, you have to dig into the config & _debug your tools_.

Just remember that any time spent debugging your tools is time that you could have spent writing the code that makes your application unique.

## Last Thoughts

A big thanks to [Kyle Holmberg](https://medium.com/@kylemh) for the phrase "Friends Don't Let Friends Write React Boilerplate". He's a super cool developer, also doing frontend web engineering at [AutoGravity](https://www.autogravity.com). Check out his articles, they're super great. 👌🏻

At the end of the day, writing software should be focused on the end users. If that extra time spent on your own config allows you to make things that benefit them, go for it. But if the core of your app could be done on top of a "boilerplate framework", save yourself some time & effort &mdash; focus on delivering an awesome user experience.
