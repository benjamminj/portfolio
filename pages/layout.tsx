import { Box } from '../components/Box'
import { Header } from '../components/Header'
import { Layout, LayoutV2 } from '../components/Layout'
import { Stack } from '../components/Stack'
import { darkMode } from '../styles/media'
import { fonts, fontSizes, palette, spacing, weights } from '../styles/theme'
import { textMaxWidth } from '../styles/variables'
import fs from 'fs'
import renderToString from 'next-mdx-remote/render-to-string'
import useHydrateMdx from 'next-mdx-remote/hydrate'
import { Callout } from '../components/Callout'
import fm from 'front-matter'
import {
  A,
  H2,
  H3,
  H4,
  H5,
  H6,
  Hr,
  InlineCode,
  Li,
  Ol,
  P,
  Pre,
  Ul,
} from '../components/MarkdownTags'
import { Banner } from '../components/Banner'
import { PageWrapper } from '../components/PageWrapper'

const components = {
  a: A,
  p: P,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  pre: Pre,
  inlineCode: InlineCode,
  ol: Ol,
  ul: Ul,
  li: Li,
  hr: Hr,
  Callout,
}

const LayoutPage = ({ mdxContent }) => {
  const hydrated = useHydrateMdx(mdxContent, { components })

  return (
    <LayoutV2
      title="Hey, I'm Ben! 🔥"
      subtitle="I'm a front-end software engineer based out of Seattle"
    >
      {hydrated}
    </LayoutV2>
  )
}

export const getStaticProps = async () => {
  const introContent = fs.readFileSync('./content/intro.mdx', 'utf8')

  const { attributes: metadata, body } = fm(introContent)
  const mdxContent = await renderToString(body, { components })
  return {
    props: {
      metadata,
      mdxContent,
    },
  }
}

export default LayoutPage
