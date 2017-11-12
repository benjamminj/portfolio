// @flow @jsx h
import { h, Component } from 'preact'

import sections from '../../constants/home-sections'
// types
import type { Node } from 'react'
import type { Event } from 'flow-bin'

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

  onClickLink = (ev: Event) => {
    ev.preventDefault()

    this.setState({
      open: false
    })

    this.scrollToHref(ev.target)
  }

  scrollToHref = (target: Event.target) => {
    const targetHeight = this.getScrollTopPosition(target)

    window.scrollTo(0, targetHeight)
  }

  getScrollTopPosition = (target: Event.target) => {
    const selector = target.hash

    const scrollTarget = document.querySelector(selector)
    const targetHeight = scrollTarget !== null ? scrollTarget.offsetTop : 0

    return targetHeight
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
          <ul>
            {sections.map(section => (
              <li>
                <a href={`#${section.id}`} onClick={this.onClickLink}>
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
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
            opacity: 0; /** TODO -- remove in favor of another hiding method */
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--accent-primary);

            /* keeps header from blocking click events */
            z-index: -1;
          }

          [data-nav-open] nav {
            opacity: 1;
            z-index: 1;
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
