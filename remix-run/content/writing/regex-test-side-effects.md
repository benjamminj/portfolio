---
title: Using "regex.test" with the "global" flag
date: 2020-07-23
draft: false
tags:
  - javascript
  - regex
---

I recently came up on this JavaScript quirk while debugging some form input validators that were failing intermittently. When I finally found the source of the bug, I was surprised at this behavior from the seemingly innocent [Regex.prototype.test](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function.

If you're not familiar with `Regex.prototype.test` it seems somewhat straightforward: take a regular expression (regex) in JavaScript and plug a string into its `test` method. If the string matches the regex, the method returns `true`. Otherwise it returns `false`.

There's one caveat.

_If the regex being tested contains the global flag, `regex.test(str)` relies on more than just the input `str`._

## So what's going on?

To put it in functional programming terms—`regex.test` is not a pure function if you use the `g` flag on your regex.

Here's an example of this behavior in action.

```js
// note that we're using the `g` flag
const regex = /test/g

// returns true
regex.test('test123')

// returns false 😭
regex.test('test123')

// returns true
regex.test('test123')
```

Why does this happen? Is it that the JavaScript gods are fickle and have chosen to punish us mortal programmers for not choosing a language like Java? Is it baked into the language so that we can have one more piece of trivia to stump candidates in interviews? (Don't do this btw. Interviews are about seeing whether someone is a good fit for your company, not about proving you're smarter than them).

The reason that this happens is because JavaScript regexes contain a [lastIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex) property that tells `regex.test` and [regex.exec](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec) where to start searching the input string.

Both methods set the `lastIndex` value on the regex to the _last matched index_. But they only do this if the regex has the `g` flag. If the end of the string is reached without finding any matches, `lastIndex` is set to `0`.

Here's the same example from before, but also showing the value of `lastIndex`:

```js
// note that we're using the `g` flag on the
const regex = /test/g
console.log(regex.lastIndex) // 0

// returns true
regex.test('test123')
console.log(regex.lastIndex) // 4

// returns false 😭
regex.test('test123')
console.log(regex.lastIndex) // 0

// returns true
regex.test('test123')
console.log(regex.lastIndex) // 4
```

## How do we work around this quirk?

There's a couple ways that we can write our application to be resilient against bugs stemming from this JavaScript gotcha.

Certainly the simplest way to get around this issue is to remember that `regex.test` behaves like this if the `g` flag exists and not use it on regexes that have the `g` flag.

Especially if the primary usage of the regex is testing strings, we probably don't need the `g` flag since we can either just test for the existence of a match (no `g` flag) or that the string starts/ends how we expect (using `^`, `$`, [groups, and ranges](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Groups_and_Ranges)).

We could have avoided the entire problem if we just removed the `g` flag from the regex itself.

```js
const regex = /test/

// returns true
regex.test('test123')

// returns true 🎉
regex.test('test123')
```

Personally, I think this is the ideal solution—we're using the method as intended, and our regexes reflect the way that we intend them to be used.

Sometimes this isn't perfectly possible though. Perhaps you're using the regex in another context where it needs to have the `g` flag. Perhaps you're not entirely sure _which_ regex will be passed in to your code and you just want to make it more predictable.

If the regex absolutely _has_ to have the `g` flag, we can provide some much-needed purity to our code by using the slightly less ergonomic [String.prototype.match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match) method and casting it into a `Boolean`.

```js
// note that we're using the `g` flag again
const regex = /test/g
const str = 'test123'

// returns true
Boolean(str.match(regex))

// returns true 🎉
Boolean(str.match(regex))
```

It's not as ergonomic, but it still provides the same `boolean` result. Since `string.match` returns an array of matches and `null` if there's no matches in the string, we can turn this into a `boolean` just by wrapping it in the `Boolean` function to convert it.

## tl;dr

_JavaScript's `regex.test(str)` mutates a `lastIndex` property. The next time you call `regex.test` it starts testing `str` from `lastIndex` instead of the beginning. This means that multiple calls to `regex.test` might return different results, even if they were called with the same arguments._

---

Feel free to hit me up on my [Twitter](https://twitter.com/benjamminj) or [LinkedIn](https://www.linkedin.com/in/benjamin-d-johnson/) with any thoughts or if you enjoyed this article. If you found a typo or have some feedback for improvement also feel free to [submit a pull request](https://github.com/benjamminj/portfolio). Thanks for reading! 🎉
