---
title: Arrange, Act, Assert
date: 2020-10-17T19:29:32.251Z
tags:
  - testing
---

One pattern I find helpful for writing automated tests is "Arrange, Act, Assert". Using this pattern, we can break up every test into three parts.

## 1. Arrange

First, you set up anything in the test environment that your code needs.

Some examples of this include creating mock functions, seeding a database with test data, resetting the date/time, and creating global variables.

The goal during this step is to create a controlled, predictable environment for your test to run in.

> _**This phase is optional.** Some tests don't require you to set up the test environment and that's totally fine._

## 2. Act

This is where we actually run the code we want to test.

If you're writing tests for a React component, render the component. If you're writing tests for a function, call the function and pass in some arguments.

## 3. Assert

Finally, the "Assert" step is where you check your code. You'll make sure that whatever you ran in the "Act" step did what it should have done.

If you're using Jest or Chai this would be where you call `expect` with something like `toEqual`.

Most assertions follow the format of `expect(result).toEqual(expectedOutput)` (This is Jest's syntax).

> _Some people will tell you that you should only have 1 assertion per test. I don't agree with this, I think it's a little dogmatic and restraining. The number of assertions that you need may vary from test to test._

## Conclusion

I've found this pattern extremely helpful when writing my own tests and when teaching software testing. I think the "AAA" initials make it easier to remember and breaking out the tests into 3 separate phases makes it easy to focus on one thing at a time.

As you write more and more tests throughout your career, you might find that you're thinking less about which step of the test you're in. You might find yourself cycling between all three multiple times on a single test. That's ok! This approach isn't dogma or "The One True Way", it's just a helpful way to think about the parts of an automated test.
