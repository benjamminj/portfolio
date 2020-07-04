import React from 'react'
import PropTypes from 'prop-types'
import { Link } from '.'
import { css, jsx, Global } from '@emotion/core'
import styled from '@emotion/styled'
import { aboveScreenSm, aboveScreenMd } from '../styles/mixins'
import { spacing } from '../styles/theme.js'
import reset from '../styles/reset.js'
import Head from 'next/head'
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

export const TemplateWrapper = ({ children }) => (
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

      <link rel="preload" href="/fonts/Inconsolata-Regular.ttf" as="font" />
      <link rel="preload" href="/fonts/Inconsolata-Bold.ttf" as="font" />
    </Head>

    <Global styles={reset} />
    <Global
      styles={css`
        @font-face {
          font-family: 'Inconsolata';
          font-display: optional;
          src: url('/fonts/Inconsolata-Regular.ttf') format('truetype');
          font-weight: 400;
        }

        @font-face {
          font-family: 'Inconsolata';
          font-display: optional;
          src: url('/fonts/Inconsolata-Bold.ttf') format('truetype');
          font-weight: 700;
        }
      `}
    />

    <Header>
      <Link href="/index" as="/">
        benjaminjohnson.me
      </Link>
    </Header>
    {children}
  </Container>
)

TemplateWrapper.propTypes = {
  children: PropTypes.node
}

export default TemplateWrapper
