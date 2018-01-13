import React from 'react'
import { css } from 'emotion'
import { textMaxWidth } from '../styles/variables'

const Section = props => (
  <section className={css`${style} ${props.className}`}>
    {props.children}
  </section>
)

export default Section

const style = css`
  margin: 1rem auto;
  max-width: ${textMaxWidth};
`