// @flow @jsx h
import { h } from 'preact'

import type { Node } from 'react'

// css
import styles from './index.css'

type propTypes = {
  children: Node,
  id: string
}

const Section = ({ children, id }: propTypes) => (
  <section class={`Section ${styles.Section}`} id={id}>
    {children}
  </section>
)

export default Section
