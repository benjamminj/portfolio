import type { ReactNode } from 'react'

type FooterLinkProps = {
  href: string
  title: string
  children: ReactNode
}

const FooterLink = ({ href, title, children }: FooterLinkProps) => {
  return (
    <a
      href={href}
      title={title}
      className="text-base underline text-gray-800 font-normal dark:text-gray-200 hover:dark:text-white"
    >
      {children}
    </a>
  )
}

export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 dark:bg-opacity-40 py-8">
      <div className="max-w-prose my-0 mx-auto px-4">
        <p className="dark:text-gray-400">
          {' '}
          &copy; {new Date().getFullYear()} Benjamin Johnson
        </p>
        <ul className="flex space-x-4">
          <li>
            <FooterLink title="GitHub" href="https://github.com/benjamminj">
              github
            </FooterLink>
          </li>
          <li>
            <FooterLink title="Twitter" href="https://twitter.com/benjamminj">
              twitter
            </FooterLink>
          </li>
          <li>
            <FooterLink
              title="LinkedIn"
              href="https://www.linkedin.com/in/benjamin-d-johnson/"
            >
              linkedin
            </FooterLink>
          </li>
          <li>
            <FooterLink
              title="Email"
              href="mailto:benjamin.d.johnson@icloud.com"
            >
              email
            </FooterLink>
          </li>
          <li>
            <FooterLink title="RSS" href="/feed/rss.xml">
              rss
            </FooterLink>
          </li>
        </ul>
      </div>
    </footer>
  )
}
