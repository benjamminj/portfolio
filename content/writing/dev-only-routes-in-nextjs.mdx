---
title: Dev-only routes in NextJS
date: 2020-09-05
tags:
  - nextjs
  - front-end
---

I've found myself often wishing that NextJS had a way to optionally hide **entire pages** from the production builds.

For example, on this website I have a small design system—it helps me keeps things like colors, spacing, and border-radii consistent. I also have a single page containing all my components so that I can easily workshop and test them. However, that's a page that I don't see too much value in sharing with the entire world (yet)—it's just a dev tool for myself.

For a big-scale design system (like what you'd build at a company), you'd likely have a separate repository with something like [Storybook](https://storybook.js.org/), [Playroom](https://github.com/seek-oss/playroom), or [StyleGuidist](https://react-styleguidist.js.org/) set up. However, that can be a large amount of overhead to maintain—especially if you're a small team (or a single dev). Sometimes the size of the project doesn't justify having a separate repo of components.

NextJS doesn't have anything built-in that lets us optionally hide a page (to my knowledge), but we can use a couple of its page-creation APIs to achieve the exact same experience.

---

## tl;dr

We can leverage NextJS' [dynamic routes](https://nextjs.org/docs/routing/dynamic-routes) and [`getStaticPaths`](https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation) to optionally render routes based on environment variables. This is useful for things like website documentation and partially finished work.

---

## What are the "specs"? 📝

Before we dive into the code, let's define exactly what we want to achieve. For me, it's a couple things:

- Whether we enable the page should be adjustable with an _environment variable_. This fits in nicely with [12-factor app](https://12factor.net/config) philosophy.
- If the page is not enabled, _its route should return a 404 response_, as if the page never existed.
- If the page is enabled, _it should display the content_ normally.

## Show me the code! 🙃

To leverage this approach, we'd need to place the following page code in a file within the `pages` directory. To properly leverage dynamic routing, we also need the filename to be encased in square brackets. For example, `pages/docs/[component].jsx`.

```jsx
// pages/docs/[component].jsx

const DevOnlyPage = () => {
  return <div>test!</div>
}

// Even though there isn't any "dynamic" data flowing into our page component
// we can leverage `getStaticPaths` to dynamically determine _which_ pages should
// be built.
export const getStaticPaths = () => {
  const paths = []

  // If the environment variable is available, push some pages. This gives you
  // fine-grained control over whether or not pages are added.
  if (process.env.BUILD_DOCS === 'true') {
    // `component` lines up to the page name of [component].jsx
    paths.push({ params: { component: 'design-system' } })
  }

  // If `paths` is empty, all paths at this route will return 404 responses, same
  // as if we never had the page at all.
  return {
    paths,
    // This is important, using `fallback: false` means that all routes not
    // returned from this function return 404 responses.
    fallback: false,
  }
}

// Even though we're not dynamically getting any props, `getStaticPaths` doesn't
// work without `getStaticProps`.
export const getStaticProps = () => {
  return {
    props: {},
  }
}

export default DevOnlyPage
```

## Trade-offs

One of the big tradeoffs of this approach is that you _have_ to use NextJS' dynamic routes and `getStaticPaths`. This potentially breaks away from NextJS' opinionated "every route is a page component" philosophy if you have multiple pages under a single route (i.e. `/docs/design` and `docs/architecture`).

If you have multiple dev-only pages on a parent route, you might need some lightweight conditional logic in your page component. You can return the page name from `getStaticProps` and use that to conditionally render each dev-only component.

One potential workaround (I haven't tried it yet) is using an [_optional catch-all route_](https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes) to do the dynamic routing. This might make multiple dev-only routes a little simpler.

## Some potential use cases 🤔

Here's a couple cases where I think an approach like this could be useful:

- Previewing your design system. This was the original use case that made me investigate this approach.
- Partially finished work. For example, if you're building a new page that's gonna take a multiple PRs but you don't want to expose it. You can use this approach as a simple method of feature-flagging routes to keep them out of production.
- This approach could be a nice way to host dev-only documentation (for example, [ADRs](https://github.blog/2020-08-13-why-write-adrs/)) without exposing it in your production environments.

---

Thanks for reading! As always, feel free to [let me know on Twitter](https://twitter.com/benjamminj) if you enjoyed the article or [submit a PR](https://github.com/benjamminj/portfolio) if you found a typo!
