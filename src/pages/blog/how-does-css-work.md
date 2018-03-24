---
title: How CSS Works - The Critical Rendering Path & CSS
draft: true
date: 2018-03-15
---

<!-- Intro -->
- The tortoise & the hare "Slow & Steady Wins the Race"
- In many things this is great — better to take slightly longer & be consistent, reliable, etc than to go super fast & miss details or (much worse) crash & burn
- However, when talking about load time there is no room for "slow & steady". What you need is "fast & stable", since load times are a critical factor in conversion rate.
  - Find that report that says that after 3s load time you'll lose 50% of your traffic.

<!-- Defining the Critical Rendering Path -->
## What is the Critical Rendering Path, Anyway?

When talking about load times, it's important to define what we mean by the "critical rendering path". In short.

**The critical rendering path** is the steps that the browser has to take in order to display the first pixels on the screen.

In short, the critical rendering path looks something like this.

1. Build the DOM from the recieved HTML
2. If we encounter a CSS style sheet (embedded or linked), start building the CSSOM.
3. If we encounter a JS block (non-async) while building the DOM, wait for CSSOM construction, stop DOM construction  & parse/execute the code. The reason for this is because JS execution can modify the DOM & access/modify the CSSOM.

<!-- HTML & the Critical Rendering Path -->
## HTML and the Critical Rendering Path

Since this is primarily an article on CSS, we won't spend a _ton_ of time on DOM construction.

However, since CSS is fundamentally a language for styling markup, we need to be aware of how it interacts with the DOM.

**The DOM** is simply a tree-like data structure containing all of the HTML nodes on the page. Each node contains the data about that HTML element (attributes, classes, etc), & points to its own children nodes. For example, given the following HTML, we would construct the following DOM

```html
<html>
  <head>
    <meta charset="UTF-8">
    <title>A nice, light DOM</title>
  </head>
  <body>
    <header>
      <h1>DOM construction</h1>
    </header> 

    <main>
      <p>Yay! Content</p>
    </main>
  </body>
</html>
```

```
include the graph of the DOM here
```

If you're observant you might notice that the HTML's indentation closely mirrors the structure of the DOM (perhaps this is an unconscious reason we indent this way!).

As far as the critical rendering path goes, we consider HTML to be a "render-blocking" resource, meaning that the browser can't render any pixels until it has constructed the DOM. This makes sense, given that we can't display anything on the page if we don't have anything parsed yet.

<!-- CSSOM -->
## Building the CSS Object Model

When the browser encounters a CSS stylesheet (either embedded or external), it needs to parse the text into something it can use for style layouts & paints. The data structure that the browser turns CSS into is creatively named the **CSSOM**, which stands for CSS Object Model.

What does the CSSOM look like? Given the following CSS, the browser would construct a CSSOM that looks like this.

```css
body {
  font-size: 16px;
}

h1 {
  font-size: 1.5rem;
}

.red {
  color: red;
}

div p {
  color: black;
}
```

```
CSSOM goes here...perhaps show them side-by-side?
```

It's also worth noting, that unlike HTML, the CSSOM doesn't directly mirror the CSS code. Rather, it mirrors, your CSS selector structure. Nested selectors will be further down in the tree, while stand-alone selectors will just be below the `body` tag.

<!-- Render Tree construction -->
Once the CSSOM _and_ the DOM have been constructed, the browser works on combining these two into a _render tree_. The Render Tree contains _all of the information needed for the browser to create pixels on the page_.

During render tree construction, the browser engine first removes all non-visible elements. This includes elements such as `<head>` & metadata, as well as HTML elements that have the `hidden` attribute. When we remove these elements, we essentially create a subset of the DOM only including HTML elements that the browser would need to paint to the page.

```
small graph of the render tree at this point
```

Next, we go through the CSSOM & find out _which elements in our subset of the DOM match these CSS selectors_. In this same phase, we attach the CSS rules from this node of the CSSOM to our matched render tree node.

While matching up CSS rules to the render tree, applying `display: none` to a render tree node _will remove that tree from the render tree entirely_. Essentially `display: none` turns its matching DOM node into a non-visible element & it is stripped out at this point.

```
small graph of combining CSS to the render tree
```

And there we have it! After we've combined our CSSOM & DOM into a render tree, the browser can use this & safely assume that the render tree contains exactly the information needed to paint to the page &mdash; nothing more, nothing less.

<!-- The home stretch: Layout & Paint -->
## Racing Down the Home Stretch: Layout & Paint

Armed with its render tree, the browser is ready to start putting actual pixels on the page. The last phase of the critical rendering pipeline contains two main steps: Layout & Paint.

**Layout** is where the browser figures out _where elements go_ and _how much space they take up_. The browser takes rules affecting margin, padding, width, & positioning into account here. When calculating layout, the browser has to start at the top of the render tree & move downward, since each element's positioning, width, & height is calculated based off of the positioning of its parent nodes. If you're familiar with the CSS box model, the browser is essentially drawing a bunch of CSS boxes accross the page.

However, it's important to remember that at this point _nothing is shown on the page_. Think of it as drawing stencil lines across the viewport, getting ready to fill them in.

**Paint** happens directly after the Layout phase, & we finally get to see some stuff rendered to the page! If you're measuring the end of the race as time to first pixel, this is the finish line. The browser goes through & fills in all the other CSS boxes with the non-layout rules. If you're using multiple compositor layers, the browser will ake sure things get into their dedicated layer.

<!-- Practical Takeaways -->
## Why Should I Care About CSS in the Critical Rendering Path?

You can spend as much time as you want optimizing the frames per second performance of your app or making it look pretty, but if it doesn't load quickly you're gonna have some of your users bounce.

Knowing which steps the browser takes to get to that ever-so-important first pixel is paramount if you're trying to improve your load time. Since the browser blocks rendering until it has parsed all CSS you can greatly improve your load time by _removing any CSS that doesn't apply to the first paint_ from your initial HTML document. Doing so greatly decreases the amount of time the browser needs to construct the CSSOM & render tree. Any CSS that is not necessary for the first load is considered to be "non-critical" & can be lazy-loaded after users have gotten that first paint (this is especially important if you have a single page app, it's a big performance hit to send CSS for pages that aren't even visible yet!)

Another benefit of knowing how the CSSOM is constructed is deeper knowledge of selector performance. Since nested selectors must check parent nodes of the CSSOM, they tend to be slightly less performant than a flat CSSOM that avoids nested selectors. However, I would venture that in most apps that this isn't your performance bottleneck, and likely other things can be optimized before needing to rewrite CSS selectors.