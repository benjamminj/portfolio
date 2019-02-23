---
title: Tools like Prettier ask us to give up control
draft: true
date: 2019-02-18
---

<!--
1. Talk about what Prettier does. Keep it brief, perhaps lean more on links than your own stuff
2. Talk about why tools like Prettier sometimes receive pushback. The main reason often has to do with developers disliking the way it formats the code (i.e. "it's not clean or easy to read", or "I dislike how it formats ternary statements")
3. Transition — Prettier does come with an ask: give up your control over the formatting, I'll handle it. Trust me, I've got this.
4. What we gain in return for giving up ou control.
-->

Perhaps you've heard of a tool called [Prettier](). If you haven't, Prettier is a code formatter for a variety of languages—JavaScript, TypeScript, CSS, Markdown, GraphQL, and many others!

Working on a project with a formatter installed can be an absolute joy. You can simply write code, hit save, and voila! Everything snaps into place and your code is beautifully and consistently formatted across the entire project.

And yet, I've seen a decent amount of pushback when introducing Prettier to a team. I've done this a few times over the past few years, and adoption often been initially met with reluctance. Then, after we start using it for a little while Prettier becomes one of the team's favorite tools.

I think one of the main reasons that tools like Prettier receive pushback is due to the way that it formats code. It doesn't allow too many configuration options in order to remain opinionated. This often results in Prettier formatting the code in a way that you might initially "dislike"—while the code still works 100% the same as it did pre-formatting, it's not the way "you would have formatted it". Perhaps it's the way it breaks lines or handles ternary expressions.

Prettier doesn't hide the fact that it's opinionated about the way it formats code. After all, it's chosen description is "An opinionated code formatter". Opinionated tools always comes with an ask: "Leave the formatting to me—don't worry, I've got this."

When we adopt opinionated tools like Prettier we do lose something—our fine-grained control over the code-formatting specifics. But what we gain in return makes the loss 100% worth it (in my opinion).

<!--
Using the "best-in-class" tools often requires that we give up some of the fine-grained control over our software. And for some this can be difficult.

Prettier/formatters — stop caring about what the code _looks_ like cosmetically. You have to trust that the code formatter will do its job. In addition, even if it formats it in ways that you "don't like", you have to humbly step down and let it format away. Because what we gain in return is so much better.
  - Stop "nitpicks" on PRs
  - Stop second-guessing whether your code is "up to style" with the team's standards
  - Makes it easier for people that switch b/w projects to easily match the proper coding style (freelancers, consultants, side-hustles, & OSS)
  - Focus on the actual code and how it runs, not whether it has a semicolon or not.
  - https://www.reddit.com/r/javascript/comments/8as6ns/i_dont_like_prettier/


-->
