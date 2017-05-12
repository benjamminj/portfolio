// @flow
import React from 'react'

import {Section, H1, FONT_SIZES} from 'src/theme'
import type {BannerProps} from './Banner.types'

const Banner = (props: BannerProps) => (
  <Section
    className='Banner'
    background='teal'
    fullscreen
    flexCenter
    {...props}
  >
    <H1 fontSize={FONT_SIZES.massive}>hi, i'm ben.</H1>
  </Section>
)

export default Banner
