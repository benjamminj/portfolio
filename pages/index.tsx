import { css, jsx } from '@emotion/core'
import React from 'react'
import { Heading } from '../components/Heading'
import { Layout } from '../components/Layout'
import { Link } from '../components/Link'
import { Text } from '../components/Text'
import { Box } from '../components/Box'
/** @jsxImportSource @emotion/core */ jsx

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

const IndexPage = () => (
  <Layout>
    <Box
      display="flex"
      padding="gutter"
      css={css`
        flex-direction: column;
        justify-content: center;
        align-items: center;

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
          <Link external href="https://www.sourcestrike.com/">
            SourceStrike
          </Link>{' '}
          remotely.
        </Text>
      </p>

      <Box
        component="ul"
        display="flex"
        paddingY="xl"
        css={{
          flexWrap: 'wrap',
        }}
      >
        {navigation.map((link, i) => (
          <Box
            component="li"
            key={link.href}
            paddingY="xs"
            paddingLeft={i === 0 ? 'none' : 'xxl'}
          >
            <Text>
              <Link external={link.external} href={link.href}>
                {link.text}
              </Link>
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  </Layout>
)

export default IndexPage
