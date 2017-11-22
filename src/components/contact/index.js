// @flow @jsx h
import { h } from 'preact'

import { A } from '../../components/elements'

const Contact = () => (
  <div className='Contact'>
    <p>
      Let's chat! I don't mind if you're a recruiter, senior dev, junior dev, or
      just getting started, I'm always open for a conversation.{' '}
      <A href='mailto:benjamin.d.johnson@icloud.com'>Shoot me an email</A> or
      connect with me on{' '}
      <A href='https://www.linkedin.com/in/benjamin-d-johnson/' target='_blank'>
        LinkedIn
      </A>{' '}
      and let's get the conversation started.
    </p>
  </div>
)

export default Contact
