import React from 'react'
import { css } from 'emotion'
import { headingStyle } from '../styles/mixins'

const getStyle = props => css`
  ${headingStyle} ${props.large && 'font-size: 1.5rem;'};
`

const Heading = props => (
  <div
    className={css`
      ${getStyle(props)} ${props.className};
    `}
  >
    {props.children}
  </div>
)

export default Heading
