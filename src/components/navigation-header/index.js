// @flow @jsx h
import { h, Component } from 'preact'

import sections from '../../constants/home-sections'
import { cssUtils } from '../../utils'

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

    const headerRems = cssUtils.getGlobalProperty('--header-height')
    const headerHeight = cssUtils.remToPx(headerRems)

    return targetHeight - headerHeight
  }

  render (): Node {
    const { open } = this.state

    return (
      <div className='NavigationHeader' data-nav-open={open}>
        <header>
          <button onClick={this.toggleNav}>
            {open ? 'close!' : 'open!'}
          </button>
        </header>

        {/* Toggle visibility using data tag & CSS for accessibility & animations */}
        {/* TODO -- move nav into its own component */}
        <nav>
          <ul>
            {sections.map(section => (
              <li>
                <a href={`#${section.id}`} onClick={this.onClickLink}>
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
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

          button:hover {
            cursor: pointer;
          }

          nav {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--white);
            border-bottom: 1px solid var(--gray-normal);

            /* put bottom of nav at bottom of "header" */
            transform: translateY(calc(-100% + var(--header-height)));
            transition: background var(--transition),
              transform var(--transition);
          }

          [data-nav-open] nav {
            transform: translateY(0);
            transition: background var(--transition),
              transform var(--transition);
            background: var(--accent-primary);
          }

          ul {
            margin-top: var(--header-height);
            padding: 1rem;
          }

          li {
            font-size: 1.5rem;
            padding: 2.5rem;
            width: 100%;
            text-align: center;
          }

          a {
            color: var(--white);
            text-decoration: none;
            font-weight: bold;
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
