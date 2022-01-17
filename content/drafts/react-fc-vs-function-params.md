---
title: React.FC vs TypeScript function parameters
date: 2021-01-16
tags:
  - typescript
  - react
---

My strong preference is to use regular TS function parameters to type React components, rather than the `React.FC` (or its longer alias, `React.FunctionComponent`) that comes packaged with `React`.

At the end of the day, this is _mostly_ stylistic preference, but _even personal preferences have reasons behind them_. Those preferences may not be enough to quit a job or label a codebase as "terrible", but there's still benefits/tradeoffs to be considered.

Here's a few reasons why I prefer TS function params to `React.FC`:

## Implicit `children` prop

`React.FC` implicitly adds some extra properties to the component — notably `props.children`

```tsx
type Props = {
  className?: string
}

// `children` is allowed here, no type error!
const Example: React.FC<Props> = ({ className, children }) => {
  return <div className={className}>{children}</div>
}
```

When you use regular TypeScript function parameters, `children` now results in a TS error

```tsx
type Props = {
  className?: string
}

// 🚨 TypeError: Property 'children' does not exist on type 'Props'.ts(2339)
const Example = ({ className, children }: Props) => {
  return <div className={className}>{children}</div>
}
```

This can be fixed by explicitly typing the `children` prop

```tsx
import { ReactNode } from 'react'
type Props = {
  className?: string
  children: ReactNode
}

const Example = ({ className, children }: Props) => {
  return <div className={className}>{children}</div>
}
```

`children` _is_ another prop that's part of your component's interface. So having to be explicit about when it is/isn't allowed is a good thing.

## Shorter / less boilerplate

Ditching `React.FC` also happens to be less code when declaring components.

```tsx
// #1. TS params
const Comp1 = (props: Props) => <div />
// #2, TS params w/ explicit return type
const Comp2 = (props: Props): JSX.Element => <div />
// #3. React.FC
const Comp3: React.FC<Props> = props => <div />
```

**Less characters typed doesn't always equal more readability!!** However, in this case, I think option #1 (TS params + return type inference) is a much lighter syntax.

## Generic types

Depending on the type of projects you work on, you may or may not use generics heavily. However, if you're working on abstractions like component libraries and general utility components you'll probably need to know a bit about TS generics.

> If you're not familiar with TypeScript generics, check out [this overview](/typescript-generics) to learn more.

With the simpler TS parameter syntax, you can more easily create generic components that _infer_ their types based on the props provided.

```tsx
type Props<T> = {
  value: T
  onClick: (value: T) => void
}

const Button = <T extends any>({ value, onClick }: Props<T>) => {}

const Example = () => {
  return (
    <>
      <Button
        value="a"
        // type of `value` here is "string"
        onClick={value => console.log(value)}
      />
      <Button
        value={100}
        // type of `value` here is "number"
        onClick={value => console.log(value)}
      />
    </>
  )
}
```

This is extremely powerful since you can provide rock-solid type declarations while still having dynamic, abstract components. And it's significantly more difficult (impossible?) with `React.FC`

## Further reading

- Create React App's [decision](https://github.com/facebook/create-react-app/pull/8177) to move away from `React.FC`
- [Spotify ADR](https://backstage.io/docs/architecture-decisions/adrs-adr006) documenting moving away from `React.FC`
