---
title: Friends Don't Let Friends Write React Boilerplate
draft: true
date: 2018-02-05
---

![pies](https://res.cloudinary.com/da2iq7dge/image/upload/v1518072886/pies_rouehe.jpg)

Setting up a React project in many ways is like making a pie or cake. Have you every made a pie (like from scratch. Buying one doesn't count)? My wife and I love baking pies...but I won't deny that it requires a lot of work, precision, & a good sense of timing. 

Wait too long, and the crust burns. Use too much butter and your pie doesn't have the right texture. Making a creme pie? If you get the measurements wrong your pie could end up as soup in a crust (been there, done that. At least it was a tasty mistake).

Makes you wonder why we say "easy as pie", right?

One of the biggest complaints from people about the current JavaScript ecosystem is the state of the tooling. Starting a React project could require 1-3 **days** of setup to get everything working correctly. You've got transpilers, module bundlers, linters, formatters, test runners, etc. Juggling all of these can feel very much like baking a pie &mdash; make one mistake, and you're knee-deep in webpack internals trying to figure out why you can't even get "Hello World" to show up.

Most of the front-end frameworks have CLIs or boilerplates to alleviate this pain, but conventional wisdom would have you think that writing your own webpack config will result in higher productivity down the road (because after all, you know how it works so you can customize as much as you want). I still see people posting/talking about how good it is to create your own boilerplate.

Most of the time, you don't need a custom boilerplate. Here's why.

## There's a Lot of Good "Boilerplate Frameworks" Out There

You may be looking to write your own boilerplate because you're not familiar with what's out there. For the React ecosystem, I present 3 really great options: [Create-React-App](https://github.com/facebook/create-react-app) (great for smaller projects & learning React!), [NextJS](https://github.com/zeit/next.js/) (server-rendering), & [Gatsby](https://www.gatsbyjs.org/docs/) (static site generator).

I use the term "boilerplate frameworks" to describe these type of packages/frameworks since they're not boilerplates in the strictest since of the term. In a boilerplate, you'd typically have access to all of the generated/prepopulated code. However, they allow you to quickly bootstrap an app, fulfilling the general purpose of using a boilerplate.

All three of these "boilerplate frameworks" provide opinionated defaults while allowing developers to extend them with any desired custom functionality. Before you go and write your own config, see if one of these fits what you're looking for (many times it will!) or if there's a plugin to add that custom functionality.

## Ask Yourself _Why_ You Need a Custom Setup

Why do you need to build your own boilerplate before you start writing the stuff that's unique to your project?

You may have a favorite CSS preprocessor or linting setup that isn't the supported default of a good boilerplate / framework. However, is there a way to edit the configuration with a plugin for your custom framework?

If there is, that means that you can customize to your heart's content **and** get all the goodies of spending your precious time writing application-specific code (not spending the first couple days of your project on setup just to get "Hello World").

I know there's some cases where the amount of custom functionality merits a custom setup, but in my experience many businesses & side-projects are perfectly fine using NextJS, Create-React-App, or GatsbyJS in their production apps.

## Remember That If You Write Your Own Config, You Will Have to Maintain It.

A lot of these boilerplate frameworks will regularly release updates with security & dependency updates. If your app is built on top of it, you'll get these for free (and fairly painlessly).

Writing your own configuration is a two-edged sword &mdash; you get to update it _any time you want_. You don't have to wait on open source contributions or for the next release. You can change things _today_. 

However, when your build pipeline is breaking, you alone have to fix it. When one of your dependencies needs to be updated & that update breaks your build system, you have to dig into the config & _debug your tools_.

Just remember that any time spent debugging your tools is time that you could have spent writing the code that makes your application unique. 

## A Couple Disclaimers 🙃

Software engineering is usually filled with tradeoffs, and the time spent working on tooling is no exception. There may be some cases where spending a bunch of time setting up your project actually does help in the long term. I wanted to make these two disclaimers, lest anyone draw the wrong conclusions.

- **Learning tooling isn't a waste of time.** But it can be a large barrier to learning something new / delivering faster. There's a lot of tiny choices that you will spend energy on if you spend a lot of time configuring your build chain, and each one of those choices wear you down a little. The good news is that webpack & the other build tools have _amazing docs_ (for the most part), so when you do need to update something, you can usually figure it out on a case-by-case basis.
- **You might need custom functionality, and that's ok.** I understand that some use cases merit a custom configuration built-from-scratch. But I would also argue that in many cases (especially side projects) these are the exception and not the rule. In addition, you can often build your custom functionality on top of an off-the-shelf solution.


## Last Thoughts

A big thanks to [Kyle Holmberg](https://medium.com/@kylemh) for the phrase "Friends Don't Let Friends Write React Boilerplate". He's a super cool dev, also doing frontend web engineering at [AutoGravity](https://www.autogravity.com). Check out his articles, they're super cool too. 👌🏻

At the end of the day, writing software should be focused on the end users. If that extra time spent on your own config allows you to make things that benefit them, go for it. But if the core of your app could be done on top of a "boilerplate framework", save yourself some time & effort &mdash; focus on delivering an awesome user experience.
