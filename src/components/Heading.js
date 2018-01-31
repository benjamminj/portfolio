import React from 'react'
import { css, cx } from 'emotion'
import { headingStyle } from '../styles/mixins'

const Heading = props => (
  <div
    className={cx(getStyle(props), props.className)}
  >
    {props.children}
  </div>
)

export default Heading

const getStyle = props => css`
  ${headingStyle};
  ${props.large && 'font-size: 1.5rem;'};
`