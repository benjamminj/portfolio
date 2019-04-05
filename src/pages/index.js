/** @jsx jsx */
import { Heading, Link, Layout } from '../components'
import { jsx, css } from '@emotion/core'
import { spacing } from '../styles/theme'

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

const rhythm = '2rem'

const IndexPage = () => (
  <Layout>
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: ${spacing.body.gutter};

        > * {
          max-width: 35rem;
        }
      `}
    >
      <Heading
        css={css`
          margin-bottom: ${rhythm};
        `}
        large
      >
        <h1>Benjamin Johnson</h1>
      </Heading>

      <p>
        Hi!{' '}
        <span role="img" aria-label="waving hand">
          👋🏻
        </span>{' '}
        I'm a frontend engineer with a passion for clean UIs, easy-to-understand
        code, and a well-made cup of coffee. Currently learning/working at{' '}
        <Link external href="https://www.sourcestrike.com">
          SourceStrike
        </Link>{' '}
        in Orange County, CA.
      </p>

      <ul
        css={css`
          display: flex;
          flex-wrap: wrap;
          margin: ${rhythm} 0;
        `}
      >
        {navigation.map(link => (
          <li
            css={css`
              display: inline;
              padding: 0.5rem 0;
              &:not(:last-child) {
                margin-right: 3rem;
              }
            `}
            key={link.href}
          >
            <Heading
              css={css`
                margin: 0;
              `}
            >
              <Link external={link.external} to={link.href} href={link.href}>
                {link.text}
              </Link>
            </Heading>
          </li>
        ))}
      </ul>
    </div>
  </Layout>
)

export default IndexPage
