import React from 'react'
import { css } from 'emotion'
import { textMaxWidth } from '../styles/variables'
// import style from './index.module.scss'

const style = css`
  margin: 1rem auto;
  max-width: ${textMaxWidth};
`

const Section = props => (
  <section className={css`${style} ${props.className}`}>
    {props.children}
  </section>
)

export default Section
