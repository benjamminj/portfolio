// @flow @jsx h
import { h, Component } from 'preact'

import sections from '../../constants/home-sections'
import { MenuIcon } from '../icons'
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
      <div className='NavigationHeader' open={open}>
        <header>
          <h1 className='h1'>Benjamin Johnson</h1>
          <button onClick={this.toggleNav}>
            <MenuIcon open={open} />
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

          .NavigationHeader {
            --position: calc(-100% + var(--header-height));

            position: fixed;
            top: 0;
            height: var(--header-height);
            left: 0;
            right: 0;
            transform: translateZ(0);
            overflow: hidden;
            transition: all var(--transition);
            border-bottom: 1px solid var(--gray-normal);

            background: var(--white);
          }

          .NavigationHeader[open] {
            height: 100%;
            -webkit-overflow-scrolling: touch;
            overflow-y: scroll;
            background: var(--accent-primary);
          }

          header {
            height: var(--header-height);
            display: flex;
            align-items: center;
            transform: translateY(0);
            padding: 1rem;
            background: transparent;
            z-index: 999;
          }

          /* TODO -- figure out why this selector isn't working */
          .NavigationHeader :global(.h1) {
            color: var(--black);
            transition: color var(--transition);
          }

          .NavigationHeader[open] h1 {
            color: var(--white);
            transition: all var(--transition);
          }

          button {
            padding: 0;
            position: absolute;
            padding: 1rem;
            top: 0;
            right: 0;
            width: var(--header-height);
            height: var(--header-height);
          }

          button:hover {
            cursor: pointer;
          }

          ul {
            padding: 0 1rem 1rem;
          }

          li {
            font-size: 1.5rem;
            padding: 2rem;
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
      </div>
    )
  }
}

export default NavigationHeader
