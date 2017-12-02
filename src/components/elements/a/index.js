// @flow @jsx h
import { h } from 'preact'

import type { Node } from 'React'

// css
import styles from './index.css'

type propTypes = {
  children: Node | Node[] | String,
  href: String,
  target?: String,
  color?: String
}

const A = ({ children, href, target, color }: propTypes) => (
  <a href={href} target={target} class={`A ${styles.A}`}>
    {children}
  </a>
)

export default A
