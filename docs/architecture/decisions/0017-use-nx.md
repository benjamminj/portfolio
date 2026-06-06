# 17. use-nx

Date: 2026-06-06

## Status

Accepted

Relates to [16. use-pnpm-workspaces](0016-use-pnpm-workspaces.md)

## Context

Part 2 of the shift to the monorepo. In ADR [16](0016-use-pnpm-workspaces.md) we shifted PNPM to be set up as a monorepo. This sets up tooling to aid as the monorepo grows.

The main alternative would have been [Turborepo](https://turborepo.dev/) — it's well-suited to smaller monorepos with a smaller learning curve. I doubt this repo will ever grow large enough for it to significantly matter which one I go with. But a couple reasons behind NX:

- I'm not (currently) using it at work, although I'd like to in the medium- or near-term future. This serves as a simple way to evaluate on my own.
- I did come up on some challenges with Turborepo when it comes to code generation. Seems like NX has a better "scale down" and "scale up" story.

## Decision

Use NX to manage monorepo operations.

## Consequences

- Possible there's a small amount of vendor lock-in if I start using features related to NX cloud.
- As I split packages out into the monorepo I'd expect builds + deploys + test runs to go faster.
