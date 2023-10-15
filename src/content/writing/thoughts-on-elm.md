---
title: Some Thoughts on Elm
date: 2018-01-27
description: Elm is a functional compile-to-JavaScript language used for building robust, bug-resistant UIs.
image:
  url: 'elm-logo.png'
  alt: Elm Logo
tags:
  - functional-programming
---

I've been playing around with Elm off & on since mid-2017. In short, Elm and I have a complex relationship. I **love** Elm as a language &mdash; the syntax just kinda gets out of your way / lets you focus on what you're actually writing, and the compiler is a strict-yet-loving teacher. In addition, it's a huge relief to feel confident that _code that compiles will not throw runtime exceptions_.

However, at the same time the rest of the front-end ecosystem is sprinting onward (on many fronts!) & I'm using React at work, so it's difficult to devote any significant portion of my free time to playing around with Elm.

For those of you that aren't too familiar with Elm, it's a functional _compile-to-JavaScript_ language primarily used for building robust, bug-resistant UIs. Even though it's a completely different language than JavaScript, it's intended use case sets it in direct competition with other JavaScript frameworks, like React, Angular, & Vue. However, the differences are **huge** (for better or for worse) &mdash; Elm really is a completely different language!

Here's a couple of the key differences that I've experienced in the past few months of playing with Elm.

## Pros

### 1. Strong Typing

Elm is a _strongly-typed_ language, as opposed to JavaScript's _weak typing_. This means that all of the functions you declare have a _type signature_.

For example, if I wrote a function named `add` that takes two numbers & returns the added result, it would look like this.

#### JavaScript

```javascript
const add = (a, b) => a + b;
```

#### Elm

```haskell
add: Number -> Number -> Number
add a b =
  a + b
```

The key to strong typing comes in when I want to _ actually use_ the function. What happens if I forget to pass a number & instead pass strings as my parameters?

#### JavaScript

```javascript
const sum = add('a', 'b'); // returns the string "ab" 🤔
```

#### Elm

```haskell
sum = add "a" "b" -- throws a compiler error that's helpful! 🎉
```

The definition of the function in Elm includes a _type signature_ &mdash; indicating that the `add` function takes 2 numbers as parameters & returns a number as a result. Since the Elm compiler is usually smart enough to _infer_ your type signatures for you, you don't actually have to type this signature to get all the strongly-typed goodies. However, I found that as I played more with Elm, I found myself thinking about the type signatures of the functions that I was writing.

