---
title: Accessible icon buttons
date: 2020-09-02
tags:
  - front-end
  - accessibility
---

Accessibility matters. Especially in today's world where we perform essential aspects of our life online. Your bank, social media, email—all of it probably uses a web at some point or another.

I'm not gonna dive too much into [the business case for accessibility](https://www.w3.org/WAI/business-case) in this post, that's for another time. But suffice it to say that web accessibility is essential for any business operating a website. Two immediate reasons to care are the [legal risk](https://www.w3.org/WAI/business-case/#minimize-legal-risk) of inaccessible products and that [~15% of the population](https://www.worldbank.org/en/topic/disability#1) is considered to have some type of long-term disability.

Icon buttons are a fairly common UI pattern in web apps. It's funny hearing about young kids seeing a floppy disk and exclaiming "You 3d-printed a save icon!" But it certainly illustrates the fact that we're acquainted with icon buttons and the actions that they represent.

But what about people that can't see? How do they interact with icon buttons?

Here's a couple principles for building icon buttons that everyone can use, whether or not they can see them.

## Icon buttons should be _buttons_

First things first, icon buttons should be a `button` element under the hood. Most screen readers rely on good HTML markup to properly announce what types of interactions are possible when an element is focused.

Attaching `onclick` to a `div` may work if you're pointing and clicking in the app, but it makes interacting with the icon button impossible if you're on a screen reader. And while you can add other attributes to make the `div` accessible (like `aria-role`, `aria-label`, `tabindex`), it's not simple. And you're still not guaranteed it'll work properly in all screen readers 😭

**My recommendation: just use a `button` under the hood.**

## The problem: not enough information

Before we go too far into how to make **good icon buttons**, let's look at why it's so common to see inaccessible icon buttons in today's web applications.

Consider the follow non-icon button:

```html
<button>Click me!</button>
```

When focused on this button in a screen reader, I get the following message (this is using VoiceOver on macOS):

```
Click me!, button
```

The screen reader automatically picks up the **role** of the focused element (a "button") as well as the **label** on the button ("Click me!"). This is the same information that a sighted user has—they'll know it's a **button** from the way it's styled, and they'll know the **label** from the text directly inside the button.

However, when we have an icon-only button, we end up with a different screen reader experience. Consider the following markup:

```html
<button>
	<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
		<!-- "refresh" icon -->
	</svg>
</button>
```

A user that can see the button knows it's a "refresh" action, and based on their experiences with other applications they know that if they click this button, it'll refresh some data.

But what happens if we focus the button in a screen reader?

This is all that we get:

```
button
```

If we're only using a screen reader to interact with our button, we have no clue **what** it does. For all we know, this button could refresh our data, delete it, or do something entirely different! And that's not a great experience 😱

While we could always alter our designs to include **both** icons and text, sometimes that's not possible for a given design system. After all, a button with a simple icon has a nice, clean look.

Fortunately there's a few ways that we can make something usable for **both** our sighted **and** our screen reader users.

## Provide an invisible label for the screen reader

The most important thing that we can do to make our icon button accessible is provide a label that's only for the screen reader. If you're looking at the button, it'll be exactly like the inaccessible version, but if you focus the icon in a screen reader you'll get some text telling you what this button does.

There's 2 main ways to add this invisible button label.

### Option #1: use "screen reader only" text

The first way that we can provide text for the screen reader is by using **screen reader only** text.

Essentially, we add text inside the button as if it had the icon **and** text. Then, we use some CSS magic to hide the text from sight.

Here's the CSS that I usually use to make an HTML element invisible from sight, yet accessible to screen readers. It hides the content from sight and makes sure that the invisible content doesn't mess up any layouts either 🙌

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

It's important to note that we're **not** using `display: none` or `visibility: hidden` in our CSS. The reason for this is that applying either of these **removes** the element from the accessible DOM. Adding either one makes it impossible for a screen reader to "see" the content and read it out loud.

Once you've got a `.visually-hidden` class written up, making our icon button accessible looks like this:

```html
<button>
	<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
		<!-- "refresh" icon -->
	</svg>

	<span class="visually-hidden">Refresh</span>
</button>
```

All we need to add is that `span` with `Refresh` inside of it. Applying the `.visually-hidden` class makes the text invisible, so it looks exactly like the icon button from before.

Finally, when we focus the button in a screen reader, we get the following:

```
Refresh, button
```

### Option #2: use `aria-label`

An alternative approach to using a `.visually-hidden` CSS class is leveraging an `aria-label` on the `button` element itself. This overrides the default "label" that the screen reader would've read with the `aria-label` value:

```html
<button aria-label="Refresh">
	<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
		<!-- "refresh" icon -->
	</svg>
</button>
```

This achieves the exact same screen reader output as the example with visually hidden text (at least in VoiceOver for macOS it does).

## Hide the icon from the screen reader

Another common practice when writing icon buttons is to add `aria-hidden="true"` to the icon itself. While I haven't any issues with VoiceOver for macOS reading the contents of SVGs, I think there's some screen readers that **do** announce the icon inside.

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

`aria-hidden="true"` hides the icon from the screen reader—the inverse of how `.visually-hidden` made the text invisible to sighted users.

## 🔥 Hot tip: require labels in icon button components

Chances are you're using a front-end framework to build your web applications.

At the same time, you car about creating accessible buttons—you don't want to alienate a large amount of potential customers by giving them something that isn't usable.

One of the cool techniques I've used in a number of codebases is leveraging **components** to encourage accessible patterns. We can make accessibility the "default state" just by the way we structure our component APIs.

**Strong, accessible components make it easy to do the "right" thing" and difficult to do the "wrong" thing.**

For example, here's a way we could build an accessible icon button in React and TypeScript. I'm using the `Fab` nomenclature (**F**loating **A**ction **B**utton) from [Google's Material Design](https://material.io/components/buttons-floating-action-button).

```tsx
interface FabProps {
	// Accessibility-only icon label
	label: string;
	// Markup for the icon itself
	children: ReactNode;
}

const Fab = (props: FabProps) => {
	return (
		<button {...props} aria-label={props.label} className="fab">
			{props.children}
		</button>
	);
};
```

You'll notice in `FabProps` that `label` is **required** on the component. If it were optional we would have typed it with `label?: string`.

This means that if you forget to provide a `label`, you'll get a compile-time error. You'll be **forced** to put _something_ (anything!) as `label`, guaranteeing that screen reader users get an equally usable experience.

I've used this approach quite a bit and it works great most of the time. Whenever you forget to add an accessible label, that compiler error is usually enough to remind you to go add screen reader text.

That said, there's still one edge case where we can sneak around the type system and make an inaccessible icon button:

```tsx
<Fab label="">
	<svg>{/* svg content */}</svg>
</Fab>
```

If we provide an empty label, we get around the type error, but we've still made an icon button that doesn't work on screen readers 😱

This case can be guarded against with thorough pull request reviews as well as a team that's educated on accessible HTML. If you're used to seeing `label` with a value, seeing `label=""` is a huge red flag!

But if you want to protect against this case **in the code itself**, you'll need to do some type of run-time checking. For instance, we could do augment our `Fab` to guard against any `label` prop that's empty.

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
    `);
	}

	return (
		<button {...props} aria-label={props.label} className="fab">
			{props.children}
		</button>
	);
};
```

This adds a **dev-only error** so that using the component with `label=""` creates a warning for the developer, but doesn't crash the app or anything. We've also made the error message educational and actionable—you know exactly what needs to be done to get rid of the message.

As an added benefit `console.error` is enough to fail unit tests (if you're using Jest, at least)!

> **Note:** _If you're not using TypeScript this approach provides a similar level of
> developer protection against missing `label` props. Depending on your tooling
> you might also be able to strip out the dev warnings for your production build
> as well (that way you don't bloat your JS bundles)._

## tl;dr

Icon buttons should have an accessible label so screen readers can interact with them. The easiest ways to do this are visually hidden text or an `aria-label` attribute.

---

## Additional resources

- [Accessible Icon Buttons](https://www.sarasoueidan.com/blog/accessible-icon-buttons/) by Sara Soueidan.
- [Accessible Icon Buttons](https://egghead.io/lessons/aria-accessible-icon-buttons) Egghead course taught by [Marcy Sutton](https://twitter.com/marcysutton)
- [Deque University "button name" rule](https://dequeuniversity.com/rules/axe/3.2/button-name).
  If you're using [axe accessibility audit](https://www.deque.com/axe/) to check your markup you'll be linked to this page every time you have inaccessible button text.
