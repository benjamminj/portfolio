import React, { Fragment } from 'react'
import GatsbyLink from 'gatsby-link'

import styles from './index.module.scss'

const Link = ({ external, ...props }) => (
  <Fragment>
    {external ? (
      <a {...props} className={styles.Link} target="_blank" />
    ) : (
      <GatsbyLink {...props} className={styles.Link} />
    )}
  </Fragment>
)

export default Link
