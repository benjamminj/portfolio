---
title: Testing Animations in React Native
date: 2018-02-02
draft: true
---

<!-- 
SEO keywords
Jest error react native
react native animations jest
testing react native animations
 -->

<!-- 
Talk about the problem — testing `Animated.View` isn't exactly easy. When using `jest.useFakeTimers` I got some crazy error messages. 

Make sure to include the error message for SEO purposes
-->
<!--  
Why we can't just mock `Animated`.

Because "mocking is a code smell"
Basically, if you're spending a ton of effort to mock some module (i.e. it's in extensive usage throughout your component), you should ask yourself if it would be better to test the integration with that third-party code.

Sometimes you will need to mock third-party code, but `Animated` is a pretty complex module and mocking it sounds like a lot of effort. Plus
-->

<!--
- What I tried — just mocking the time with `jest.useFakeTimers`. Unfortunately this doesn't work. But you need to mock time in some way or jest is definitely not happy about how the Animation runs if you don't
- You could mock `Animated.View`, but mocking the `Animated` module is a pretty intensive task and the more mocking that we do, the less security we have that our code actually works with the real module.
- Include thee link to the stackoverflow post, that will give credit where credit is due
- Include the jest error text itself, this will be helpful on the SEO front
-->
