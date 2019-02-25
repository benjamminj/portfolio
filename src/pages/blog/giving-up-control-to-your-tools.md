---
title: Tools like Prettier ask us to give up control
draft: true
date: 2019-02-24
---

Perhaps you've heard of a tool called [Prettier](). If you haven't, Prettier is a code formatter for a variety of languages—JavaScript, TypeScript, CSS, Markdown, GraphQL, and many others!

Working on a project with a formatter installed can be an absolute joy. You can simply write code, hit save, and voila! Everything snaps into place and your code is beautifully and consistently formatted across the entire project.

And yet, I've seen a decent amount of pushback when introducing Prettier to a team. I've done this a few times over the past few years, and adoption often been initially met with reluctance. Then, after we start using it for a little while Prettier becomes one of the team's favorite tools.

I think one of the main reasons that tools like Prettier receive pushback is due to the way that it formats code. It doesn't allow too many configuration options in order to remain opinionated. This often results in Prettier formatting the code in a way that you might initially "dislike"—while the code still works 100% the same as it did pre-formatting, it's not the way "you would have formatted it". Perhaps it's the way it breaks lines or handles ternary expressions.

Prettier doesn't hide the fact that it's opinionated about the way it formats code. After all, it's chosen description is "An opinionated code formatter". Opinionated tools always comes with an ask: "Leave the formatting to me—don't worry, I've got this."

When we adopt opinionated tools like Prettier we do lose something—our fine-grained control over the code-formatting specifics. But what we gain in return can make the loss 100% worth it.

When we give control of formatting over to our tools we can suddenly stop thinking about formatting rules. I didn't realize how much time I spent deciding whether a function should be broken into a single line vs. multiple lines, trying to hunt down missing semicolons, or other miscellaneous formatting decisions. Although each of these amount to small decisions, they add up over the course of a day. If we can cut out an entire _category_ of decisions from our workflow, we free up a _ton_ of decision-making power for stuff that can't be automated, like variable names, API decisions, and future maintainability.

When we give control of formatting over to our tools we also eliminate an entire class of PR comments. Seeing a PR with 50 comments saying "semicolon here" or "please break into multiple lines" isn't fun in the slightest (for both the reviewer _and_ the author). We can set the PR author up for success if we simply add a formatter to our project—whatever the formatter does is the "right way" for the project. Instead of spending precious time and energy commenting on style, PR reviewers can focus on the maintainability of the new code and how it fits within the larger ecosystem of the codebase.

When we give control of formatting over to our tools we make our project more welcoming to newcomers. Whether it's someone who's just started learning how to code or a seasoned veteran juggling 3-4 different projects (each with their own formatting requirements), having tools guarantee that every commit and PR is formatted correctly helps these newcomers get up to speed quickly and start contributing value.

---

Tools like Prettier ask us to loosen our grip on code formatting and styling. Many of us are passionate about the code we write—and there's nothing wrong about that! However, this passion often results in us holding on very tightly to our idea of what "looks good" or "looks bad". Adopting a formatter for any team project turns this conversation about style into a one-time decision—which formatter shall we choose, and how shall we configure it.

What about you? Have you encountered pushback when introducing formatters into a codebase? Have you pushed back yourself? I'd love to hear any thoughts you have about what happens when we let our tools take control. If you want you can reach out to me on [Twitter](https://twitter.com/benjamminj) and let me know what you think!
