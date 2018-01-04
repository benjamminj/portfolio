import React from 'react'

import style from './index.module.scss'

const Section = props => (
  <section className={`${style.Section} ${props.className || ''}`}>
    {props.children}
  </section>
)

export default Section
