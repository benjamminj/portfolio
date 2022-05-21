import type { LoaderFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { MarkdownRenderer } from '~/components/markdown-renderer'
import { readFile } from '~/lib/read-file.server'
import { processContent } from '~/lib/process-content'
import type { PrunedHast } from '~/lib/parse-markdown'

type LoaderData = {
  title: string
  subtitle: string
  hast: PrunedHast
}

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const content = await readFile('content/intro.md')
  const { hast } = await processContent(content)
  return {
    title: "Hi, I'm Ben! 🔥",
    subtitle: "I'm a front-end software engineer based out of Seattle",
    hast,
  }
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  return <MarkdownRenderer hast={data?.hast} />
}
