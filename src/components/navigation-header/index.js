// @flow @jsx h
import { h, Component } from 'preact'

import type { Node } from 'react'
type Props = {}
type State = {
  open: boolean
}

class NavigationHeader extends Component<Props, State> {
  state = {
    open: false
  }

  toggleNav = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render (): Node {
    const { open } = this.state

    return (
      <div className='NavigationHeader' data-nav-open={open}>
        <header>
          <button onClick={this.toggleNav}>open!</button>
        </header>

        {/* Toggle visibility using data tag & CSS for accessibility & animations */}
        <nav>
          navigation!
          <button onClick={this.toggleNav}>close!</button>
        </nav>

        <style jsx>{`
          header {
            position: fixed;
          }

          [data-nav-open] header {
            display: none;
          }

          nav {
            display: none; /** TODO -- remove in favor of another hiding method */
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--accent-primary);
          }

          [data-nav-open] nav {
            display: initial;
          }
        `}</style>

        <style jsx>{`
          :global(body) {
            overflow: ${open ? 'hidden' : 'initial'};
          }
        `}</style>
      </div>
    )
  }
}

export default NavigationHeader
