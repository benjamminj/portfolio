// make sure that we are in the worker scope
if (typeof window === 'undefined') {
  console.log('now in the worker scope', self)

  onmessage = ({ data }) => {
    console.log('message from the main thread - ', data)

    // note, this is a pretty trivial worker, but it helps with thinking
    // about concurrency and how to communicate between web workers and the main thread
    // it's better to have a worker that provides pure functions rather than
    // one with mutable, imperative state
    postMessage(data + 1)
  }
}
