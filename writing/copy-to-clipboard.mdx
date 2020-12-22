---
title: copyToClipboard
subtitle: Function that copies an input value to the system clipboard
date: 2020-12-22
tags:
  - typescript
  - recipes
---

```ts
export const copyToClipboard = (input: string) => {
  const $el = document.createElement('textarea')
  $el.value = input

  // Make sure we hide the element from sight
  $el.setAttribute('readonly', '')
  $el.style.position = 'absolute'
  $el.style.left = '-9999px'

  document.body.appendChild($el)

  // Select the input, this is the same as dragging your cursor over it.
  $el.select()
  // Copy the current selection to the clipboard
  document.execCommand('copy')

  // Finally, clean up after ourselves
  document.body.removeChild($el)
}
```

## Context

Surprisingly, copying arbitrary input to the system clipboard (`CMD + C` / `CTRL + C`) isn't provided by default in the DOM.

As a result we need to create our own function to create those `Copy to clipboard` buttons you see all over the place.

This is the exact same version of the `copyToClipboard` function that's used on this website for the code snippets.

## How it works

Under the hood, `copyToClipboard` creates an invisible `textarea` and inserts it into the DOM. We can then use _this element_ to execute the DOM commands to select the text and copy to clipboard.

One consideration is that selecting the text of a hidden `textarea` might focus the document, which could potentially be problematic for screen reader users.

## Usage

```ts
// This could be anything—an API token, code sample, etc.
const inputContents = '1234-5678-91011'

// Then you just pass your input into the function! You can attach it to
// a click event like you normally would in raw JS / your framework of choice.
copyToClipboard(inputContents)
```

## Tests

This function's actually a little nasty to test in `jest` since JSDOM doesn't support `document.execCommand`. So you can test that the clipboard command was executed, but you can't _actually_ access clipboard contents in JSOM.

```ts
import { copyToClipboard } from '../copyToClipboard'

const originalExecCommand = document.execCommand

beforeEach(() => {
  document.execCommand = jest.fn()
})

afterEach(() => {
  document.execCommand = originalExecCommand
})

test("should copy the input to the user's clipboard", () => {
  copyToClipboard('test clipboard')
  // We can't test the actual clipboard contents, but we can test that
  // the `execCommand` function was properly fired.
  expect(document.execCommand).toHaveBeenCalledTimes(1)
  expect(document.execCommand).toHaveBeenCalledWith('copy')
})
```
