# Heading Level 1

## Heading Level 2

This is a paragraph of text following the h2. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit?

### Heading Level 3

This is a paragraph of text following the h3. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit?

#### Heading Level 4

This is a paragraph of text following the h4. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit?

##### Heading Level 5

This is a paragraph of text following the h5. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit?

###### Heading Level 6

This is a paragraph of text following the h6. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit?

---

## Paragraphs

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit?

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit?

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit?

---

## Text Styling

Here is a paragraph that contains **a bit of bold text to show what that looks like**. Then for a little bit do regular to separate it from _the italics portion_. Lastly, [here's a link]() to nowhere.

---

## Lists

For now the horizontal rhythm of these two list types are different because that's what feels right...rarely would you see a bulletted list immediately following a numbered list though 😎

### Ordered

1. Item
1. Item
1. Item
1. Item
   1. Inner
   2. Inner
1. Item
1. Item
1. Item
1. Item

### Unordered

- Item
  - Sublisted item
  - Sublisted item
  - Sublisted item
- Item
- Item
- Item
- Item

---

## BlockQuote

In paragraphs for context.

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit?

> Here is the first line of the blockquote, a really long line that should wrap around on most screens
>
> And another line to see a little bigger
>
> Lastly, a third line

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit?

---

## Code/Preformatted

Here's a paragraph to show what `inline code blocks` look like...they won't be syntax highlighted, which is a good thing.

```
and this is a code block w/o highlighting...
```

### JavaScript

```javascript
// this has a comment above it.
const greeting = (name) => `Hello ${name}`;

console.log(greeting('world'));
```

### JSX

```jsx
const Button = (props) => (
	<button
		onClick={() => {
			alert('hello');
		}}
	>
		welcome!
	</button>
);
```

### HTML

In paragraphs for context.

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit.

```html
<div class="sample">
	<button class="button">click me!</button>
</div>
```

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit?

### CSS

```css
:root {
	--color-primary: #333;
}

.selector {
	color: var(--color-primary);
	background: papayawhip;
	mask-image: url('https://localhost:3000/image.png');
}
```

### Diff

```diff
nothing changed
+ added
- deleted
```

## Callouts

> [!NOTE]
>
> This is a note. You can use this to talk about quick asides and things that are somewhat tangential to the main point.
>
> You can make it as long as you want, even multiple paragraphs!

> [!TIP]
>
> This is a tip. You can use it for basic helper tips that would clutter up the main
> body of text

> [!IMPORTANT]
>
> **This is an important callout.** Use it to call attention to things that shouldn't be ignored or are...well...important.

> [!WARNING]
>
> This is a warning. Use it to highlight things that probably aren't correct anymore, or that you probably shouldn't do.

> [!CAUTION]
>
> This is a caution callout. Use this for things that are actually really bad and you want to call attention to it.
