import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { getPostFileBySlug } from '../../lib/getPostFileBySlug'
import { getPostFilePaths } from '../../lib/getPostFilePaths'
import { parsePostFile } from '../../lib/parsePostFile'
import { slugifyPost } from '../../lib/slugifyPost'
import useHydrateMdx from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import { A, components } from '../../components/MarkdownTags'
import prism from '@mapbox/rehype-prism'
import { format } from 'date-fns'
import { Layout } from '../../components/Layout'
import { Tag, TagType } from '../../components/Tag'
import { PostFrontmatter } from '../../lib/types'
import Head from 'next/head'

interface NotePageProps {
  mdxContent: any
  frontmatter: PostFrontmatter
  formattedDate: string
}

interface NotePageParams {
  note: string
}

export const getStaticPaths: GetStaticPaths<{ note: string }> = async () => {
  const noteFiles = getPostFilePaths('./notes')

  type Path = { params: NotePageParams }

  const paths = noteFiles
    .map(file => slugifyPost(file, 'notes'))
    .map<Path>(note => ({ params: { note } }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps<NotePageProps> = async ctx => {
  const { note } = ctx.params

  const noteFiles = getPostFilePaths('./notes')
  const filePath = getPostFileBySlug(note, noteFiles)

  const { frontmatter, body } = parsePostFile(filePath, './notes')

  const mdxContent = await renderToString(body, {
    components,
    mdxOptions: {
      // `prism` adds syntax highlighting as CSS classes to the code blocks.
      rehypePlugins: [prism],
    },
  })

  const { date, lastUpdated } = frontmatter
  const unformattedDate = lastUpdated || date
  const formattedDate = format(unformattedDate, 'yyyy-MM-dd')

  return {
    props: {
      mdxContent,
      frontmatter,
      formattedDate,
    },
  }
}

const NotePage: NextPage<NotePageProps> = ({
  mdxContent,
  frontmatter,
  formattedDate,
}) => {
  const hydrated = useHydrateMdx(mdxContent, { components })
  const { tags = [] } = frontmatter
  return (
    <Layout
      title={frontmatter.title}
      subtitle={
        <div className="space-x-2">
          {tags.map(tag => (
            <Tag type={TagType.TEXT} key={tag} tag={tag} />
          ))}
        </div>
      }
    >
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <main>{hydrated}</main>

      <footer data-testid="SlugPage__footer" className="py-12">
        <div>
          <div className="font-mono dark:text-gray-400">Last updated</div>
          <div className="dark:text-gray-200">{formattedDate}</div>
        </div>
      </footer>
    </Layout>
  )
}

export default NotePage
