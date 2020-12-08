import { Global, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import Head from 'next/head'
import React, { ComponentType, ReactNode } from 'react'
import reset from '../styles/reset'
import { Link } from './Link'
import { linkPadding } from '../styles/mixins'
import { container, textMaxWidth } from '../styles/variables'
import { PageWrapper } from './PageWrapper'
import { Banner } from './Banner'
import { Header as HeaderV2 } from './Header'
import { fonts, fontSizes, palette, spacing, weights } from '../styles/theme'
import { Box } from './Box'
import { darkMode } from '../styles/media'
import { Stack } from './Stack'
/** @jsxImportSource @emotion/core */ jsx

const Container = styled.div({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  minHeight: '100vh',
  maxWidth: container,
  margin: '0 auto',
})

const Header = styled.header`
  z-index: 100;
  text-align: left;
  padding: var(--body-gutter);
`

/**
 * Generic layout wrapper for the entire website. Contains some default metadata,
 * loads some fonts, and top-level navigation.
 *
 * @todo deprecate?
 * - time to go more on a "bespoke" page-by-page basis. spin up a few different headers.
 */
export const Layout = ({
  children,
  containerComponent: ContainerComponent = Container,
  header = (
    <Header>
      <Link href="/index" as="/" css={{ marginLeft: `-${linkPadding}` }}>
        benjaminjohnson.me
      </Link>
    </Header>
  ),
}: {
  children?: ReactNode
  header?: ReactNode
  containerComponent?: ComponentType
}) => (
  <ContainerComponent>
    <Head>
      <title>Benjamin Johnson | Senior Front-End Engineer</title>
      <meta
        name="description"
        content="Front-end engineer with a passion for clean UIs & elegant code"
      />
      <meta
        name="keywords"
        content="front-end engineer, web, javascript, react"
      />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Inconsolata:400,700&display=swap"
      />
    </Head>

    <Global styles={reset} />

    {header}
    {children}
  </ContainerComponent>
)

interface LayoutV2Props {
  children: ReactNode
  header?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
}

export const LayoutV2 = ({
  children,
  header = <HeaderV2 />,
  title,
  subtitle,
}: LayoutV2Props) => {
  return (
    <PageWrapper>
      <Head>
        <title>Benjamin Johnson | Senior Front-End Engineer</title>
        <meta
          name="description"
          content="Front-end engineer with a passion for clean UIs & elegant code"
        />
        <meta
          name="keywords"
          content="front-end engineer, web, javascript, react"
        />
      </Head>

      <Global styles={reset} />

      <div css={{ position: 'relative' }}>
        <div css={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          {header}
        </div>

        <Banner>
          {/* TODO: remove and make composable? */}
          <Stack>
            <h1
              css={{
                textTransform: 'lowercase',
                fontSize: fontSizes['3xl'],
                fontFamily: fonts.primary,
                fontWeight: weights.bold,
              }}
            >
              {title}
            </h1>

            {subtitle && (
              <h2
                css={[
                  {
                    textTransform: 'lowercase',
                    fontSize: fontSizes['xl'],
                    fontWeight: weights.normal,
                    color: palette.neutral_700,
                  },
                  darkMode({
                    color: palette.neutral_200,
                  }),
                ]}
              >
                {subtitle}
              </h2>
            )}
          </Stack>
        </Banner>
      </div>

      <Box paddingTop="xl">
        <div
          css={{
            maxWidth: textMaxWidth,
            margin: '0 auto',
            padding: spacing.gutter,
          }}
        >
          {children}
        </div>
      </Box>
    </PageWrapper>
  )
}
