import Head from 'next/head'
import React, { ReactNode } from 'react'
import { Banner } from './Banner'
import { Header } from './Header'

interface LayoutProps {
  children: ReactNode
  header?: ReactNode
  title: ReactNode
  subtitle?: ReactNode
}

export const Layout = ({
  children,
  header = <Header />,
  title,
  subtitle,
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white dark:text-white dark:bg-gray-800">
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
    </div>
  )
}
