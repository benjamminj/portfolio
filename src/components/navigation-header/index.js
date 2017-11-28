// @flow @jsx h
// npm modules
import { h, Component } from 'preact'

// components
import sections from '../../constants/home-sections'
import { MenuIcon } from '../icons'
import { cssUtils } from '../../utils'
import { screenLg } from '../../styles/breakpoints'

// styles
import styles from './index.css'

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
    this.lockScrolling()
    this.setState({
      open: !this.state.open
    })
  }

  lockScrolling = () => {
    const { open } = this.state

    if (document.body) {
      document.body.style.overflow = open ? 'initial' : 'hidden'
    }
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
    const screenBelowLg = cssUtils.remToPx(screenLg)

    if (window.innerWidth >= screenBelowLg) {
      window.scroll({ left: 0, top: targetHeight, behavior: 'smooth' })
    } else {
      window.scrollTo(0, targetHeight)
    }
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
      <div className={`${styles.NavigationHeader} NavigationHeader`} open={open}>
        <header className={styles.header}>
          <a href='/#banner' className={styles.a} onClick={this.onClickLink}>
            <h1 className={styles.h1}>Benjamin Johnson</h1>
          </a>
          <button onClick={this.toggleNav} className={styles.button}>
            <MenuIcon open={open} />
          </button>
        </header>

        {/* TODO -- move nav into its own component */}
        <nav>
          <ul className={styles.ul}>
            {sections.map(section => (
              <li className={styles.li}>
                <a className={styles.a} href={`#${section.id}`} onClick={this.onClickLink}>
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    )
  }
}

export default NavigationHeader
