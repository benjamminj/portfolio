---
title: How CSS Works - The CSSOM, Render Tree, Layout, & Paint
draft: true
date: 2018-03-15
---

<!-- INTRO -->
<!-- 
CSS is one of the staples of the front-end developer workflow, yet it's really easy 
to just use it without fully knowing & understanding how it works under the hood.
-->

<!-- How Does CSS get from index.css to actually making pages look pretty? -->

<!--
CSS Rendering Pipeline

Below is the process that CSS has to go through to get from code -> rendered pixels on the screen.

Sidenote: This matters even if you're manipulating CSS with JavaScript as well. Changes to CSS, HTML class name, or CSS maipulated thru JS will all trigger CSS to go through this rendering path.

1. Calculate styles (parsing & figuring out the "Render Tree")
  - 50% of time in this step is figuring out which selectors apply to an element
  - Other 50% of the time usually involves figuring out _which_ styles are applied to the element based on the matching selectors
-->

## 1. Calculate CSS Styles.

The first step in our CSS rendering path is construction of the CSS Object Model (CSSOM) & "Render Tree". You've heard of the DOM (Document Object Model)? When the browser begins parsing a CSS file, it turns the CSS code into a tree of CSS selectors & their attached rules.

The structure of the CSSOM give CSS its cascading nature. Elements further down in the tree inherit the rules from their parent nodes, applying their own rules as overrides.

After building the CSSOM, the browser will then combine it with the DOM to create the "render tree". In short, the render tree will consist of _all visible elements in the DOM_. This means that any HTML elements that are invisible (such as `<head> or <script>`) will not be included, as well as CSS that has been removed from the DOM via `display: none;`

It's worth noting that CSSOM & render tree construction primarily happen on the initial load. When re-rendering styles, the browser is a little streamlined. It doesn't have to reconstruct the _entire_ CSSOM / render tree, it simply has to determine _which_ CSS selectors apply to the changed element & which rules to apply based on those selectors.

## 2. Layout



<!-- 
2. Layout
  - After figuring out which rules to apply to an element, the browser then has to figure out WHERE they go & how much SPACE they take up.
  - This can also be a fairly expensive step of the pipeline, as any elements that have to go through the layout phase will also be forced through the pains & composite steps
3. Paint
  - Actually fill in pixels on the screen!
  - Often the most expensive area of the pipeline
4. Composite
  - In this step the browser uses the multiple layers & the GPU to handle rendering.
  - This step is fairly cheap as far as time on the main thread goes, however it does have extra memory constraints.
  - If you change rules that only affect the composite phase (transform & opacity), especially for moving elements & animations, you will see the biggest perf benefits.
-->
<!-- 
CSS & the Critical Rendering Path

1. CSS parsing, layout, & paint will block the rendering of the rest of the page. That is to say, teh browser cannot continue with the page until it is done with the CSS.
  - In the rendering pipeline, the browser compares the CSSOM with the DOM to build the 'render tree'
2. 
-->

<!-- 
Why You Should Care How CSS Is Loaded 

1. Knowing how the browser turns your CSS into beautiful pixels gives you knowledge of how to write more performant CSS
2. Web perf is HUGE -- know how to load a page quickly by & reduce "jank" by writing performant CSS.
3. Measure first
  - spending a ton of time optimizing your CSS selectors will likely only yield milliseconds of perf improvements
  - CSS is often a culprit of slow page loads, but it's usually because you're sending TOO MUCH CSS.
-->
