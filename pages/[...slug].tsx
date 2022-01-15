import prism from '@mapbox/rehype-prism'
import { format } from 'date-fns'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import useHydrateMdx from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import React, { Fragment } from 'react'
import { Layout } from '../components/Layout'
import { A, components } from '../components/MarkdownTags'
import { Tag } from '../components/Tag'
import { getCodeExamples } from '../lib/getCodeExamples'
import { getPostFileBySlug } from '../lib/getPostFileBySlug'
import { getPostFilePaths } from '../lib/getPostFilePaths'
import { highlightCodeExamples } from '../lib/highlightCodeExamples'
import { parsePostFile } from '../lib/parsePostFile'
import { slugifyPost } from '../lib/slugifyPost'
import { PostFrontmatter } from '../lib/types'

interface PostPageParams extends ParsedUrlQuery {
  slug: string[]
}

interface PostPageProps {
  /** The unique slug of the blog post. */
  slug: string
  /** The server-rendered MDX content of the article. */
  mdxContent: string
  /** If the article has a banner image, this will contain all relevant URIs */
  image?: {
    /** The full, high-fidelity image URI */
    src: string
    /**
     * A low quality placeholder image. This can be stretched out to fit the same
     * "size" as the `src` while the high-fidelity image is loading.
     */
    placeholder: string
    /** Alt text for the banner image */
    alt: string
  }
  formattedDate: string
  /** Post metadata */
  frontmatter: Pick<
    PostFrontmatter,
    | 'title'
    | 'description'
    | 'publisher'
    | 'link'
    | 'tags'
    | 'date'
    | 'lastUpdated'
  >
}

/**
 * This page displays an individual post for viewing.
 */
const PostPage: NextPage<PostPageProps> = props => {
  // Hydrate the MDX content. The second argument is an object of React components
  // to interpolate into the MDX components. Hydrating in this fashion means that
  // we can move the MDX to any folder we want, or even to a separate repository.
  const hydrated = useHydrateMdx(props.mdxContent, { components })

  const { title, publisher, link: externalLink, tags = [] } = props.frontmatter

  const { HOMEPAGE } = process.env

  // If there's a banner image, we want to use that for the metadata, so we need
  // to create a non-relative URL to the image.
  const absoluteImagePath =
    props.image?.src && HOMEPAGE ? HOMEPAGE + props.image?.src : undefined

  return (
    <Fragment>
      <Layout
        title={title}
        rawTitle={tags.includes('recipes')}
        subtitle={
          <div className="space-x-2">
            {tags.map(tag => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
        }
      >
        <Head>
          <title>{title}</title>
          <meta name="author" content="Benjamin Johnson" />
          <meta name="description" content={props.frontmatter.description} />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@benjamminj" />
          <meta name="twitter:title" content={title} />
          <meta
            name="twitter:description"
            content={props.frontmatter.description}
          />
          <meta name="twitter:creator" content="@benjamminj" />

          <meta property="og:title" content={title} />
          <meta
            property="og:description"
            content={props.frontmatter.description}
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={HOMEPAGE + '/' + props.slug} />

          {absoluteImagePath && props.image?.alt && (
            <Fragment>
              <meta name="twitter:image" content={absoluteImagePath} />
              <meta name="twitter:image:alt" content={props.image?.alt} />
              <meta property="og:image:url" content={absoluteImagePath} />
              <meta property="og:image:alt" content={props.image?.alt} />
            </Fragment>
          )}

          <script src="https://unpkg.com/requestidlecallback-polyfill@1.0.2/index.js" />
        </Head>

        <main>
          <div>{hydrated}</div>

          {publisher && externalLink && (
            <div className="pt-4">
              <A title={publisher} href={externalLink}>
                Read the full article on {publisher}.
              </A>
            </div>
          )}
        </main>

        <footer data-testid="SlugPage__footer" className="py-12">
          <div>
            <div className="font-mono dark:text-gray-400">Last updated</div>
            <div className="dark:text-gray-200">{props.formattedDate}</div>
          </div>
        </footer>
      </Layout>
    </Fragment>
  )
}

export const getStaticPaths: GetStaticPaths<PostPageParams> = async () => {
  const postFiles = getPostFilePaths()

  type Path = { params: PostPageParams }

  // TODO: don't build draft posts?
  const paths = postFiles.map<Path>(file => {
    return { params: { slug: slugifyPost(file).split('/') } }
  })

  return {
    paths,
    fallback: false,
  }
}

type GetPostPageStaticProps = GetStaticProps<PostPageProps, PostPageParams>
export const getStaticProps: GetPostPageStaticProps = async ctx => {
  const { slug: slugSegments } = ctx.params

  // file path??
  const filePath = getPostFileBySlug(ctx.params.slug)
  const { frontmatter, body } = parsePostFile(filePath)

  const rawExamples = await getCodeExamples(filePath)
  const examples = highlightCodeExamples(rawExamples)

  const mdxContent = await renderToString(body, {
    components,
    scope: { examples },
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
      slug: slugSegments.join('/'),
      mdxContent,
      frontmatter,
      formattedDate,
      body,
    },
  }
}

export default PostPage
