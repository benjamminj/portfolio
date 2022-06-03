import type { LoaderFunction, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { MarkdownRenderer } from '~/components/markdown-renderer'
import { readFile } from '~/lib/read-file.server'
import { processContent } from '~/lib/process-content'
import type { PrunedHast } from '~/lib/parse-markdown'

type LoaderData = {
  title: string
  hast: PrunedHast
}

export const meta: MetaFunction = ({ data }) => {
  return {
    title: 'Benjamin Johnson — Principal Frontend Engineer',
    description:
      'Software engineer specializing in building front-end web apps.',
    keywords:
      'front-end engineer, web, javascript, typescript, react, accessibility',
  }
}

export const loader: LoaderFunction = async (): Promise<LoaderData> => {
  const content = await readFile('about.md')
  const { hast } = await processContent(content)
  return {
    title: 'About me',
    hast,
  }
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  return <MarkdownRenderer hast={data?.hast} />
}
