---
title: Moving away from MDX
description: At least for blogging, plain markdown is less frictionG
date: 2021-01-17
tags:
  - writing
---

I just [removed MDX files from my blog](https://github.com/benjamminj/portfolio/pull/162).

I've left the MDX parser for now. But going forward, authoring in `.mdx` is gonna be the _exception_, not the _rule_. I might strip the MDX parser out entirely in favor a simpler parser, we'll see.

This move has been something I've been contemplating for about a month now. Here's a few reasons why:

## Why not MDX?

In short, MDX is loaded with cool functionality, but it didn't actual problems in my authoring workflow. In fact, I felt like the added complexity created _more_ problems for me.

- **Plain markdown is enough for me to express myself.** I didn't need all the bells and whistles of MDX. I don't have a lot of interactive demos or custom widgets when writing.
- **Less constraints = more decisions.** I found the limitless possibilities of MDX to be paralyzing while writing. Instead of focusing on capturing my _thoughts_, I was stuck with questions like "should this be a `Callout` or a `blockquote`?" For my highly-distractable mind (see: [ADHD](https://www.additudemag.com/adhd-in-adults/)), this equals major friction while writing.
- **Markdown is more portable.** I've been toying with the idea of separating my content from my website's code. Whether that's just a separate repository, something like Notion, or a real CMS, Markdown presents a much easier path forward. Most external tools (like Notion / [Bear](https://bear.app/)) even support a "export as markdown" feature!

In short, I'm ditching MDX because I don't need the extra functionality it provides, and I lose a lot by having another complex tool in my build pipeline.

## When should you reach for MDX?

MDX isn't bad, just wasn't the right choice for my personal blog. Which begs the question, _**"When is MDX the right choice?"**_.

MDX is great if you have highly interactive demos as part of your content. You can easily colocate the demos next to the content and weave static and dynamic fluidly.

It's also great if your content is more flexible than plain Markdown allows. For example, you have a lot of different layouts or widgets.

Finally, MDX is a fantastic choice for documenting component libraries. In this case, you're weaving static content (talking about components) with interactive (embedding the components themselves).

## Extra reading

- [Shortcodes vs MDX](https://www.swyx.io/shortcodes-vs-mdx-3d4e/) - This article largely sums up my sentiments about MDX — at the moment, I think simple markdown + shortcodes probably makes more sense.
- [Josh Comeau's blog](https://www.joshwcomeau.com/blog/how-i-built-my-blog/) - This blog heavily uses MDX to build a fully-interactive reading experience. It's a great example of a use case where MDX makes total sense.
