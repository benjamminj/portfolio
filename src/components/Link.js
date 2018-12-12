import React from 'react'
import GatsbyLink from 'gatsby-link'
import { css } from 'emotion'
import { linkStyle } from '../styles/mixins'

const borderSize = '1px'
const color = 'var(--accent-1-dark)'

const styles = css`
  ${linkStyle()};
`


const Link = ({ external, ...props }) => (
  external ? (
    <a
      {...props}
      className={styles}
      target="_blank"
      rel="noopener noreferrer"
    />
  ) : (
      <GatsbyLink {...props} className={styles} />
    )
)

export default Link
