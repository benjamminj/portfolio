import React from 'react'

import { Heading, Link, Section } from '../components'
import { css } from 'emotion'

// component
const NotFoundPage = () => (
  <Section className={style}>
    <Heading className={headingStyle}>
      <h1>404</h1>
    </Heading>
    <p>
      Looks like the page you're looking for doesn't exist...so sorry about
      that!
    </p>

    {
      // todo -- go back one entry in browser history OR to home page?
    }
    <Link to="/">Go back to the home page</Link>
  </Section>
)

export default NotFoundPage

// styles
const style = css`
  align-items: center;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  left: 0;
  padding: 1rem;
  position: absolute;
  right: 0;
  text-align: center;
  top: 0;
`

const headingStyle = css`
  color: var(--gray-2);
  font-size: 7rem;
  margin-bottom: 0;
  margin-top: 0;
`
