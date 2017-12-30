import React from 'react'
// import Link from 'gatsby-link'
import { Heading, Link } from '../components'
import style from './index.module.scss'

const IndexPage = () => (
  <div className={style.IndexPage}>
    <Heading className={style.heading}>
      <h1>Benjamin Johnson</h1>
    </Heading>

    <p className={style.subtitle}>
      Welcome! 👋🏻 I'm a frontend engineer / web developer with a passion for
      clean UIs, easy-to-understand code, and a well-made cup of coffee.
      Currently learning/working at{' '}
      <Link external href="https://autogravity.com">AutoGravity</Link> in the greater Los
      Angeles area.
    </p>

    <ul className={style.list}>
      {['projects', 'blog', 'about', 'contact'].map(link => (
        <li className={style.li}>
          <Heading className={style.listHeading}>
            <Link to={`/${link}`}>{link}</Link>
          </Heading>
        </li>
      ))}
    </ul>
  </div>
)

export default IndexPage
