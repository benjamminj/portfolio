import { css, Global, jsx } from '@emotion/core'
import styled from '@emotion/styled'
import Head from 'next/head'
import React, { ReactNode } from 'react'
import { aboveScreenMd, aboveScreenSm } from '../styles/mixins'
import reset from '../styles/reset.js'
import { spacing } from '../styles/theme.js'
import { Link } from './Link'
/** @jsx jsx */ jsx

const Container = styled.div`
  padding: ${spacing.body.gutter};
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;

  ${aboveScreenSm(css`
    padding: 2rem;
  `)};

  ${aboveScreenMd(css`
    padding: 1rem;
  `)};
`

const Header = styled.header`
  margin-bottom: 1rem;
  z-index: 100;
  text-align: left;
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
      <Link href="/index" as="/">
        benjaminjohnson.me
      </Link>
    </Header>

    {children}
  </Container>
)
