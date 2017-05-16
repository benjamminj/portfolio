// @flow
import React from 'react'

import {Section, COLORS} from 'src/theme'

import type {SubTitleProps} from './SubTitle.types'

const SubTitle = (props: SubTitleProps) => (
  <Section
    className='SubTitle'
    background={COLORS.white}
    color={COLORS.black}
    padding='2rem 1rem'
    {...props}
  >
    <h2>I {props.actionMsg}</h2>
  </Section>
)

export default SubTitle
