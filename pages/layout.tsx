import { Box } from '../components/Box'
import { Header } from '../components/Header'
import { Layout } from '../components/Layout'
import { Stack } from '../components/Stack'
import { aboveDesktop, aboveTablet, darkMode } from '../styles/media'
import {
  fonts,
  fontSizes,
  palette,
  radius,
  spacing,
  weights,
} from '../styles/theme'
import { textMaxWidth } from '../styles/variables'
import fs from 'fs'
import renderToString from 'next-mdx-remote/render-to-string'
import useHydrateMdx from 'next-mdx-remote/hydrate'
import { Callout } from '../components/Callout'
import fm from 'front-matter'

const PageWrapper = ({ children }) => {
  return (
    <div
      css={[
        {
          minHeight: '100vh',
          backgroundColor: palette.white,
        },
        darkMode({
          color: palette.white,
          backgroundColor: palette.neutral_800,
        }),
      ]}
    >
      {children}
    </div>
  )
}

const bgLight = palette.neutral_100
const bgDark = palette.neutral_900

const Banner = ({ children }) => {
  return (
    <Box
      paddingTop="8xl"
      paddingBottom="xl"
      display="flex"
      minHeight={spacing['6xl']}
      alignItems="flex-end"
      css={[
        { backgroundColor: bgLight },
        darkMode({
          backgroundColor: bgDark,
        }),
      ]}
    >
      <div
        css={{
          width: textMaxWidth,
          margin: '0 auto',
          padding: spacing.gutter,
        }}
      >
        {children}
      </div>
    </Box>
  )
}

// TODO: separate file, raw anchor element component
const A = ({ href, children }) => (
  <a
    title={children}
    href={href}
    css={[
      {
        // TODO: need a muted version of each color for light/dark versions?
        // opacity-based?
        color: palette.neutral_700,
        textDecoration: 'none',
        background: 'transparent',
        fontWeight: weights.medium,
        borderBottom: '2px solid',
        borderBottomColor: palette.neutral_200,
        paddingLeft: 2,
        paddingRight: 2,
        borderRadius: 2,

        ':hover': {
          background: palette.neutral_100,
          color: palette.neutral_800,
          borderBottomColor: palette.neutral_600,
        },
      },
      darkMode({
        color: palette.neutral_300,
        borderBottomColor: palette.neutral_700,

        ':hover': {
          background: palette.neutral_700,
          color: palette.white,
          borderBottomColor: palette.white,
        },
      }),
    ]}
  >
    {children}
  </a>
)

const P = ({ children }) => {
  return (
    <p
      css={{
        fontSize: fontSizes.m,
        marginTop: spacing.l,
        marginBottom: spacing.l,
        lineHeight: 1.7,

        'h1 + &,h2 + &,h3 + &,h4 + &,h5 + &,h6 + &': {
          marginTop: 0,
        },
      }}
    >
      {children}
    </p>
  )
}

const H2 = ({ children }) => {
  return (
    <h2
      css={{
        fontSize: fontSizes.xxl,
        marginTop: spacing['3xl'],
        marginBottom: spacing.l,
      }}
    >
      {children}
    </h2>
  )
}

const H3 = ({ children }) => {
  return (
    <h3
      css={{
        fontSize: fontSizes.xl,
        marginTop: spacing.xxl,
        marginBottom: spacing.m,
      }}
    >
      {children}
    </h3>
  )
}

const H4 = ({ children }) => {
  return (
    <h4
      css={{
        fontSize: fontSizes.l,
        marginTop: spacing.xl,
        marginBottom: spacing.m,
      }}
    >
      {children}
    </h4>
  )
}

const H5 = ({ children }) => {
  return (
    <h5
      css={{
        fontSize: fontSizes.m,
        marginTop: spacing.l,
        marginBottom: spacing.m,
      }}
    >
      {children}
    </h5>
  )
}

