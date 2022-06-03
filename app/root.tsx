import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from '@remix-run/react'
import clsx from 'clsx'
import { z } from 'zod'
import { Header } from './components/header'
import { Banner } from './components/banner'
import styles from './styles/app.css'
import type { LinksFunction, MetaFunction } from '@remix-run/node'
import { Footer } from './components/footer'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Benjamin Johnson',
  viewport: 'width=device-width,initial-scale=1',
})

const RouteLayoutSeoDataSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  preserveTitleCasing: z.boolean().optional(),
  seo: z
    .object({
      title: z.string().optional(),
      description: z.string().optional(),
      keywords: z.array(z.string()).optional(),
    })
    .optional(),
})

type RouteLayoutSeoData = z.infer<typeof RouteLayoutSeoDataSchema>
type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never

type RouteMatch<T extends unknown> = ArrayElement<
  Omit<ReturnType<typeof useMatches>, 'data'>
> & { data: T }

export default function App() {
  const matches = useMatches()
  const match = matches.find((route) => {
    const routeData = RouteLayoutSeoDataSchema.safeParse(route.data)
    return routeData.success
  }) as RouteMatch<RouteLayoutSeoData> | undefined

  const data = match?.data

  const preserveTitleCasing = false
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="font-mono dark:bg-gray-800 dark:text-white min-h-screen flex flex-col">
        <div className="relative">
          <div className="absolute inset-x-0 top-0">
            <Header />
          </div>
        </div>

        <Banner>
          <div className="space-y-4">
            {data?.title && (
              <h1
                className={clsx(
                  'text-5xl font-bold break-words',
                  !preserveTitleCasing && 'lowercase'
                )}
              >
                {data.title}
              </h1>
            )}

            {data?.subtitle && (
              <h2 className="text-2xl font-normal text-gray-700 lowercase dark:text-gray-400">
                {data.subtitle}
              </h2>
            )}
          </div>
        </Banner>

        <div className="p-4 py-10 mx-auto my-0 max-w-viewport md:max-w-prose md:min-w-prose flex-grow">
          <Outlet />
        </div>

        <Footer />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
