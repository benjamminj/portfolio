---
title: How CSS Works - The Critical Rendering Path & CSS
draft: true
date: 2018-03-15
---

<!-- Intro -->
Remember the story of the tortoise and the hare? It's from *Aesop's Fables*. If you don't remember it, here's the TL;DR &mdash; a tortoise and a rabbit have a race. The rabbit races super fast, but along the way decides to take a nap. By the time he wakes up the tortoise is crossing the finish line. Slow & steady wins the race, after all.

There's a lot of great morals that come out of this story, of course. Taking a little longer to finish something is preferable to unfinished projects. Sometimes hasty work can be sloppy & it takes a little more time to do the job right.

However, if your website subscribes to the "slow & steady" methodology in regards to its initial load, chances are your users aren't gonna wait for you to cross the finish line. Especially when roughly [50% of users leave a page that takes longer than 3 seconds to load](https://www.thinkwithgoogle.com/marketing-resources/data-measurement/mobile-page-speed-new-industry-benchmarks/). Users want to see something on the page, and they want to see it fast.

<!-- Defining the Critical Rendering Path -->
## What is the Critical Rendering Path, Anyway?

When we say that users want quick load times, we have to draw the distinction between *critical* and *non-critical* resources. Perhaps you're lazy-loading some of your images or you've set up a bit of fancy route-splitting (thank you webpack!) to not send all of your JavaScript at once. These resources that are loaded after the initial page render are considered to be *non-critical* &mdash; that is, they don't delay the initial render of the page. Resources that delay the first render of the page are considered to be *critical*.

**The critical rendering path** is the minimum steps that the browser has to take from the moment it recieves the first byte of HTML to the moment that is renders pixels on the screen for the first time. Essentially, it's what the browser has to do to process our critical resources into something our users can enjoy. It looks something like this.

