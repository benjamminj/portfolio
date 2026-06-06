---
title: debunking arguments against code comments
tags:
  - code-comments
---

Every month or two I end up seeing a post on LinkedIn or Twitter condemning code comments as "bad programming". And sometimes I just shrug it off and move on with my day.

However, there's a lot of us out there that like code comments! They're a valuable tool for us to show empathy for our teammates that will maintain the code we write.

A lot of arguments against comments come straight out of Clean Code, but these are the ones I've heard—both IRL and on the internet. As someone who likes comments, I think there's valid ways to address each of these arguments head-on.

## "Don't write comments, put it in a variable instead"

Ummm...I don't want to read variable names a mile long in camelCase. That makes my eyes bleed and my brain explode.

Instead, we have a language construct for expressing complex and nuanced thoughts—sentences.

Sure, redundant comments exist, and you should absolutely use good variables names. But variables aren't mutually exclusive with code comments.

<!-- TODO: don't actually include the quote -->

<!--
> I don't remember the last time I wrote a comment in my code
>
> Most of the time we can get rid of comments by just extracting a method and providing a meaningful name.
>
> In programming, clarity and expressiveness are everything.
>
> As you can see in the image below, comments usually just add noise.
-->

## "Comments get out of date, code is the only source of truth"

Comments don't get run by your runtime / compiler, so it's possible that they're misleading, out-of-date, or downright wrong.

But I'll let you in on a little secret: it's not unique to comments. For example, variables and function names. Your runtime doesn't care if you name a variable `user.firstName` or `user.potato`.

Codebases require maintenance, and comments are a part of the codebase. It's on you and your team to commit to maintaining them!

## "Don't write comments, capture context in commit messages instead"

First off, this only works if everyone on your team is diligent about their commit messages. In my career, I think I've worked in _one_ place where this was true.

Second, commits have a higher impedance than code comments. You don't have to seek out comments, they're gonna be right next to the code they describe. You'll have to seek out the relevant commit after thinking to yourself "this code doesn't have all the context". If it's a long-lived codebase this could mean sifting through years of commits.

Comments let you warn future maintainers, without forcing them to go find the relevant information themselves.

## "Comments add too much noise, and code should be beautiful"

The first part of this sentence is personal preference. And I'd argue that the second part isn't necessarily true—it all depends on how you view code.

Some view code as something that should be a work of art on its own. And they're allowed to believe that.

But for some of us (myself included) code is a means to an end. Making the code _beautiful_ is not the goal. Hence the phrase, ["make it work, make it right, make it fast"](https://wiki.c2.com/?MakeItWorkMakeItRightMakeItFast).

Often "making it right" means swallowing our pride and using a comment because that's the clearest way to communicate why the code was written. The code that gets the job done won't always be crystal-clear to others (or future you)!

---

There's a whole host of arguments in _favor_ of writing comments, stay tuned for a future post!