While JavaScript has had a few attempts to bring types to it (notably [Flow](https://flow.org/) & [TypeScript](https://www.typescriptlang.org/)), they both fall way short of Elm's type syntax & static type checking capabilities. In Elm, type declarations feel more like a first class citizen, encouraging developers to think about types more often.

### 2. Enforced Error Handling

In Elm, the compiler will get reaaaaaaallly angry if you don't handle potential points of failure in your application code.

For example, let's say you make a network request for some JSON. You're gonna operate on this JSON blob to render a blog post (like the one you're reading. Thanks 😜) You expect the JSON to look like this.

```json
{
	"title": "Some cool stuff about Elm",
	"body": "It's fun!",
	"author": "Benjamin Johnson",
	"dateCreated": "2018-01-25"
}
```

Easy peasy, right? You just get the JSON, and use the appropriate keys to render your blog post.

**Not so fast.**

What happens if the network went down in between when the user loaded your web page & when they made this request?
What happens if the JSON sends back an array of authors instead of a String?
What happens if `dateCreated` is `null`?

All of these are possiblities, especially if you're relying on a third-party API to deliver your content or you're working with other developers. And as much as you might want to say "That shouldn't happen. The backend engineers will let me know when they change the payload", the fact is that sometimes this type of stuff happens, even in the best of organizations.

In JavaScript, you _could_ (not saying you always do, & definitely not saying you should!) write the code to assume that the JSON response loads perfectly every time. You might not find out that your app failed until you get either an error saying `` Cannot read property `body` of `undefined`. `` and now you have to crawl through a debugger. Or you accidentally render the word `null` to your screen. Not the best UX by a long shot.

Elm forces you to write error-handling code for any operations that could _potentially fail_. Like network requests, or GeoLocation in the browser, or time-based operations (converting a string into a timestamp, for example). The main reason it's even capable of doing this is the static type system. When the compiler sees one of these "potentially failable" operations without error-handling code, it just refuses to compile until you write something to handle your errors.

Like I said, it's possible to write JavaScript that handles those potential errors, but it's really helpful to have the compiler on your side when you forget to write an error handler. I've seen a lot of bugs that happened because a developer forgot to handle an edge case or write code that was defensive to all points of failure.

### 3. Purely Functional

While a purely functional language is awesome, purity without some form of state management doesn't work well for UIs (we need to be able to respond to user input & state changes 😜). Elm keeps the language pure by managing state mutations inside of the Elm runtime. This method of managing state updates, more commonly known as "[The Elm Architecture](https://guide.elm-lang.org/architecture/)" is also quite common outside of the Elm community (React + Redux is a prime example).

Programming with this paradigm makes your UI a pure function of application state, meaning that it becomes incredibly simple to reason about portions of your app. _Everything in Elm is just a function_, and this tends to produce fairly readable, easy-to-reason-about code (a win in every way!).

## Cons

### 1. It's Hard To Beat The JavaScript Ecosystem

Say what you want about the "JavaScript fatigue" & having a new framework pop up each week: there's a _ton_ of competition in the front-end JS world, and this results in the best solutions rising to the top (usually).

Also, if you're playing with a new JS framework, it's usually not too difficult to get it to integrate with other portions of your favorite front-end stack (CSS/SCSS/LESS/CSS-in-JS, utility libs, etc.).

Intermingling with JavaScript code makes it much more difficult for Elm to type-check & deliver on its promise of "no runtime exceptions", so there's a process of communicating with JavaScript packages via "ports". However, communicating with a JS port can tend to be rather tedious, and I found myself writing a lot of my own logic for things that I likely would have used a utility for had I been working in JS.

I'm a big fan of staying minimal & only using 3rd-party dependencies when you need them, but a beautiful part of the JS ecosystem is that you can consume these packages on NPM when you need to move fast or when you want to isolate a specific concept you're learning (i.e. you only want to learn Vue as a framework so you use Vue Material or Bootstrap so you don't spend all of your precious time styling your components).

### 2. HTML Templating is Little Strange

Everything that I heard from the Elm community said that over time you get used to the HTML syntax, but it never really caught on for me. Here's a quick example of an Elm "template" (or "view" function).

```haskell
view model =
  div []
    [ button [ onClick Decrement ] [ text " - " ]
    , div [] [ text (toString model) ]
    , button [ onClick Increment ] [ text " + " ]
    ]
```

In the above example, each HTML element is a function that takes two arguments & is named after its' corresponding HTML tag. The first parameter contains a `List` (array) of all the HTML attributes to be applied to the tag. The second parameter contains an array of all the children of the element. The theory behind doing HTML templating this way is that _everything in Elm is simply a function_, but in practice, it just feels a tiny bit clunky to me.

Compare this to something like JSX, which feel much closer to raw HTML.

```jsx
const view = (model) => (
	<div>
		<button onClick={Decrement}> - </button>
		<div>{model}</div>
		<button onClick={Increment}> + </button>
	</div>
);
```

Or something like Vue's template syntax, which just builds on top of HTML

```html
<div>
	<button v-on:click="Decrement">-</button>
	<div>{{model}}</div>
	<button v-on:click="Increment">+</button>
</div>
```

In my opinion, both the React & Vue template syntaxes are quite a bit easier to read quickly, although they might not be quite as flexible & composable as Elm's HTML functions.

### 3. Lack of Support From a Major Company

On one hand, I hesitate to even make this a point against Elm as a language. The language should stand or fall on the way that it operates alone (in a perfect world...).

However, what I've found when talking to colleagues is that the primary concern about Elm is due to the fact that it's not supported by a major company. I would venture that the reason I haven't seen too many companies adopt it is that without the big \$\$\$ from a major company, the evolution & support of the language could potentially end abruptly.

The front-end landscape shifts pretty quickly, and keeping a language up-to-date is a full-time job (props to the people currently supporting Elm). Couple that with the fact the compile target (JavaScript) isn't staying still: in fact, JavaScript is moving at breakneck speed, gaining new features & browser APIs every year. Hopefully we will see Elm stick around & continue to keep up-to-date, as it's a really pleasant language to write in.

## Conclusion

I still think that Elm is 100% worth learning &mdash; if you have the time. It's valuable for the way that it forces you to think about programming. What happens if the JSON you recieve from a server doesn't have the key you expect? What if the user's browser fails to give you geolocation data? (Both have been sources of particularly tricky bugs in JS I've worked on in the past year or so).

Elm forces you to handle all your errors, dot all your "t's", cross all your "i's". Even if you don't start using it in the workplace, the benefits from stretching your mind & trying new paradigms are huge.

However, I also know & feel the sentiment of those with reservations towards Elm. It is a different, unfamiliar language to many working in the front-end ecosystem, and the tradeoffs that it makes in favor of type security & runtime safety do add a bit of complexity if you're trying to move quickly or operate with other parts of the front-end ecosystem.

Like what you read? Disagree? Feel free to [tweet at me](https://twitter.com/benjamminj) or connect with me on [LinkedIn](https://www.linkedin.com/in/benjamin-d-johnson/). Thanks for reading!
