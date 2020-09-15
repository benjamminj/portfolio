import { Global, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import Head from 'next/head'
import React, { ReactNode } from 'react'
import reset from '../styles/reset'
import { Link } from './Link'
import { linkPadding } from '../styles/mixins'
import { container } from '../styles/variables'
/** @jsx jsx */ jsx

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
 */
export const Layout = ({ children }: { children?: ReactNode }) => (
  <Container>
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

    <Header>
      <Link href="/index" as="/" css={{ marginLeft: `-${linkPadding}` }}>
        benjaminjohnson.me
      </Link>
    </Header>

    {children}
  </Container>
)
