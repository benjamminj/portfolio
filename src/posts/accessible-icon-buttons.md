---
title: Icon buttons and accessibility
date: 2020-09-01
draft: true
tags:
  - front-end
  - accessibility
---

Accessibility matters. Especially in today's world where we perform essential aspects of our life online. Your bank, social media, email—all of it probably uses a web at some point or another.

I'm not gonna dive too much into the case **for** accessibility in this post, that's for another time. But suffice it to say that web accessibility is incredibly important for any business—not only due to [legal risks](https://www.w3.org/WAI/business-case/#minimize-legal-risk), but because roughly [15% of the population](https://www.worldbank.org/en/topic/disability#1) is considered to have some disability.

Icon buttons are a fairly common UI pattern in web apps. We've all heard the joke of young kids seeing a floppy disk and saying something like "You have a real-life save icon!" Over time, we've become familiar with all of these visual icons and the actions that they represent.

But what about people that can't see? How do they interact with icon buttons?

Here's a couple principles for building icon buttons that everyone can use, whether or not they can see them.

## Icon buttons should be _buttons_

First things first, icon buttons should be a `button` element under the hood. Most screen readers rely on good HTML markup to properly announce what types of interactions are possible when an element is focused.

Attaching `onclick` to a `div` may work if you're pointing and clicking in the app, but it makes interacting with the icon button impossible if you're on a screen reader. And while you can add other attributes to make the `div` accessible (like `aria-role`, `aria-label`, `tabindex`), it's not very easy. And you're still not guaranteed it'll work properly in all screen readers.

**My recommendation: just use a `button` under the hood.**

## Provide a label for the screen reader

My favorite way to do this is to use _visually hidden_ text _inside_ of the button itself.

Consider the follow non-icon button

```html
<button>
  Click me!
</button>
```

When focused on this button in a screen reader, I get the following message (this is using VoiceOver on macOS):

```
Click me!, button
```

The screen reader automatically picks up the _role_ of the focused element (a "button") as well as the _label_ on the button ("Click me!"). This is the same information that a sighted user has—they'll know it's a **button** from the way it's styled, and they'll know the **label** from the text directly inside the button.

However, when we have an icon-only button, we end up with a different screen reader experience. Consider the following markup:

```html
<button>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <!-- "refresh" icon -->
  </svg>
</button>
```

A user with full visual abilities can see that we're on a button with an refresh icon, and based on their experiences with other applications likely knows that if they click this button, it'll refresh some data.

But what happens if we focus the button in a screen reader?

This is all that we get:

```
button
```

If we're only using a screen reader to interact, we have no clue _what_ this button does. And that's not a great experience for anyone using a screen reader.

While we could always alter our designs to include **both** icons and text, sometimes that's not possible due to design constraints. After all, a button with a simple icon has a nice, clean look. Fortunately there's a couple ways that we can provide an optimal experience for **both** our sighted **and** our screen reader users.

### Option #1: use "screen reader only" text

The first way that we can provide text for the screen reader is by using **screen reader only** text.

Basically, we can add text inside the button as if it was a button with both the text and the icon. Then, we use some CSS to hide the text from users that can see the button.

Here's the CSS that I usually use to make an HTML element visually hidden.

```css
.visually-hidden {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
}
```

_Note: if you're using [Bootstrap](https://getbootstrap.com/) you can use the `.sr-only` CSS class to create visually hidden content._

It's important to note that we're **not** using `display: none` or `visibility: hidden` to hide the content. The reason for this is that applying either of these **removes** the element from the accessible DOM—meaning the screen reader won't even "see" the DOM element.

This CSS snippet hides the content visually and makes sure that it doesn't mess up any of the visual layouts. Once you've got a `.visually-hidden` class written up, making our icon button accessible looks like this:

```html
<button>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <!-- "refresh" icon -->
  </svg>

  <span class="visually-hidden">Refresh</span>
</button>
```

All we need to add inside our button is that `span` with `Click me!` inside of it. Applying the `visually-hidden` class makes the text invisible, so it looks exactly like the icon button from before. Finally, when we focus the button in a screen reader, we get the following:

```
Refresh, button
```

### Option #2: use `aria-label`

An alternative approach to using a `visually-hidden` CSS class is leveraging an `aria-label` on the `button` element. This essentially overrides the default "label" that the screen reader would've read with whatever content you include:

```html
<button aria-label="Refresh">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <!-- "refresh" icon -->
  </svg>
</button>
```

This achieves the exact same screen reader output as the example with visually hidden text (at least in VoiceOver for macOS it does).

## Hide the icon from the screen reader

Another common practice when writing icon buttons is to add `aria-hidden` to the icon itself. While I haven't seen VoiceOver for macOS reading SVGs inside icon buttons, I think there's some screen readers that **do** announce that there's an icon inside.

```html
<button>
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <!-- "refresh" icon -->
  </svg>

  <span class="visually-hidden">Refresh</span>
</button>
```

## 🔥 Hot tip: require labels in icon button components

Chances are you're using something like React / Vue / Angular to build the components making up your front-end applications.

At the same time, you know accessible buttons is incredibly important—you don't want to alienate a large amount of potential customers by giving them an app that isn't usable.

One of the cool "tricks" I've used in a number of codebases is leveraging **components** to make accessible patterns the default. We can set ourselves up for accessible apps just by the way we structure our component APIs.

**Good, accessible components make it easy to do the "right" thing and difficult to do the "wrong" thing.**

For example, here's a way we could build an accessible icon button in React and TypeScript. I'm using the `Fab` nomenclature (**F**loating **A**ction **B**utton) from [Google's Material Design](https://material.io/components/buttons-floating-action-button).

```tsx
interface FabProps {
  // Accessible icon label
  label: string
  // Markup for the icon itself
  children: ReactNode
}

const Fab = (props: FabProps) => {
  return (
    <button {...props} aria-label={props.label} className="fab">
      {props.children}
    </button>
  )
}
```

You'll notice in the type definitions that `label` is a **required** prop on the component. This means that if you forget to provide a `label` prop, you'll get a compile-time error. You'll be **forced** to put _something_ as the `label` prop, thus making sure that screen reader users get an equal experience to sighted users.

I've used this approach quite a bit and it works nicely for most use cases. Whenever you forget to add an accessible label, that compiler error is enough to say "Oh yeah—I should add this so that everyone can use my ap

However, there's still one edge case where we can sneak around the type system and make an inaccessible icon button:

```tsx
<Fab label="">
  <svg>{/* svg content */}</svg>
</Fab>
```

If we provide an empty label, we get around the type error, but we've still made an icon button that doesn't work on screen readers 😱

This case can mostly be protected against with a good pull request process and having a team that cares about accessibility. But if you want to protect against this case _in the code itself_, you'll need to do some type of run-time checking. For instance, we could do augment our `Fab` to guard against any `label` prop that's empty.

```tsx
const Fab = (props: FabProps) => {
  // Only have the error if NODE_ENV === 'development' and label is empty.
  // This global __DEV__ variable assumes a setup like
  // https://github.com/formium/tsdx#advanced-babel-plugin-dev-expressions
  if (__DEV__ && !props.label) {
    // If you want to be more aggressive with the error, you can actually
    // `throw` an error here.
    console.error(`
			You have not provided an accessible label for this icon button. 
			Please add some content to the "label" prop to remove this error.
			
			For further reading about providing accessible labels, please refer to 
			https://dequeuniversity.com/rules/axe/3.2/button-name.
		`)
  }

  return (
    <button {...props} aria-label={props.label} className="fab">
      {props.children}
    </button>
  )
}
```

This adds a **dev-only error** so that using the component with `label=""` creates a warning for the developer, but doesn't crash the app or anything. If you're using Jest `console.error` is enough to fail tests too, so that helps guard against this inaccessible pattern!

_Note: if you're not using TypeScript this option will provide the same type of developer protection against missing `label` props. Depending on your tooling you might be able to strip out the dev warnings for your production build as well (that way you don't bloat your JS bundles)._

## tl;dr

Icon buttons should have an accessible label so screen readers can interact with them. The easiest ways to do this are visually hidden text or an `aria-label` attribute.
