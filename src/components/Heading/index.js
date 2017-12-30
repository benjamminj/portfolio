import React from 'react'

import style from './index.module.scss'

const Heading = props => (
  <div
    className={`${style.Heading} ${props.className || ''}`}
    style={{
      '--font-size': props.large ? '1.5rem' : undefined, // TODO -- move into method?
      '--color': props.accented ? 'var(--accent-1-dark)' : undefined
    }}
  >
    {props.children}
  </div>
)

export default Heading
