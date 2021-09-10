import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { forwardRef, MutableRefObject, ReactNode } from 'react'
import { Container } from './Container'

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
        <div className="justify-between block p-4 space-y-2 sm:flex sm:space-y-0">
          <Link href="/" passHref>
            <a className="inline-block text-xl font-medium text-black no-underline dark:text-white">
              <span className="lowercase">Benjamin Johnson</span>
            </a>
          </Link>

          <div className="flex mt-2 space-x-4 lowercase">
            <nav>
              <div className="flex items-center space-x-4">
                <Link href="/writing" passHref>
                  <HeaderLink title="Writing">writing</HeaderLink>
                </Link>

                <HeaderLink title="GitHub" href="https://github.com/benjamminj">
                  github
                </HeaderLink>

                <HeaderLink
                  title="Contact"
                  href="mailto:benjamin.d.johnson@icloud.com"
                >
                  contact
                </HeaderLink>
              </div>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  )
}
