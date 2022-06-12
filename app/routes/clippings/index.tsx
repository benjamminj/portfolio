import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { processContent } from '~/lib/process-content'
import { readFile } from '~/lib/read-file.server'

export const meta: MetaFunction = () => {
  return {
    title: 'Clippings',
    description: "Articles, blogs, and other links I've found interesting.",
  }
}

export const loader: LoaderFunction = async () => {
  // const content = await readFile('clippings.json')
  const { default: json } = await import('content/clippings.json')
  // const json = JSON.parse(content)
  // console.log(content)
  return {
    title: 'Clippings',
    json,
  }
}

export default function ClippingsRoute() {
  const data = useLoaderData()
  console.log('%o', data)
  return <main>yoooo</main>
}
