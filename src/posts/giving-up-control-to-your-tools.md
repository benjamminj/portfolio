---
title: Tools like Prettier ask us to give up control
description: There's nothing wrong about caring about code formatting! Using a formatter requires that we give up fine-grained control and let our tools do the heavy lifting.
draft: false
date: 2019-03-01
image:
  url: 'img/plane-controls.jpg'
  alt: Flight commander tweaks airplane controls
  by: https://unsplash.com/@byronsterk
  source: https://unsplash.com
---

Perhaps you've heard of a tool called [Prettier](https://prettier.io/). If you haven't, Prettier is a code formatter for a variety of languages—JavaScript, TypeScript, CSS, Markdown, GraphQL, and many other languages. It's an amazing tool and I've been a huge fan of having it as a part of my workflow for the past few years.

Working on a project with a formatter installed can be an absolute joy. You simply write code, hit save, and voila! Everything snaps into place and your code is beautifully and consistently formatted across the entire project.

And yet, I've seen a decent amount of pushback when introducing Prettier to a team. I've done this a few times over the past few years, and adoption often been initially met with reluctance. Then, after we start using it Prettier becomes one of the team's favorite tools.

I think one of the main reasons that tools like Prettier receive pushback is simply because it—not developers—formats the code. It remains opinionated by not providing a ton of configuration options. So the code might be formatted in a way that _you_ initially "dislike". Even though the code works 100% the same as it did pre-formatting, it's not the way _you_ "would have formatted it". Perhaps it's the way it breaks lines or handles ternary expressions or you didn't like it adding/removing semicolons.

Prettier doesn't hide the fact that it's opinionated about formatting code. It's chosen description is "An opinionated code formatter". Opinionated tools always comes with an ask. They say, "Leave the formatting to me—don't worry, I've got this."

When we adopt opinionated tools like Prettier we do lose something—fine-grained control over how our code looks. But what we gain in return can make the loss 100% worth it.

When we give control of formatting over to our tools we can eliminate formatting from our mental checklist. I didn't realize how much time and effort I spent deciding whether a function should be broken into a single line vs. multiple lines, trying to hunt down missing semicolons, or other miscellaneous formatting decisions. I sincerely wanted to do the "cleanest" formatting for my code but I'd go back and forth on what formats I liked. Although each of these amount to small decisions, they add up over the course of a day. If we can cut out an entire _category_ of decisions from our workflow, we save more decision-making power for stuff that can't be automated, like variable names, creating good interfaces, and future maintainability.

When we give control of formatting over to our tools we also eliminate an entire class of pull request (PR) comments. Seeing a PR with 50 comments of "semicolon here" or "please break into multiple lines" isn't enjoyable for the reviewer _or_ the author). We can set the PR author up for success if we simply add a formatter to our project workflow—whatever the formatter does is the "right way" for the project. This scopes the conversation about formatting to a single decision—choosing which formatter to add and how to configure it. Instead of spending precious time and energy fighting over style, PR reviewers can focus on the maintainability of the new code and how it fits within the larger ecosystem of the codebase.

When we give control of formatting over to our tools we make our project more welcoming to newcomers. Whether it's someone who's just started learning how to code or a seasoned veteran juggling 3-4 different projects (each with their own formatting requirements), having tools guarantee that every commit and PR is formatted correctly helps these newcomers get up to speed quickly and start contributing value.

---

Tools like Prettier ask us to loosen our grip on code formatting and styling. Many of us are passionate about the code we write—and there's nothing wrong about that! However, this passion often results in us holding on tightly to our idea of what "looks good" or "looks bad". Using a formatter for any team project turns this conversation about style into a one-time decision—which formatter shall you choose, and how shall you configure it.

What about you? Have you encountered pushback when introducing formatters into a codebase? Have you pushed back yourself? I'd love to hear any thoughts you have about what happens when we let our tools take control. If you want you can reach out to me on [Twitter](https://twitter.com/benjamminj) and let me know what you think!
