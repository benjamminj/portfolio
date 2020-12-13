import { Global, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import Head from 'next/head'
import React, { ComponentType, ReactNode } from 'react'
import reset from '../styles/reset'
import { Link } from './Link'
import { linkPadding } from '../styles/mixins'
import { PageWrapper } from './PageWrapper'
import { Banner } from './Banner'
import { Header as HeaderV2 } from './Header'
/** @jsxImportSource @emotion/core */ jsx

const Container = styled.div({
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  minHeight: '100vh',
  // maxWidth: container,
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

      <div className="relative">
        <div className="absolute inset-x-0 top-0">{header}</div>

        <Banner>
          {/* TODO: remove and make composable? */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold lowercase">{title}</h1>

            {subtitle && (
              <h2 className="text-2xl font-normal text-gray-700 lowercase dark:text-gray-400">
                {subtitle}
              </h2>
            )}
          </div>
        </Banner>
      </div>

      <div className="p-4 pt-10 mx-auto my-0 max-w-viewport md:max-w-prose">
        {children}
      </div>
    </PageWrapper>
  )
}
