---
title: Setting Up a Simple Web Worker With Ract
date: 2017-12-26
draft: true
---

Web Workers aren't exactly new citizens of the web platform, although I feel like to me until recently they've been hiding in a corner, used by the magical front-end performance fanatics but unknown to the rest of us. However, spinning up a web worker isn't all that complex and the gains can be tremendous, especially for some of those more computation-intensive scripts that you may need to run.

If you're not too familiar with _what_ web workers are, they're a browser API that allows you to execute a script separate from the main JavaScript thread. This is incredibly valuable as JavaScript is a _single-threaded_ programming language, and any intensive scripts run from the main thread can end up blocking user interaction (not a great UX when you can't click any buttons 😜).

If you wanna do a quick refresh on web workers or simply find a more ocmprehensive article about what they are, I recommend you check out Kyle Simpson's chapter on [Program Performance](https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch5.md#web-workers) in You Don't Know JS. In addition, the [MDN docs on using web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) are quite in-depth (props to the team at Mozilla for maintianing top-notch documentation for...well...everything on the web). Last but not least, there's a great article on [FreeCodeCamp's blog](https://medium.freecodecamp.org/how-web-workers-can-help-with-consistent-asynchronous-tasks-in-javascript-cd6d728fa4ee) regarding usage of web workers.

## Step 1. A Simple Counter Component

### Commands to Run

First, let's bootstrap our app. I'm using `gatsby-cli`, so we'll need to install that globally (`npm install -g gatsby-cli`). I was using [create-react-app](https://github.com/facebookincubator/create-react-app) at first, but they currently don't let you make use custom webpack loaders without ejecting, and frankly I don't want to dig through all of that configuration. 😜 We'll get into exactly _why_ we need the ability to load with custom loaders in a little bit. 

Once you're up and running with `gatsby-cli`, run the following commands to get the whole app bootstrapped.

```bash
gatsby new example-web-workers

npm cd example-web-workers
```

And then let's install that custom webpack loader that we're gonna need in a little bit (may as well get all the installations out of the way at the beginning).

```bash
npm i -D worker-loader
```

And with one final script, we're ready to start our development environment. 🎉🎉🎉

```bash
npm run develop

# once finished, open your browser of choice to http://localhost:8000
```

You should see something like this

![Picture of Gatsby Default HomePage](http://res.cloudinary.com/da2iq7dge/image/upload/v1515374563/gatsby-boilerrplate-home-2018_ekiock.png)

I edited the header text / color of mine, so that's why you're gonna see a little different stuff from screenshots in the future. Feel free to hack away at the header if you'd like, or just simply continue, it's not gonna affect anything else.

### The Glue: A Basic Component

We're gonna be writing a basic counter component to illustrate using web workers. Now, it's important to note that this is probably not a "real-world" use-case for web workers, but rather a simple example to get us familiar with using them. I find it extremely helpful to reduce the cognitive load when I'm learning something new, so not having to deal with complex business logic when learning a new browser API is crucial.

With that being said, let's modify our `src/pages/index.js` to contain the wrapper code for the counter

```jsx
import React, { Component } from 'react'

class WebWorkerCounter extends Component {
  state = {
    count: 0
  }

  render() {
    const { state } = this

    return (
      <div>
        <h1>{state.count}</h1>

        <button>+1</button>
        <button>-1</button>
        <button>Clear</button>
      </div>
    )
  }
}

export default WebWorkerCounter
```

Overall, it's pretty simple, we're gonna be building a counter that displays a number, & allows you to increase / decrease that number by clicking on the appropriate button. Clicking the "clear" button will reset out counter to 0. For right now the counter buttons don't do anything, that's gonna come in the next step.

## Step 2: Using a Web Worker to communicate with our Counter

First off need to import the worker file. Create worker file called `counter-worker.js` inside of your `src` directory. Then add this line to the top of your `App.js` file

Make note about using the `worker-loader` we installed at the beginning. This allows us to bypass the configurating webpack step & use this specific loader in this single instance.

```jsx
const Worker = require('worker-loader!./counter-worker.js')
```

This will generate the needed file path to the worker, since the web worker needs to bundled _separately_ from the main JS bundles. However, this won't instantiate the worker, to do that we will need to add the following lines of code to our component

```jsx
// inside of WebWorkerCounter component
componentWillMount() {
  this.worker = new Worker()
}

render() {
  // ...render
}
```

This will spin up a new web worker running \_whatever script we have written inside of `src/counter-worker.js`
Now let's get something inside of the worker.

### Wrapping The Worker Code

It's important to note that the worker environemnt is _different_ than the main execution environment of JS. This means that the global variables available inside our worker won't be available in the main thread, & the reverse as well. For this reason, I've found it helpful to wrap all of my worker code inside this block.

```javascript
// counter-worker.js
if (typeof window === 'undefined') {
  // ...worker code goes here.
  // you can add `console.log(self)` if you would like to see the globals available within the worker context
}
```

I found that sometimes (could be the loader perhaps?) that when instantiating my worker that the main thread would try to run the worker in the `window` context first & then crash. This guarantees that none of your worker code will run in the `window` environment.

### Setting Up Communication To & From Our Worker

web workers can only cmmunicate with the main thread through a clearly-defined messaging system. This ensures better thread safety and makes it waaaaaaayyyyy easier to handle the multi-threading complexities since web workers can't actually access the DOM.

> quote about multithreading complexity????

First, let's define a basic schema for all of our messages (this would be great if we were using TS / Flow, but alas).

```javascript
// You don't have to put this anywhere, just know that all the messags are gonna follow this pattern

type Msg = {
  type: string,
  count: number
}
```

And we're off. The first thing we're gonna do is set up a message to increment the counter every time we press the `+1` button. Using the `worker.postMessage` method.

```jsx
// index.js
render() {
    const { state } = this

    return (
      <div>
        <h1>{state.count}</h1>

        <button
          onClick={() =>
            this.worker.postMessage({
              type: 'Inc',
              count: this.state.count
            })
          }
        >
          +1
        </button>
      </div>
    )
  }
```

And then to check whether we're actually posting the right message, let's set up a message handler inside of the worker. this uses the `onmessage` global from the worker context

```javascript
onmessage = ({ data }) => {
  const { type, count } = data

  switch (type) {
    case 'Inc':
      console.log(`inc message, new count is ${count + 1}`)
      return
    default:
      console.log(`unknown message of type "${type}"`)
      return
  }
}
```

And lastly, now we will need to send a message back from the web worker & update the component state accordingly. To do this, we'll use another one of the worker contest globals, `postMessage`. This will send a message back to the main thread with the new count inside of the message

```javascript
// counter-worker.js
onmessage = ({ data }) => {
  const { type, count } = data

  switch (type) {
    case 'Inc':
      console.log('inc message, new count is ', count + 1)
      postMessage({ count: count + 1 })
      return
    default:
      return
  }
}
```

And then we will need to add a message handler inside of our component. Let's add a couple lines to our CWM method

```jsx
// index.js
componentWillMount() {
  this.worker = new Worker()
  this.worker.onmessage = ({ data }) => {
    this.setState({
      count: data.count
    })
  }
}
```

And with that, you should see a working example where the counter increases as you press the `+1` button. Check out the JS console and you'll see the history of the communication back & forth.

## Step 3: Expand the Functionality of our Counter

### Add a `-1` Button

At the current moment our counter only adds to the number. Let's add another task to the web worker to allow us to decrement the counter.

First, we'll need to add a button to the UI with the appropriate `postMessage` event handler. We'll give this message a type of `Dec`, for "Decrement". That way we can handle the message appropriately (for those of you familiar with redux, this is a similar approach to dealing with redux actions in a reducer).

```jsx
render() {
    const { state } = this

    return (
      <div>
        <h1>{state.count}</h1>

        <button
          onClick={() =>
            this.worker.postMessage({
              type: 'Inc',
              count: this.state.count
            })
          }
        >
          +1
        </button>

        {/* Added button here */}
        <button
          onClick={() =>
            this.worker.postMessage({
              type: 'Dec',
              count: state.count
            })
          }
        >
          -1
        </button>
      </div>
    )
  }
```

Now we'lll have to add an extra branch to the web workers `onmessage` handler to appropriately decrease the counter until it reaches 0.

```javascript
// worker.js
onmessage = ({ data }) => {
  const { type, count } = data

  switch (type) {
    case 'Inc':
      console.log(`inc message, new count is ${count + 1}`)
      postMessage({ count: count + 1 })
      return
    case 'Dec':
      console.log(`dec message, new count is ${count - 1}`)

      if (count > 0) {
        // prevent negative counter state
        postMessage({ count: count - 1 })
      }

      return
    default:
      console.log(`unknown message of type "${type}"`)
      return
  }
}
```

## Tearing Down

Lastly, since workers do spin up real OS-level threads, it's a good idea to tear down the worker when you are finished with it. In this tutorial we'll tear down the worker from the parent component, simply by adding a third button that calls `worker.terminate()`. This will close the thread, even if there were any operations running on it.

```jsx
render() {
  // ... worker UI code
  <div>

    <button onClick={() => this.worker.terminate()}>Terminate</button>
  </div>
}
```

You'll notice that once you click this button none of the other buttons will work, since the worker has been effectively torn down. Usually you'll wantto include code like this within `componentWillUnmount` so that it doesn't affect the usability of your UIs.

## Conclusion

I hope that this tutorial has been helpful in understanding _how_ to set up & communicate with web workers, especially in the context of a React Component. Of course this is a trivial example, but it's always good to understand small throwaway examples before you actually need a web worker in a performance-critical scenario.

Let me know if you've got any questions/concerns/feedback. Shoot me a tweet on my [Twitter](https://twitter.com/benjamminj) or feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/benjamin-d-johnson/)
