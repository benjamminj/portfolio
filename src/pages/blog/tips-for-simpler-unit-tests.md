---
title: Keeping Unit Tests Simple for React With Jest
draft: true
date: 2018-02-26
---

- arrange - act - assert
  - framed within the context of shallow rendering
- don't go crazy with the mocking
- test your business / UI logic, not the framework
  - Often you don't have to go overboard and simulate events / setup redux store, since your logic that makes your app unique should be removed from the dependency.
- don't abstract / obfuscate your test setup logic
  - it's ok to do some utilities though for a few cases, just don't go overboard.