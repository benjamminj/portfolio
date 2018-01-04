import React from 'react'

import { Heading, Link, Section } from '../components'
import style from './404.module.scss'

const NotFoundPage = () => (
  <Section className={style.NotFoundPage}>
    <Heading className={style.heading}>
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
