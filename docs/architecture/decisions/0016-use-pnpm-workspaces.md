# 16. use-pnpm-workspaces

Date: 2026-06-06

## Status

Accepted

## Context

Historically, I've avoided making this repo a monorepo because I thought it was overkill for a simple personal website. It's possible that it's still overkill. However, the guiding motivations behind this decision:

- I'm getting an itch to rewrite in Svelte 5 / SvelteKit again. Full rewrites like this are a bit easier if you can just have 2 apps and you port the code from one to the other. My website isn't so large that it needs a true in-place incremental migration but I also only get tiny bursts to work on it so being able to ship both for a while would be helpful.
- I do sometimes have experiments I want to create, either in React or other frameworks. Maybe a separate repo would be the best thing to do but setting one up takes time and sometimes it's nicer to just have a spot that's already ready to go. In a single-package workspace this muddles ups the primary app (website), but in a monorepo I can just spin out another package.
- Publishing? I guess if there's anything generally useful in the packages I can publish it for external usage. That's a larger endeavor but one that becomes _possible_ with a single monorepo. I don't expect that I'll be having many (any) outside contributions so I'm not optimizing for that.
- Tooling. We use a monorepo at work but things move slower there, and using it here gives me opportunities to try things that may not work. I don't usually get the same level of experimentation luxury at $dayjob.

## Decision

Use PNPM workspaces to make this repo a monorepo.

## Consequences

- Migrations should become easier, especially when rewriting an entire stack.
- Builds + CI might become faster if we can cache / use monorepo tooling / selective test runs.
- Speaking of it, we'll probably introduce monorepo tooling like NX or Turborepo in a future PR / ADR.
- Some things get more complex, like package dependencies, re-building, hot reloading, etc.
