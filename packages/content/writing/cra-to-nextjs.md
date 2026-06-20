---
title: Lessons from our ~7 month migration to Next.js
date: 2024-04-27
tags:
  - nextjs
---

In October 2023 I completed a migration from Create-React-App (CRA) to Next.js at [work](https://sublime.security/).

Before I get too far into what I _learned_ from this migration, a quick word — this post isn't about why you should migrate to Next.js. It's also not a tutorial.

However, answering "why?" and "how?" is essential for any successful migration, so I'll offer a quick summary.

## why?

This [Github comment](https://github.com/facebook/create-react-app/issues/11180#issuecomment-874748552) summarizes the reasons we got off of CRA. In short, it wasn't ever intended for production-grade software applications, and our app was suffering from a good deal of [accidental complexity](https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf) as a result of being on top of CRA and React Router.

We picked Next.js because we could incrementally migrate without immediate changes to the architecture (keep the same bundler, rendering techniques, infrastructure, etc). Secondly, at the time (March 2023) it was more established and stable than the alternatives, and I have a good deal of history with Next.js which de-risked some unknowns.

_Sidenote — I know it's become trendy to hate on Next.js' instability. I've been using it since v3 and have not had difficulty upgrading. But your experience may be different!_

## how?

Our migration followed a fairly standard "[strangler fig](https://martinfowler.com/bliki/StranglerFigApplication.html)" pattern — we wrapped the existing React Router app inside a catch-all route. Then we migrated route-by-route until there were none left.

On the infrastructure front, we kept the existing Docker image (nginx) as-is, serving a fully client-rendered application. The initial plan was to migrate all of the routes first, and swap to a Node.js image at the end. However, we ended up swapping the image to Node.js in the 3rd week to solve some product bugs (needed some route rewrites on some third-party APIs, and also needed server rendering for some routes to have better SEO).

In total, the migration ran from March 2023 to October 2023. For the first few months it was just myself, and in the last few months of the migration there was another engineer working on route migration alongside me.

Finally, we only had ~2 weeks where we were working on the migration full-time — for the bulk of it we were migrating 1-2 routes when we had spare chunks of time. The rest of our time was spent on regular feature development.

## lessons learned

Overall, I'm proud of the migration and consider it a success — we're a small team, and we were able to ship a major architectural improvement without (too many) hiccups. We also did not pause on shipping customer-facing features over the course of the migration.

I didn't expect it to take me ~6 months to sit down and write about the migration. However, one benefit is that I've had a good amount of time to reflect on what I'd like to highlight about it.

### plan in shippable chunks

Don't plan to ship your migration in one go. Instead, plan the migration so that you can ship pieces incrementally.

This vastly decreases the level of risk you take on. You may hit the exact same bugs, but you've smeared them over weeks / months instead of a single release. You'll probably notice them (and fix them) long before your users do.

You can also hit "pause" on the migration at any point. This allows you to respond to real business needs. You can ship new features, fix bugs, go on-call, etc — all while making sure that the migration progresses forward, step by step.

Incremental, pausable chunks is the only way to safely finish the migration without losing your sanity. You may never need to hit pause, but more often than not you'll need that option to be available.

### provide actual business value

If you want your migration to be considered a success it needs to provide some actual value to the business.

Granted, business value™ has a lot of flavors. Sometimes it's a direct line between the code and the money it brought in. Other times it's fuzzier things like "dev productivity".

In our case, Next.js opened a few doors early-on. More specifically, it afforded us an easy way to proxy some third-party dependencies, and it allowed us to build a couple features (dynamic og images) that would have been tricky without it.

We've also gotten some of the fuzzier business value as well — we removed a bunch of outdated dependencies, our dev server starts faster, and our codebase has a bit more structure.

### limit concurrent migrations

One danger with incremental migrations is never finishing them. Every time you hit pause, you risk never hitting play again. Then your codebase gets permanently stuck in limbo.

However, you can intentionally limit how many migrations you take on. Deliberately holding off on starting that next migration until you've finished the one on your plate. We had a few migrations (forms, data tables, some UI elements) that we intentionally delayed until we finished Next.js.

Make sure not to stretch yourself too thin — we're only human after all.

### keep the handoffs simple

One initial mistake that I made was adding a fancy handoff between the React Router and Next portions of the app. I made a special `MigrationLink` component that knew which router it was jumping into based on the link. The goal was to allow seamless client-side routing, even when crossing across the router boundary.

That turned out to be a huge, buggy mess.

Eventually we stopped using `MigrationLink` in favor of just rendering a raw `a` tag every time we crossed the router boundary. This ended up being much simpler and less buggy, at the cost of a full-page refresh.

By simplifying the boundary between the two systems we made the migration much more stable and created less mess for ourselves to clean up later. And our customers didn't mind!

## final thoughts

This post is long overdue — while completing the migration was one thing, collecting my thoughts and sitting down to write an article took just as long as the migration! 😅

I'm very proud of the work that we did — I've seen a lot of "big bang" migrations over my career, but not as many incremental, pausable migrations. Since joining Sublime Security I've done a handful of these incremental migrations and I'm firmly becoming convinced that it's _the best way_ to ship large architectural changes.
