---
title: You Probably Don't Need to Write Your Own React Boilerplate
draft: true
date: 2018-01-27
---

Tell story about Kyle's quote "Friends Don't Let Friends Write Their Own React Boilerplate"

## There's a Lot of Good Boilerplates Out There

You may be looking to write your own boilerplate because you're not familiar with what's out there. For the React ecosystem, I present 3 really great options: [Create-React-App](https://github.com/facebook/create-react-app) (great for smaller projects & learning React!), [NextJS](https://github.com/zeit/next.js/) (server-rendering), & [Gatsby](https://www.gatsbyjs.org/docs/) (static site generator).

All three of these frameworks provide opinionated defaults while allowing developers to extend them with any desired custom functionality. Before you go an write your own config, see if one of these fits what you're looking for (many times it will!).

## Ask Yourself _Why_

Why do you need to build your own boilerplate before you start writing the stuff that's unique to your project?

You may have a favorite CSS preprocessor or linting setup that isn't the supported default of a good boilerplate / framework. However, most of these boilerplates provide the support to get into the bundling & babel setup.

This means that you can customize to your heart's content **and** get all the goodies of spending your precious time writing application-specific code (not spending the first couple days of your project on bundling setup).

I know there's some cases where the amount of custom functionality merits a custom setup, but in my experience many businesses & side-projects are perfectly fine using NextJS, Create-React-App, or GatsbyJS in production.

## If You Write Your Own React Boilerplate, You Alone Are Responsible for its Maintenance

A lot of the well-supported boilerplates / starter frameworks will regularly release updates for those using it. These updates are gonna contain security patches & dependency upgrades.

For example, when React 16 came out NextJS users simply had to install the next version & everything _just worked_. Compare that with a couple apps I know that had custom configs & it was a little more difficult to manage the update.


