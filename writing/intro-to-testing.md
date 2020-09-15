---
title: The "why" of software testing
description: TBD
draft: true
date: 2019-04-27
# image:
#   url: 'images/battle-board-game-pieces.jpg'
#   alt: A team of four game pieces stand in a row
---

## What even is testing?

It's really easy to get bogged down by all of the noise in the testing community. Inside the JavaScript scene alone there's tons of testing libraries and even more voices claiming their version as "the right way" to test software.

I think it's also fair to have questions about testing—I know I certainly have over the course of my time as a software engineer. "Isn't software testing what QA's job?" "No, you've got to hit 100% (or \_\_%) test coverage or else you're not testing enough" "Should I write a unit test or an integration test?" "Are these tests really worth my time?".

Before we dive into some of the answers to these questions, I think it's valuable to start with an extremely broad definition of software testing. If we define testing too narrowly we end up missing big pieces of the bigger picture. Here's how I like to define software testing:

> Software testing is making sure that the software you wrote works the way it's supposed to.

Notice there's nothing about QA or testing frameworks or unit/integration/end-to-end tests in this definition. Nothing about test coverage or test runners or mocks or spies. All those things are fantastic, but at the core testing is just about _making sure that the software we write isn't broken_. Whether it's a sophisticated automation setup or a person clicking through your app—or anything in-between—testing makes sure that your app works as intended.

Another thing to note is _why_ testing our software is so valuable—software bugs cost time and money to fix, and testing helps prevent bugs from happening. Imagine you're at a large eCommerce site and you write some code that breaks your checkout cart. Chances are if you release that code to real users your business is going to lose a _lot_ of money when user try to buy something and finds that they're unable to.

However, if you can catch that bug _before_ it goes out to your users you can save your company a great deal of time and money. Either you discover the software bugs inside your company, or your production users are going to discover them while using your app. We don't want to ship broken code to production!

## Manual testing 👨‍💻

Many times when people talk about testing _manual testing_ is what first comes to mind. Manual testing is when an _actual person_ goes through and verifies that a portion of software is working as intended. This could be a QA person verifying that what a developer wrote is correct, a developer testing their own code to make sure what they wrote worked, or _real production users clicking through your app_.

Typically manual testing follows this process: you have a state in your app that you want to verify (I'm gonna call this a _test scenario_), and some steps required to get your app to that test scenario. You take those steps, get your app to the test scenario, and then check to make sure the application is / isn't working. Rinse and repeat.

For example, let's say you had an app with a login page, and let's say our "test scenario" is that we want to make sure we can log in. So you visit your app's login page, manually type in your username. Then you type in your password and submit the form. Hopefully your app logs you in correctly and you

We're not gonna spend too much time on manual testing since it tends to be fairly intuitive. However, it is worth noting that _manually testing your application is the closest simulation of a real user_. This makes manual tests extremely valuable to discovering new bugs, reproducing existing bugs, and verifying that key flows work on _real devices_.

That being said, there's a couple areas where manual testing falls short of _every_ testing desire.

### Testing something manually takes time.

Humans can't move at lightspeed, so it takes us time to click from one page to the next, find the correct button, and reproduce our test scenarios. While this isn't a problem with a small application, as our application grows in size and complexity manually testing all possible scenarios goes from taking minutes to taking days.

As a real-world example, I once worked at a company where a product manager asked the QA lead how long it would take to do full regression testing (only testing existing features weren't broken, no new features) on their iOS app (done with React Native). He replied that his best guess was that it would take 2-3 _full-time QA testers 3 weeks_ to cover all of the test scenarios that they would need to validate (they had only manual tests). And that was just to make sure nothing was broken!

### Humans make mistakes

It's no secret that humans aren't perfect. We have bad days, we get tired, we read the directions incorrectly. However, predictably reproducing a test scenario over and over requires that you be extremely thourough. Did you click the button in the _exact same place_ as last time? Did you move through the app at the same pace? Are you sure you didn't skip a step?

It's really easy to make mistakes when we're manually testing. However, when testing software we often have _very specific steps_ to reproduce a test scenario and make sure that that portion of our code is working. Carefully stepping through these "steps to reproduce" can quickly become tedious and wear down our mental energy—especially if you're working on a big app that takes days/weeks to manually test. And when we're tired we tend to make even more mistakes.

Mistakes in manual testing either end up with the tester having to go re-test (thus taking up even _more_ time) or bugs shipping to production. Either way, not ideal.

## Automated testing 🤖

However, we don't have to resort to always manually testing our applications. Turns out, computers are really great at executing repetitive tasks quickly and accurately. This means that they can be perfect tools for testing our software to make sure that it works.

In _automated testing_, we write a _new software program_ to do the work of making sure that our original software works correctly.

For example, let's take our test scenario from before: making sure we can log in to an app via its login page. In an automated test we
