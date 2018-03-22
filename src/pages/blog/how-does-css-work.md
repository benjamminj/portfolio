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
When talking about load times, it's important to define what we mean by the "critical rendering path". In short.

**The critical rendering path** is the steps that the browser has to take in order to display the first pixels on the screen.

In short, the critical rendering path looks something like this.

1. Build the DOM from the recieved HTML
2. If we encounter a CSS style sheet (embedded or linked), start building the CSSOM.
3. If we encounter a JS block (non-async) while building the DOM, wait for CSSOM construction, stop DOM construction  & parse/execute the code. The reason for this is because JS execution can modify the DOM & access/modify the CSSOM.

<!-- HTML & the Critical Rendering Path -->
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
