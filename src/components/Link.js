import React, { Fragment } from 'react'
import GatsbyLink from 'gatsby-link'
import { css } from 'emotion'
import { linkStyle } from '../styles/mixins'
// import styles from './index.module.scss'

const borderSize = '1px'
const color = 'var(--accent-1-dark)'
const styles = css`
  ${linkStyle()}
`

const Link = ({ external, ...props }) => (
  <Fragment>
    {external ? (
      <a
        {...props}
        className={styles}
        target="_blank"
        rel="noopener noreferrer"
      />
    ) : (
      <GatsbyLink {...props} className={styles} />
    )}
  </Fragment>
)

export default Link
