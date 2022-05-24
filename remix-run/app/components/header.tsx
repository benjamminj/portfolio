import clsx from 'clsx'
import { NavLink, Link } from '@remix-run/react'
import { Container } from './Container'
import { ReactNode } from 'react'

type HeaderLinkProps = {
  href: string
  title: string
  children: ReactNode
}

const HeaderLink = ({ href, title, children }: HeaderLinkProps) => {
  return (
    <NavLink
      to={href}
      title={title}
      className={({ isActive }) =>
        clsx(
          'text-base no-underline',
          isActive
            ? 'text-black font-bold dark:text-white'
            : 'text-gray-800 font-normal dark:text-gray-200'
        )
      }
    >
      {children}
    </NavLink>
  )
}

export const Header = () => {
  return (
    <header className="z-header max-w-viewport">
      {/* TODO: separate container comp? */}
      <div className="max-w-prose my-0 mx-auto">
        <div className="justify-between block p-4 space-y-2 sm:flex sm:space-y-0">
          <Link
            to="/"
            className="inline-block text-xl font-medium text-black no-underline dark:text-white"
          >
            <span className="lowercase">Benjamin Johnson</span>
          </Link>

          <div className="flex mt-2 space-x-4 lowercase">
            <nav>
              <div className="flex items-center space-x-4">
                <HeaderLink title="Writing" href="/writing">
                  writing
                </HeaderLink>

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
      </div>
    </header>
  )
}
