import React from 'react'
import { Layout } from '../components/Layout'
import renderToString from 'next-mdx-remote/render-to-string'
import useHydrateMdx from 'next-mdx-remote/hydrate'
import fm from 'front-matter'
import fs from 'fs'
import { components } from '../components/MarkdownTags'

const IndexPage = ({ mdxContent }) => {
  const hydrated = useHydrateMdx(mdxContent, { components })
  return (
    <Layout
      title="Hey, I'm Ben! 🔥"
      subtitle="I'm a front-end software engineer based out of Seattle"
    >
      {hydrated}
    </Layout>
  )
}

export const getStaticProps = async () => {
  const introContent = fs.readFileSync('./content/intro.md', 'utf8')

  const { attributes: metadata, body } = fm(introContent)
  const mdxContent = await renderToString(body, { components })
  return {
    props: {
      metadata,
      mdxContent,
    },
  }
}

export default IndexPage