1. Build the DOM (Document Object Model) from the recieved HTML
2. If we encounter a CSS style sheet (embedded or linked), start building the CSSOM (CSS Object Model &mdash; we'll get into what this is in a bit).
3. If we encounter a JS block (not designated as `async`) while building the DOM, wait for CSSOM construction, stop DOM construction & parse/execute the code. The reason for this is because JS execution can modify the DOM & access/modify the CSSOM.

For the purposes of this article, we'll be diving into that 2nd step &mdash; how CSS factors into the critical rendering path. It's easy to take utmost care to tree-shake, route-split, & lazy-load our JavaScript, but sometimes CSS can be forgotten. However, an unoptimized CSS bundle can easily wreak havoc on your load times.

<!-- HTML & the Critical Rendering Path -->
## HTML and the Critical Rendering Path

Since this is primarily an article on CSS, we won't spend a _ton_ of time on DOM construction. However, CSS is fundamentally a language for styling markup, so we need to be aware of how it interacts with the DOM.

The **DOM** is a tree-like data structure containing all of the HTML nodes on the page. Each node contains the data about that HTML element (such as attributes, ids, & classes) If the node has any HTML elements as children, it will also point to those child nodes. For example, given the following HTML, we would construct the following DOM. Notice how the HTML's indentation & the DOM's structure are very similar.

![DOM Construction](https://res.cloudinary.com/da2iq7dge/image/upload/v1522285613/DOM_attay8.png)

As far as the critical rendering path goes, we consider HTML to be one of our render-blocking, critical resources &mdash; we can't render any content if we haven't parsed it yet!

<!-- CSSOM -->.
## Building the CSS Object Model

When the browser encounters a CSS stylesheet (either embedded or external), it needs to parse the text into something it can use for style layouts & paints. The data structure that the browser turns CSS into is creatively named the **CSSOM**, &mdash; the CSS Object Model.

What does the CSSOM look like? Given the following CSS, the browser would construct a CSSOM that looks like this.

![CSSOM Construction](https://res.cloudinary.com/da2iq7dge/image/upload/v1522285610/CSSOM_agge4f.png)

Essentially, we parse through any CSS selectors we have & assign them their place in the tree. If there's a single selector, it will be attached to the root node of the tree. Nested selectors will be attached to the node which they are nested underneath. The CSS parser has to read nested selectors from *right-to-left* in order to guarantee that they end up underneath the correct nodes.

Turning CSS into the CSSOM is considered to be a "render-blocking" stage just like building the DOM out of our HTML. If it just went ahead and rendered to pixels without waiting for the CSSOM we'd see a flash of unstyled content (ugly!) for a moment while the CSSOM was parsing. After that everything would shift around when finally applying the CSS. Not exactly a great UX by a long shot.

<!-- Render Tree construction -->
## The Render Tree

The browser uses the constructed CSSOM & DOM to create a "render tree". In short, the render tree contains _all of the information needed for the browser to create pixels on the page_. The browser basically takes the DOM & CSSOM & smooshes them together, removing anything that won't have an affect on the rendered output.

First, the browser removes all non-visible elements. This includes elements such as `<head>`, `<script>` & `<meta>`, as well as HTML elements that have the `hidden` attribute. These elements, although used by other parts of the app, won't be rendered to the page, so the browser can safely proceed with rendering knowing that all elements in the render tree are in fact visible HTML elements.

```
small graph of the render tree at this point
```

Next, we go through the CSSOM & find out _which elements in our current render tree match the CSS selectors_. The CSS rules for any selector that does match will be applied to that node of the render tree.

There's one CSS rule that's an exception, though. Applying `display: none;` in a CSS rule, will _remove an element from the render tree entirely_. This goes back to only including visible elements in the render tree. *Other methods of hiding an element, sich as `opacity: 0;` will not remove an element from the render tree but rather render it without showing it*.

![Render Tree Construction](https://res.cloudinary.com/da2iq7dge/image/upload/v1522285619/Render_Tree_h1duy5.png)

And with that we have a render tree, all ready to go! After we've combined our CSSOM & DOM into a render tree, the browser can use this & safely assume that the render tree contains exactly the information needed to paint those first pixels &mdash; nothing more, nothing less.

<!-- The home stretch: Layout & Paint -->
## Racing Down the Home Stretch: Layout & Paint

Armed with a complete render tree, the browser is ready to start putting actual pixels on the page. The last phase of the critical rendering pipeline contains two main steps: Layout & Paint.

**Layout** is where the browser figures out _where elements go_ and _how much space they take up_. The browser takes rules affecting margin, padding, width, & positioning into account here. When calculating layout, the browser has to start at the top of the render tree & move downward, since each element's positioning, width, & height is calculated based off of the positioning of its parent nodes. If you're familiar with the CSS box model, the browser is essentially drawing a bunch of CSS boxes accross the page.

However, it's important to remember that at this point _nothing is shown on the page_. Think of it as drawing stencil lines across the viewport, getting ready to fill them in.

**Paint** happens directly after the Layout phase, & we finally get to see some stuff rendered to the page! If you're measuring the end of the race as time to first pixel, this is the finish line. The browser goes through & fills in all the other CSS boxes with the non-layout rules. If you're using multiple compositor layers, the browser will ake sure things get into their dedicated layer.

<!-- Practical Takeaways -->
## Why Should I Care About CSS in the Critical Rendering Path?

You can spend as much time as you want optimizing the frames per second performance of your app, making it look pretty, or A-B testing for higher conversion rates, but it doesn't matter if your users bounce before the page even loads.

Knowing which steps the browser takes to get to that ever-so-important first pixel is critical (no pun intended 😂) if you're trying to improve your load time. Since the browser blocks rendering until it has parsed all CSS you can greatly improve your load time by _removing any CSS that doesn't apply to the first paint_ from your initial HTML document. Doing so greatly decreases the amount of time the browser needs to construct the CSSOM & render tree. Any CSS that is not necessary for the first load can be considered "non-critical" & can be lazy-loaded after users have gotten that first paint (this is especially important if you have a single page app, it's a big performance hit to send CSS for pages that aren't even visible yet!)

Another benefit of knowing how the CSSOM is constructed is deeper knowledge of selector performance. Since nested selectors must check parent nodes of the CSSOM, they tend to be slightly less performant than a flat CSSOM that avoids nested selectors. However, I would venture that in most apps that this isn't your performance bottleneck, and likely other things can be optimized before needing to rewrite CSS selectors.

As with anything related to web performance, you're probably better off profiling your load time before you start doing an overhaul on your CSS. If you're using Chrome, pop open DevTools & head over to the `Performance` tab. You can quickly see how much time you're spending on CSSOM construction, Layout & Paint by looking for the `Recalculate Styles`, `Layout`, & `Paint` events.