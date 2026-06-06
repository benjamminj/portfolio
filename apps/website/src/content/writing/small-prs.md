---
title: How to create small PRs
subtitle: Make your team's life easier by keeping diffs small.
date: 2021-09-15
tags:
  - teamwork
  - pull-requests
  - software-engineering
---

When you work in teams, you'll spend lots of time reviewing code. And at some point you'll get assigned a PR that's 1,000+ lines long.

Guess what? That PR is gonna take a long time to review unless you just slap a "LGTM" comment and YOLO-approve it.

In contrast, small PRs result in higher-quality reviews and faster turnaround time.

But how do you go from sending your teammates behemoth PRs to creating small, independently mergable diffs? Here's a few techniques to take those mega PRs and make them easier to review.

## Split large features into multiple PRs

The common reason behind large PRs is putting _**everything**_ for a new feature in a single PR. Sometimes it's 2-3 days' work, other times it could be _**weeks**_ of work. 😱

Instead of working on the entire feature and _then_ opening a massive PR, try splitting the feature into multiple chunks that can each be merged separately.

For example, do the backend in one PR and the frontend in another, or add the UI with mock data and do a second PR to wire up the API. Or do refactoring in a PR before you add the new behavior.

You might even be able work in parallel with someone else on your team depending on how you split the tasks!

Is splitting a complex feature up into multiple PRs a lot of extra work? 100%. But it makes life _way_ easier on your reviewers, which is well worth it.

## Feature. Flags.

If you're doing continuous deployment, splitting a big feature into small PRs poses a new problem—how do you safely merge work that's half-baked?

Enter [feature flagging](https://martinfowler.com/articles/feature-toggles.html).

Feature flagging allows you to keep merging code and deploying it to production without actually showing it to users. Then, once you're confident the feature is ready you can flip the flag on and send it to real users!

This pairs nicely with small PRs since you don't need to wait for a feature to be "done" before you merge it in.

## Watch the size of your diff, and look for stopping places

When I'm working on a big feature, I'll do my work normally, but I'll also periodically check to see the size of my diff. If that diff starts getting large (for me that's ~400 lines) I'll start looking for a good way to open a PR for my in-progress work.

It's better to start looking for a stopping place early than it is to push up your work only to realize your PR is 1,200 lines long.

---

## Conclusion

Learn how to create small PRs and you'll notice they get reviewed a lot faster. While it's not an easy skill to develop, it's certainly a valuable one, especially when you're working in a team. After all, the main point of PRs is _**communication**_, not gatekeeping!

## Extra resources

- [Small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html) by Google engineering. _(CL is short for **change list**, which to my understanding is the same as a pull request)_.
