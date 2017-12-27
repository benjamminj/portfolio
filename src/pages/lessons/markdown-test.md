---
title: Markdown Test Page
---

## Heading Level 2

### Heading Level 3

#### Heading Level 4

##### Heading Level 5

###### Heading Level 6

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

>Here is the first line of the blockquote, a really long line that should wrap around on most screens
>
>And another line to see a little bigger
>
>Lastly, a third line

Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet obcaecati ex eos at deserunt sed animi, ea beatae officiis impedit?


---

## Code/Preformatted

Here's a paragraph to show what `inline code blocks` look like...they won't be syntax highlighted, which is a good thing.

### JavaScript

```javascript
const greeting = name => `Hello ${name}`

console.log(greeting('world'))
```

### JSX

```jsx
const Button = props => (
  <button
    onClick={() => {
      alert('hello')
    }}
  >
    welcome!
  </button>
)
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
}
```