import React from 'react'
// import Link from 'gatsby-link'
import { Heading, Link } from '../components'
import style from './index.module.scss'

const navigation = [
  {
    text: 'github',
    external: true,
    href: 'https://github.com/benjaminj6',
  },
  {
    text: 'blog',
    href: '/blog',
  },
  {
    text: 'linkedin',
    external: true,
    href: 'https://www.linkedin.com/in/benjamin-d-johnson/',
  },
  {
    text: 'contact',
    external: true,
    href: 'mailto:benjamin.d.johnson@icloud.com',
  },
]

const IndexPage = () => (
  <div className={style.IndexPage}>
    <Heading className={style.heading} large>
      <h1>Benjamin Johnson</h1>
    </Heading>

    <p className={style.subtitle}>
      Welcome! 👋🏻 I'm a frontend engineer / web developer with a passion for
      clean UIs, easy-to-understand code, and a well-made cup of coffee.
      Currently learning/working at{' '}
      <Link external href="https://autogravity.com">
        AutoGravity
      </Link>{' '}
      in the greater Los Angeles area.
    </p>

    <ul className={style.list}>
      {navigation.map(link => (
        <li className={style.li} key={link.href}>
          <Heading className={style.listHeading}>
            <Link external={link.external} to={link.href} href={link.href}>
              {link.text}
            </Link>
          </Heading>
        </li>
      ))}
    </ul>
  </div>
)

export default IndexPage
