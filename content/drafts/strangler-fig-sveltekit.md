- need to set up endpoints to proxy the old app (in my case, Next.js required 2)

  - `src/routes/[...path].ts` and `src/routes/_next/[...path].ts`

- then, start migrating your pages 1 by 1!

  - if your pages are prerendered (mine were), make sure to set `kit.prerender.crawl = false` in your `svelte.config.js` while you're migrating routes in the "middle" of your URL architecture. Otherwise you might find that the crawler will hit your proxy endpoints and store the HTML. Could depend on the hosting provider, but on Vercel this resulting in the HTML being _downloaded_ instead of _served_ in Chrome.

- Note: my website currently doesn't have any data mutations. If you have data mutations strangler fig approach is gonna be a lot harder. But at a high level it's gonna be the same approach. Chances are you'll find that you want to store _less_ in frontend in-memomry state while migrating and sync things either to persistent browser memory or the server. That way you can easily hand things off between each app and migrate based on pages.
