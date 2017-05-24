// @flow
import React from 'react'

import {A, ButtonAnchor, H2, Section} from 'src/theme'

import type {AboutProps} from './About.types'

const About = (props: AboutProps) => (
  <Section className='About'>
    <H2>about me</H2>
    <div className='content'>
      <p>{props.bio.content}</p>
      <p>
        {props.bio.invite.textBefore}
        <A underline bold href={props.bio.invite.href}>{props.bio.invite.text}</A>
        {props.bio.invite.textAfter}
      </p>
    </div>
    <ButtonAnchor href='mailto:benjamin.d.johnson@icloud.com'>contact</ButtonAnchor>
  </Section>
)

export default About
