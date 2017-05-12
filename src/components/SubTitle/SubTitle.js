// @flow
import React from 'react'

import {Section, COLORS} from 'src/theme'


const SubTitle = (props) => (
  <Section className='SubTitle' background={COLORS.white} color={COLORS.black} padding='2rem 1rem' {...props}>
    <h3>I create simple, elegant UIs using modern web technologies.</h3>
  </Section>
)

export default SubTitle
