---
title: Web Workers
date: 2017-12-26
example: counter
---

## What Are Web Workers?

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Why Should I Care About Web Workers?

### Blocking vs. Non-Blocking

```javascript
const arr = [1, 2, 3, 4, 5]

for (let i = 0; i < arr.length; i++) {
  console.log(i)
}
```