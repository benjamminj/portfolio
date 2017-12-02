// @flow @jsx h
import { h } from 'preact'

import type { Node } from 'react'

// css
import styles from './index.css'

type propTypes = {
  header: Node,
  children: Node | Node[]
}

const Card = ({ children, header }: propTypes) => (
  <article class={`Card ${styles.Card}`}>
    {header && <header>{header}</header>}

    <main>{children}</main>
  </article>
)

export default Card