const H6 = ({ children }) => {
  return (
    <h6
      css={{
        fontSize: fontSizes.s,
        marginTop: spacing.l,
        marginBottom: spacing.m,
      }}
    >
      {children}
    </h6>
  )
}

const Pre = ({ children }) => {
  return (
    <pre
      css={[
        {
          backgroundColor: palette.neutral_100,
          padding: spacing.l,
          marginTop: spacing.l,
          marginBottom: spacing.l,
          overflowX: 'auto',
          fontSize: fontSizes.m,

          // TODO: use gutter?
          // Or make gutter more "static"?
          marginLeft: -1 * spacing.l,
          marginRight: -1 * spacing.l,
        },
        aboveTablet({
          borderRadius: radius.l,
          marginLeft: 0,
          marginRight: 0,
        }),
        aboveDesktop({
          marginLeft: -1 * spacing.l,
          marginRight: -1 * spacing.l,
        }),
        darkMode({
          backgroundColor: palette.neutral_900,
        }),
      ]}
    >
      {children}
    </pre>
  )
}

const InlineCode = ({ children }) => {
  return (
    <code
      css={[
        {
          padding: spacing.xxs,
          borderRadius: radius.s,
          background: palette.neutral_100,
        },
        darkMode({
          backgroundColor: palette.neutral_900,
        }),
      ]}
    >
      {children}
    </code>
  )
}

const Ol = ({ children }) => {
  return (
    <ol
      css={{
        counterReset: 'ol-count',
        paddingLeft: spacing.xl,
      }}
    >
      {children}
    </ol>
  )
}

const Ul = ({ children }) => {
  return <ul css={{ paddingLeft: spacing.xl }}>{children}</ul>
}

const Li = ({ children }) => {
  return (
    <li
      css={{
        position: 'relative',
        marginTop: spacing.m,
        marginBottom: spacing.m,
        paddingLeft: spacing.xs,
        fontSize: fontSizes.m,
        lineHeight: 1.7,

        ':before': {
          left: -1 * spacing.m,
          position: 'absolute',
        },

        'ol &': {
          ':before': {
            content: "counter(ol-count) '.'",
            counterIncrement: 'ol-count',
          },
        },

        'ul &': {
          ':before': {
            content: '"●"',
            fontSize: fontSizes.xs,
            lineHeight: `calc(${fontSizes.m} * 1.7)`,
          },
        },
      }}
    >
      {children}
    </li>
  )
}

const Hr = () => {
  return (
    <hr
      css={[
        {
          marginTop: spacing['4xl'],
          marginBottom: spacing['4xl'],
          border: '1px solid',
          borderColor: palette.neutral_100,
        },
        darkMode({
          borderColor: palette.neutral_900,
        }),
      ]}
    />
  )
}

const components = {
  a: A,
  p: P,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  pre: Pre,
  inlineCode: InlineCode,
  ol: Ol,
  ul: Ul,
  li: Li,
  hr: Hr,
  Callout,
}

const LayoutPage = ({ mdxContent }) => {
  const hydrated = useHydrateMdx(mdxContent, { components })

  return (
    <Layout header={null} containerComponent={PageWrapper}>
      <div css={{ position: 'relative' }}>
        <div css={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
          <Header />
        </div>

        <Banner>
          <Stack>
            <h1
              css={{
                textTransform: 'lowercase',
                fontSize: fontSizes['3xl'],
                fontFamily: fonts.primary,
                fontWeight: weights.bold,
              }}
            >
              Hey, I'm Ben! 🔥
            </h1>

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
              I'm a front-end software engineer based out of Seattle
            </h2>
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
          <div>{hydrated}</div>
        </div>
      </Box>
    </Layout>
  )
}

export const getStaticProps = async () => {
  const introContent = fs.readFileSync(
    './writing/accessible-icon-buttons.mdx',
    'utf8'
  )

  const { attributes: metadata, body } = fm(introContent)
  const mdxContent = await renderToString(body, { components })
  return {
    props: {
      metadata,
      mdxContent,
    },
  }
}

export default LayoutPage
