import Link from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef, MutableRefObject, ReactNode } from 'react'
import { aboveTablet, darkMode } from '../styles/media'
import { fontSizes, layers, palette, spacing, weights } from '../styles/theme'
import { Box } from './Box'
import { Container } from './Container'
import { Stack } from './Stack'

const HeaderLink = forwardRef(
  (
    {
      href,
      title,
      children,
    }: {
      href?: string
      title: string
      children: ReactNode
    },
    ref: MutableRefObject<HTMLAnchorElement>
  ) => {
    const router = useRouter()
    const active = router.asPath === href
    return (
      <a
        ref={ref}
        href={href}
        title={title}
        css={[
          {
            fontSize: fontSizes.m,
            color: active ? palette.black : palette.neutral_900,
            fontWeight: active ? weights.bold : weights.normal,
            textDecoration: 'none',
          },
          darkMode({
            color: active ? palette.white : palette.neutral_100,
          }),
        ]}
      >
        {children}
      </a>
    )
  }
)

export const Header = () => {
  return (
    <header
      css={[
        {
          zIndex: layers.header,
          maxWidth: '100vw',
        },
      ]}
    >
      <Container>
        <Box
          padding="gutter"
          display={['block', 'flex']}
          css={[{ justifyContent: 'space-between' }]}
        >
          <Link href="/" passHref>
            <a
              css={[
                {
                  display: 'inline-block',
                  textDecoration: 'none',
                  fontSize: fontSizes.l,
                  color: palette.black,
                  fontWeight: weights.medium,
                },
                darkMode({ color: palette.white }),
              ]}
            >
              <span css={{ textTransform: 'lowercase' }}>Benjamin Johnson</span>
            </a>
          </Link>

          <Stack
            horizontal
            css={[
              { marginTop: spacing.xs, textTransform: 'lowercase' },
              aboveTablet({ marginTop: 0 }),
            ]}
          >
            <nav>
              <Stack horizontal>
                {/* TODO: change to "writing" */}
                <Link href="/blog" passHref>
                  <HeaderLink title="Writing">writing</HeaderLink>
                </Link>

                <HeaderLink title="GitHub" href="https://github.com/benjamminj">
                  GitHub
                </HeaderLink>

                <HeaderLink
                  title="Contact"
                  href="mailto:benjamin.d.johnson@icloud.com"
                >
                  contact
                </HeaderLink>
              </Stack>
            </nav>
          </Stack>
        </Box>
      </Container>
    </header>
  )
}
