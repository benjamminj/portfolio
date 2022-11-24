---
title: design system color tokens
date: 2022-03-27
tags:
  - design-systems
  - css
---

- common issues with design tokens
  - going too abstract too soon
  - tokens are _too_ constrained
  - no guidance on how to use tokens
  - thinking that components = tokens
  - naming things too specific, or not clearly.
- my working list of color system tokens
  - `$base` - the base "canvas" of the application.
  - `$base-muted` - this is from the same palette as `$base`, but used to de-emphasize an element's background. Depending on the theme, that could be lighter _or_ darker.
  - `$base-strong` - this is from the same palette as `$base`, but used to emphasis an element's background. Depending on the theme, that could be lighter _or_ darker.
  - `$contrast` - this is for content that's on top of `$base`. It should meet at least AA, ideally AAA contrast ratio.
  - `$contrast-muted` - this is from the same palette as `$contrast` but is used to de-emphasize content. It should meet at least AA contrast ratio.
  - `$contrast-strong` - this is from the same palette as `$contrast` but is used to emphasize content. It should meet at least AA contrast ratio.
- system ideas
  - per token, the following variants:
    - `-muted`
    - `-strong`
    - `-contrast`
    - `-contrast-muted`
    - `-contrast-strong`
  - per variant, the following interactive states:
    - `-hover`
    - `-active`
