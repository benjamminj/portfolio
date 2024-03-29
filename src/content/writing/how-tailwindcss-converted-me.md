---
title: How TailwindCSS converted me
subtitle: 'Slowly but surely, utility-first CSS won me over.'
date: 2020-12-17
tags:
  - css
  - front-end
---

I'm _surprised_ I like [TailwindCSS](https://tailwindcss.com/). I tried it a couple years ago (pre-v1) and I remember that I couldn't stand this whole "utility-first" CSS thing.

Instead, I dove headfirst into CSS-in-JS, trying out `styled-components`, `emotion`, and a few other libraries.

For the past couple years, `emotion` has been easily my go-to approach for CSS. I've built some large apps using it, and I think it's fantastic if you're going with CSS-in-JS.

However, I kept seeing all this Tailwind hype on Twitter. I had some people mention it on my [Twitch stream](https://www.twitch.tv/benjamindjohnson) as well as some coworkers talking about it. A couple months ago I figured it was time to give it another shot.

I think Tailwind has unseated CSS-in-JS (and `emotion`) as my go-to CSS solution. I was pretty skeptical but it's finally converted me over. 🎉

Here's some of my thoughts on _why_ I'm choosing Tailwind these days and why I'm now choosing it over CSS-in-JS.

---

## tl;dr ⏱

Before we deep-dive, here's an executive summary. If you're pitching Tailwind to your team I would start here:

- **Colocation of styles and markup.** While this feels like it violates "separation of concerns", it's views the _component_ as the unit of composition in front-end apps.
- **Less naming fatigue.** Not being forced to name containers and wrapper frees you up to spend energy on more important problems.
- **No JS runtime.** Save some kb of JS and send down regular ol' CSS instead. Don't forget to purge the unused Tailwind classes though!
- **Scales better than you'd think.** Having things inline feels like a recipe for disaster, but Tailwind delivers on its promises if you give it a shot.
- **Constraint-driven.** Having a design system with constraints built into it means that using Tailwind will often lead to more consistent, cleaner UIs. Especially if you're not a designer.

---

## The tradeoffs you make with Tailwind

Since I was a skeptic about utility-first CSS, I'm going to start with the reasons I _didn't_ like Tailwind, and what's changed.

Hopefully these line up with your concerns about Tailwind if you're on the fence. _(Or if you're advocating using Tailwind on your team and you're having struggles convincing team members.)_

### wHaT aBOut sEpArAtIOn oF cOnCErns?

When I learned programming, I was taught that markup (HTML), styles (CSS), and functionality (JS) should be split into separate files.

After building some larger (and more complex) applications, I don't think "concerns" in front-end apps always map nicely to HTML, CSS, and JS files. Especially if you're using a framework.

In React we put HTML in our JS files ([JSX](https://reactjs.org/docs/introducing-jsx.html)). [Vue's single-file components](https://v3.vuejs.org/guide/single-file-component.html#single-file-components) put HTML/CSS/JS in one `.vue` file.

In modern web apps I think the _component itself_ is the "concern" we want to separate. It's not the styles vs the JS vs markup—they all work together to make up the self-contained component.

As I've reflected on components being self-contained, I've grown more and more open to having styling directly in my markup. _(I've actually been doing this for a while via `emotion`'s `css` prop.)_

Adam Wathan (Tailwind's creator) also has a fantastic article on [separation of concerns and utility CSS](https://adamwathan.me/css-utility-classes-and-separation-of-concerns/). If this is your main roadblock to trying out Tailwind I'd highly recommend giving it a read.

### Ugly markup

Another thing that I originally _hated_ with Tailwind was the explosion of classes into my HTML.

It can be a bit jarring seeing that list of classes the first time you have to do some complex styling.

```html
<a
	href="https://example.com"
	className="inline-block text-xl font-medium text-black no-underline dark:text-white"
>
	<span className="lowercase">Link text</span>
</a>
```

And unlike CSS-in-JS, you can't statically type the fields with TypeScript. Splitting the string of classes into multiple lines is also less than ideal.

I'll admit, it took me a while to acclimate to this. However, I now think the single string of classes (in most cases) to be less messy than using a CSS-in-JS `css` prop. Tailwind's classes all fit into a single (albeit long) line while the `css` prop styles will do a single line per rule.

And while having a `styled-component` results in less _markup code_, this comes with its own tradeoffs (you lose colocation of styles/markup to trim down lines of markup)

### Big CSS file size

When I had originally tried Tailwind the file size of the bundled CSS was a big concern. If I remember correctly, `purgecss` was not bundled with Tailwind so you had to set it up separately.

> _If you're not familiar with `purgecss`, it's a `postcss` plugin that removes any CSS that isn't used._

Now that `purgecss` comes built-in to `tailwind.config.js` keeping production files small is easy-peasy.

The key thing to remember about `purgecss` is that it operates by finding string matches of classes in your code. This means that you can't do dynamic JS to build Tailwind classes since `purgecss` won't match them and will mark them for removal.

Which brings me to the next trade-off of Tailwind...

### Not as dynamic as CSS-in-JS

Simply put, Tailwind is nowhere near as dynamic as CSS-in-JS. And that's a good thing.

With CSS-in-JS, you have the full power of JavaScript (or TypeScript) as your preprocessor. Turns out, this is a double-edged sword.

JS as a preprocessor can let you dynamically style based on data, create elegant "DRY" mixins, and get static typing.

The thing is, a lot of times we don't need that much power. We just need to flip a couple styles based on our button is `primary` or `secondary`.

I've found I can get 90% of the dynamic styles I need by conditionally applying classes with [`clsx`](https://github.com/lukeed/clsx) (or [`classnames`](https://github.com/JedWatson/classnames)). For the other 10%, a combination of inline styles, custom CSS, and CSS variables is enough.

If you have super dynamic styles, you don't _have_ to exclude CSS-in-JS to use Tailwind. You can use both in an app, or use the [`tailwind-babel-macro`](https://github.com/bradlc/babel-plugin-tailwind-components) to generate CSS-in-JS styles.

### Good for prototyping and small projects, but it won't scale.

Lastly, my common reply whenever Tailwind got brought up used to be "I think it looks _interesting_, but I wouldn't pick it if the project needs to _scale_".

I thought it was only a good tool for prototyping and smaller apps.

**I was wrong.**

Now that I've built a few apps with Tailwind, I think I can say that it has the qualities I'd look for when searching for a "robust" styling approach.

In fact, I'd say that Tailwind not only makes scaling your styles _possible_, it might even make it _simpler_.

_I couldn't find a list of companies using Tailwind at the time of writing. But check any comments section, Hacker News, Twitter, etc and you'll find anecdotal evidence of people shipping production-grade apps with it._

## Some additional benefits of Tailwind

Now that we've gone through my past blockers to using Tailwind, I wanna look at a couple extra benefits I think using Tailwind offers.

### Colocation of styles & markup

We already touched on this a little bit when talking about "separation of concerns" but it bears repeating. Having styles and markup in a single file initially _sounds_ bad, but it carries numerous benefits:

- Deleting HTML (or JSX) automatically deletes its associated CSS.
- Less nasty import paths (bye, bye, `../../../../`)
- Smaller, more manageable directory structure.

Note that colocation of styles and markup is possible in CSS-in-JS via thins like `emotion`'s `css` prop and `theme-ui`'s `sx` prop.

I'm not the first to extol the pluses of colocation—check out [this article by Kent C. Dodds](https://kentcdodds.com/blog/colocation) on how colocation can help software projects stay maintainable.

### Less naming fatigue

Naming things is hard. After all, it _is_ one of the ["two hard problems"](https://martinfowler.com/bliki/TwoHardThings.html) in software development.

It's critical that we learn to give things meaningful names when we're building software projects.

But we don't have to name **every. single. thing.** We can pick and choose our battles.

I experienced this naming fatigue when using CSS-in-JS libraries like `styled-components` as well as in raw CSS using [BEM](https://css-tricks.com/bem-101/) naming conventions.

The problem is that you have to create a meaningful name in order to apply styles to any HTML tag. This adds significant mental overhead—after all, there's only so many variations of `Container` and `Wrapper` out there. 😅

I'm not saying that you never name styles—you'll probably want to abstract things into components and give them meaningful names. But it's liberating to not be _required_ to come up with a name when all you want is a little `padding` on a `div`.

### Built-in design system

Tailwind's approach to CSS centers largely around _design systems_ and generating _design system tokens_. Tailwind sets up a design system and corresponding CSS classes for you out of the gate. However if you (or your designer) need custom values you can customize the generated CSS via `tailwind.config.js`

For example, instead of allowing you to pick any pixel (or `rem`!) value for margin, Tailwind sets up classes like `.m-0` (`0`), `.m-4` (`1rem`), `.m-6` (`1.5rem`). Each number on the `m` scale corresponds to a predetermined value.

While it seems like having full control over the pixel values would let you achieve pixel perfection, it turns out having _some constraints_ forces you to choose the nearest value from your design system. This generally leads to a more unified design.

This _can_ be done in CSS-in-JS or raw CSS/SCSS, but you'll have to create the design system tokens yourself, which can take a good deal of time and effort (`theme-ui` does create tokens for you by default). You'll also have to enforce design system in usage in every PR to make sure that people don't sneak hard-coded pixel values in.

### Framework agnostic

As a whole, CSS-in-JS tends to favor the React ecosystem. While there are a few framework agnostic CSS-in-JS libraries (`emotion` included), most are geared towards the React community.

For example, `styled-components` only works with React (to my knowledge), and I'd consider `emotion` to be React-first (most of the documentation assumes you're using JSX).

In contrast, Tailwind is built on top of PostCSS and integrates seamlessly into any front-end project. It's nice knowing that knowledge of this tool can be reused in a project using Vue, Svelte, Angular, or even raw HTML.

### Less build setup

Tailwind definitely involves _some_ build setup, but much less than a lot of CSS-in-JS libraries.

If you're building a moderately large project, the CSS won't be the _only_ thing you have to setup. Chances are you'll have to integrate your solution along with stuff like TypeScript, Babel, ESLint, Jest, and server-rendering.

Getting all of these to play nice in the sandbox can make you tear your hair out. I've spent multiple _days_ getting a CSS-in-JS setup working properly with full server-rendering, TypeScript, ESLint, and JEst support. It's not pleasant.

Although Tailwind requires a configuration file, they make it easy to get up and running. You can run `npx tailwind init` and they'll generate a config file with all of the defaults applied! 🎉

This lets you spend less time setting up your project and more time building your project.

### No runtime JavaScript

This is a big win for Tailwind over CSS-in-JS. Since Tailwind is a CSS utility framework, it doesn't add any JS to your production bundle.

In contrast we have CSS-in-JS which ships with a runtime to parse the style objects into valid CSS, generate classes, and insert those into the `head` of the document.

`@emotion/react`'s runtime is about 10kb (gzip + min) and `styled-components` ships with about 12kb of JS (gzip + min). And that's before you write any of your own code.

Tailwind doesn't ship any runtime JS, which creates a little more space on the main thread for everything else in your app as well as faster load times for your users.

> ⚠️ _If you forget to use `purgecss` you might accidentally send **the entire Tailwind CSS** in your production code. This would actually be worse since Tailwind v2 is about 290kb gzipped! [You can read more about purging CSS here](https://tailwindcss.com/docs/optimizing-for-production)_.

---

## Some closing thoughts

Tailwind is far from being a **perfect** CSS solution, but I think it's a **good** one. Who knows? I might be writing another post like this about some other technology in a year or so. 😅

That said, Tailwind is controversial in the front-end community because it throws so much "conventional wisdom" out the door. And yet people using Tailwind are extremely satisfied with it—head over to any public forum and you'll see people gushing over Tailwind.

There is no silver bullet when it comes to software tools. There's only pragmatically evaluating the pros and cons of each tool, and explicitly choosing the tradeoffs that seem best for your given use-case.

Right now, Tailwind is one of those tools—I like the tradeoffs it makes and think it will prove extremely useful as I continue to build web apps.

Feel free to reach out with any feedback or comments! You can find me on [Twitter](https://twitter.com/benjamminj) and [LinkedIn](https://www.linkedin.com/in/benjamin-d-johnson/). If you see a typo or if there's a significant mistake in what I've written, please open a [PR](https://github.com/benjamminj/portfolio/tree/main/writing) to edit this article. Thanks for reading!
