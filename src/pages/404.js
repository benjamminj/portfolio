import React from 'react'

import { Heading, Link, Section } from '../components'
import { css } from 'emotion'

const style = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const headingStyle = css`
  font-size: 7rem;
  margin-top: 0;
  margin-bottom: 0;
  color: var(--gray-2);
`

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
