import React, { Fragment } from 'react'
import GatsbyLink from 'gatsby-link'

import styles from './index.module.scss'

const Link = props => (
  <Fragment>
    {props.external ? (
      <a {...props} className={styles.Link} />
    ) : (
      <GatsbyLink {...props} className={styles.Link} />
    )}
  </Fragment>
)

export default Link
