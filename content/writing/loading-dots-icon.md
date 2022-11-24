---
title: Loading dots icon
description: AKA "thinking bubbles". Created with React, Tailwind, and TS
date: 2022-04-10
tags:
  - recipes
  - react
  - typescript
  - front-end
  - css
---

```tsx
// loading-dots.tsx

// Note: these types can commonly go in a central file of utility types for
// all SVG icons, or can be baked into your component lib if you've made one for your
// icons
export type IconSize = 'sm' | 'base' | 'lg';

export type SvgIconProps = {
	size?: IconSize;
};

const iconSizeClasses = {
	sm: 'h-4',
	base: 'h-6',
	lg: 'h-6'
};

export const LoadingDots = ({
	size = 'base',
	title = 'Loading'
}: SvgIconProps & { title?: string }) => {
	const className = iconSizeClasses[size];
	return (
		<svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg" className={className} role="img">
			<title>{title}</title>
			<g className="fill-current">
				<circle
					cx="12"
					cy="15"
					r="6"
					className="animate-pulse animation-delay-[0ms] animation-duration-[1.5s] opacity-0"
				/>
				<circle
					cx="30"
					cy="15"
					r="6"
					className="animate-pulse animation-delay-[200ms] animation-duration-[1.5s] opacity-0"
				/>
				<circle
					cx="48"
					cy="15"
					r="6"
					className="animate-pulse animation-delay-[400ms] animation-duration-[1.5s] opacity-0"
				/>
			</g>
		</svg>
	);
};
```

And in order to get those `animation-duration` and `animation-delay` classes, we need to do a tiny bit of tinkering with the `tailwind.config.js`

```js
// tailwind.config.js

const plugin = require('tailwindcss/plugin');

module.exports = {
	// theme, content, etc.
	plugins: [
		plugin(({ addUtilities, matchUtilities, theme }) => {
			matchUtilities(
				{
					'animation-duration': (value) => ({
						animationDuration: value
					})
				},
				{ values: theme('transitionDuration') }
			);

			matchUtilities(
				{
					'animation-delay': (value) => ({
						animationDelay: value
					})
				},
				{ values: theme('transitionDelay') }
			);
		})
	]
};
```

## Context

This component allows you to make the fancy "loading dots" or "thinking bubbles" component. I commonly find myself reaching for an icon like this, yet it's one that's not as common in icon libraries.

I'm often been using [TailwindCSS](https://tailwindcss.com/) to style my apps, so I included Tailwind classes in this snippet instead of the raw CSS.

## How it works

With a bit of custom SVG we can create this icon from scratch without having to whip out a design tool. Since this icon does not have complex paths or lines, we can use the SVG `circle` element to get our three dots, and the rest is fiddling with the `viewBox`, `cx`, `cy`, and `r` to get the circles exactly where we'd like them.

In order for screen readers to read the icon properly, we also need to add a `title` attribute. Since this is commonly used as a standalone loading indicator `title` is included in the icon props.

## Usage

```tsx
// All the HTML attributes permitted on `button`, as well as a `loading` flag
type ButtonProps = JSX.IntrinsicElements['button'] & { loading?: boolean };

const Button = ({ loading = false }: ButtonProps) => {
	return <button>{loading ? <LoadingDots /> : 'Save'}</button>;
};
```
