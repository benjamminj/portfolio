// @flow @jsx h
import { h } from 'preact'

import { A } from '../../components/elements'

const AboutMe = () => (
  <div className='AboutMe'>
    <p>
      Hi, I'm Ben. I'm a musician-turned-frontend-dev based out of the greater
      Los Angeles area. I sometimes make things with code (ok actually, I do
      that all the time). Working as a frontend dev means that I am constantly
      evaluating the latest and greatest trends in web development for their
      usability, scalability, & ability to provide real-world solutions (as well
      as the number of emojis in their readme 😎).
    </p>

    <p>
      Currently I'm working at a{' '}
      <A href='https://www.autogravity.com/' target='_blank'>
        fintech startup in Irvine
      </A>{' '}
      to make the car-buying/financing process as simple as it can be using the
      power of the mobile web.
    </p>

    <p>
      In addition to working as a frontend developer, I like to give back to my
      community. I occasionally do workshops for students learning to code, and
      try to write some articles here and there (in between everything else!).
    </p>

    <style jsx>{`
      p {
        margin: 1.5rem 0;
        line-height: 1.5;
      }
    `}</style>
  </div>
)

export default AboutMe
