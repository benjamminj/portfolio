import React from 'react'
import GatsbyLink from 'gatsby-link'

import styles from './index.module.scss'

console.log(styles)
const Link = props => (
  <GatsbyLink
    {...props}
    className={`${styles.Link} ${props.className || ''}`}
  />
)

export default Link
