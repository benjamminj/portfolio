import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { A } from '~/components/markdown-renderer'
import { Tag } from '~/components/tag'
import { processContent } from '~/lib/process-content'
import { readFile } from '~/lib/read-file.server'
import type { Clipping } from './.helpers'

export const meta: MetaFunction = () => {
  return {
    title: 'Clippings',
    description: "Articles, blogs, and other links I've found interesting.",
  }
}

type LoaderData = {
  title: string
  subtitle: string
  clippings: Clipping[]
}

export const loader: LoaderFunction = async () => {
  const { default: clippings } = await import('content/clippings.json')
  return {
    title: 'Clippings',
    subtitle: "Articles, blogs, and other links I've found interesting.",
    clippings,
  }
}

export default function ClippingsRoute() {
  const data = useLoaderData<LoaderData>()
  const clippings = data?.clippings
  return (
    <main className="prose dark:prose-invert max-w-none">
      <table>
        <thead>
          <tr className="font-bold text-lg">
            <td>Link</td>
            <td>Tags</td>
          </tr>
        </thead>
        <tbody>
          {clippings.map((clipping) => (
            <tr key={clipping.url}>
              <td className="w-3/5">
                <A href={clipping.url}>{clipping.name}</A>
              </td>
              <td className="flex gap-2 flex-wrap">
                {clipping.tags.map((tag) => (
                  <Tag variant="strong" key={tag} tag={tag} />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
