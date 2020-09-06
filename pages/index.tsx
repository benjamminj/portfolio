import { css, jsx } from '@emotion/core'
import React from 'react'
import { Heading, Layout, Link } from '../src/components'
import { Text } from '../src/components/Text'
import { Box } from '../src/components/Box'
/** @jsx jsx */ jsx

const navigation = [
  {
    text: 'github',
    external: true,
    href: 'https://github.com/benjamminj',
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

const rhythm = '2rem'

/**
 * Not too much going on in this page, it's just the basic landing page!
 */
const IndexPage = () => (
  <Layout>
    <Box
      display="flex"
      css={css`
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: var(--body-gutter);

        > * {
          max-width: 35rem;
        }
      `}
    >
      <Heading>
        <h1>
          <Text variant="h4">Benjamin Johnson</Text>
        </h1>
      </Heading>

      <p>
        <Text>
          Hi!{' '}
          <span role="img" aria-label="waving hand">
            👋🏻
          </span>
          &nbsp; I'm a frontend engineer with a passion for clean UIs,
          easy-to-understand code, and a well-made cup of coffee. Currently
          learning/working at{' '}
          <Link external href="https://www.sourcestrike.com">
            SourceStrike
          </Link>{' '}
          in Orange County, CA.
        </Text>
      </p>

      <ul
        css={css`
          display: flex;
          flex-wrap: wrap;
          margin: ${rhythm} 0;
        `}
      >
        {navigation.map((link, i) => (
          <Box
            key={link.href}
            paddingY="xs"
            paddingLeft={i === 0 ? 'none' : 'xxl'}
          >
            <li>
              <Text>
                <Link external={link.external} href={link.href}>
                  {link.text}
                </Link>
              </Text>
            </li>
          </Box>
        ))}
      </ul>
    </Box>
  </Layout>
)

export default IndexPage
