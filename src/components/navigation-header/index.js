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

    // TODO -- better approximation of header height to offset by
    return targetHeight - 50
  }

  render (): Node {
    const { open } = this.state

    return (
      <div className='NavigationHeader' data-nav-open={open}>
        <header>
          <button className='toggleButton' onClick={this.toggleNav}>
            open!
          </button>
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
          --transition: 350ms ease-in-out;

          header {
            position: fixed;
            height: var(--header-height);
            display: flex;
            align-items: center;
            justify-content: flex-end;
            top: 0;
            left: 0;
            right: 0;
            padding: 1rem;
            background: transparent;
            z-index: 999;
          }

          nav {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--white);
            border-bottom: 1px solid var(--gray-normal);

            /* put bottom of nav at */
            transform: translateY(calc(-100% + var(--header-height)));
            transition:
            background var(--transition),
              transform var(--transition);
          }

          [data-nav-open] nav {
            transform: translateY(0);
            transition:
              background var(--transition),
              transform var(--transition);
            background: var(--accent-primary);
          }

          :global(body) {
            overflow: ${open ? 'hidden' : 'initial'};
          }
        `}</style>

        <style jsx>{``}</style>
      </div>
    )
  }
}

export default NavigationHeader
