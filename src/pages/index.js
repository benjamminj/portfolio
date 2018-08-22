import React from 'react'
import { Heading, Link } from '../components'
import styled, { css } from 'emotion'

// todo...somewhere else perhaps?
const navigation = [
  {
    text: 'github',
    external: true,
    href: 'https://github.com/benjamminj'
  },
  {
    text: 'blog',
    href: '/blog'
  },
  {
    text: 'linkedin',
    external: true,
    href: 'https://www.linkedin.com/in/benjamin-d-johnson/'
  },
  {
    text: 'contact',
    external: true,
    href: 'mailto:benjamin.d.johnson@icloud.com'
  }
]

const IndexPage = () => (
  <div className={style}>
    <Heading
      className={headingStyle}
      large
    >
      <h1>Benjamin Johnson</h1>
    </Heading>

    <p>
      Welcome! 👋🏻 I'm a frontend engineer / web developer with a passion for
      clean UIs, easy-to-understand code, and a well-made cup of coffee.
      Currently learning/working at{' '}
      <Link external href="https://autogravity.com">
        AutoGravity
      </Link>{' '}
      in the greater Los Angeles area.
    </p>

    <ul className="list">
      {navigation.map(link => (
        <li className="li" key={link.href}>
          <Heading className="listHeading">
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

// styles
const rhythm = '2rem'
const style = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: var(--body-padding);

  > * {
    max-width: 35rem;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    margin: ${rhythm} 0;

    .li {
      display: inline;
      padding: 0.5rem 0;
      &:not(:last-child) {
        margin-right: 3rem;
      }
    }

    .listHeading {
      margin: 0;
    }
  }
`

const headingStyle = css`margin-bottom: ${rhythm};`
