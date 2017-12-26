import React from 'react'

import style from './index.module.scss'

const Heading = props => (
  <div
    className={style.Heading}
    style={{
      '--font-size': props.large ? '1.5rem' : 'initial', // TODO -- move into method?
    }}
  >
    {props.children}
  </div>
)

export default Heading
