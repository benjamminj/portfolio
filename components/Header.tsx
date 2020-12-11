import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef, MutableRefObject, ReactNode } from 'react'
import { aboveTablet, darkMode } from '../styles/media'
import { fontSizes, layers, palette, spacing, weights } from '../styles/theme'
import { Box } from './Box'
import { Container } from './Container'
import { Stack } from './Stack'

interface HeaderLinkProps {
  href?: string
  title: string
  children: ReactNode
}
const HeaderLink = forwardRef(
  (
    { href, title, children }: HeaderLinkProps,
    ref: MutableRefObject<HTMLAnchorElement>
  ) => {
    const router = useRouter()
    const active = router.asPath === href

    return (
      <a
        ref={ref}
        href={href}
        title={title}
        className={clsx(
          'text-base no-underline',
          active
            ? 'text-black font-bold dark:text-white'
            : 'text-gray-800 font-normal dark:text-gray-200'
        )}
      >
        {children}
      </a>
    )
  }
)

export const Header = () => {
  return (
    <header className="z-header max-w-viewport">
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
