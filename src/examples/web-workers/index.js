import React, { Component } from 'react'

import { Button } from '../../components'
import style from './index.module.scss'

const MyWorker = require('worker-loader!./worker.js')

class WebWorkerExample extends Component {
  state = {
    count: 0,
  }

  componentWillMount() {
    this.worker = new MyWorker()
    this.worker.onmessage = this.onMessage
  }

  incrementCounter = () => {}

  onMessage = msg => {
    console.log('message from the worker -', msg.data)
    this.setState({ count: msg.data })
  }

  render() {
    return (
      <div className={style.WebWorkersExample}>
        <span>The count is {this.state.count}</span>
        <Button
          className={style.button}
          onClick={() => this.worker.postMessage(this.state.count)}
        >
          Add
        </Button>
        <Button
          className={style.button}
          style={{
            '--button-color': 'var(--accent-2)',
            '--button-color-active': 'var(--accent-2-dark)',
          }}
          onClick={() => this.setState({ count: 0 })}
        >
          Clear
        </Button>
      </div>
    )
  }
}

export default WebWorkerExample
