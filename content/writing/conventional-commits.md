---
title: Conventional Commits
date: 2022-11-23
tags:
  - teamwork
  - software-engineering
  - cheat-sheets
---

## Why?

Conventional commits are useful for a number of reasons, but the most useful to me are:

1. You can succinctly note the nature of the change you are making in each commit.
2. You can auto-generate semantic versions based on the prefix + breaking change notation.

The first is useful regardless of whether other engineers follow conventional commit format, while the second requires you to set up automation and enforce all commits to be in the conventional format.

I find myself using the conventional commit prefixes fairly frequently, and am always looking them up, so that's why I wrote this cheat sheet. 😎

Here's some of the most common ones.

## Commit prefixes

| prefix      | meaning                                                       |
| ----------- | ------------------------------------------------------------- |
| `feat:`     | A new product feature                                         |
| `fix:`      | Fixing a bug                                                  |
| `refactor:` | Refactoring code, no new features                             |
| `docs:`     | Updating documentation                                        |
| `style:`    | Formatting changes to code only                               |
| `test:`     | Changing / fixing tests                                       |
| `ci:`       | Changes to CI builds                                          |
| `build:`    | Changes to build system, deployment, etc                      |
| `chore:`    | Cleanup, renaming, organizing, etc. Catch-all for small tasks |

## Conventional commit format

In general, conventional commits use the following structure:

```
{prefix}: {description}

fix: reorder modal z-index
```

Optionally, you can include a "scope" of your change:

```
{prefix}({scope}): {description}
fix(homepage): reorder modal z-index
```

Finally, if your commit introduces a breaking change, you can include an exclamation point:

```
{prefix}!: {description}
feat!: new routing API
```

## Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/#specification)
