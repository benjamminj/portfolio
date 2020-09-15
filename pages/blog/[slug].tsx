import { jsx } from '@emotion/core'
import prism from '@mapbox/rehype-prism'
import { format } from 'date-fns'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import useHydrateMdx from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import readingTime from 'reading-time'
import { getPostBySlug } from '../../lib/getPostBySlug'
import { getPostFilePaths } from '../../lib/getPostFilePaths'
import { slugifyPost } from '../../lib/slugifyPost'
import { PostFrontmatter } from '../../lib/types'
import { Layout, Link } from '../../src/components'
import { Box } from '../../src/components/Box'
import { Callout } from '../../src/components/Callout'
import { Img } from '../../src/components/Img'
import { MarkdownWrapperStyles } from '../../src/components/Markdown'
import { Text } from '../../src/components/Text'
import { palette, spacing } from '../../src/styles/theme'
import { container } from '../../src/styles/variables'
import { Tag } from '../../src/components/Tag'
/** @jsx jsx */ jsx

interface PostPageParams extends ParsedUrlQuery {
  slug: string
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
  /** Post metadata */
  frontmatter: Pick<
    PostFrontmatter,
    'title' | 'description' | 'publisher' | 'link' | 'tags'
  > & {
    date: string
    /** A rough estimate of how long this post will take to read. */
    readingTime: string
  }
}

const mdxComponents = {
  Callout: props => (
    <Box
      css={{
        marginTop: spacing.xxl,
        marginBottom: spacing.xxl,

        '*:not(pre) > code': {
          background: palette.neutral_300,
        },
      }}
    >
      <Callout {...props} />
    </Box>
  ),
}

/**
 * This page displays an individual post for viewing.
 *
 * The mdx in the
 */
const PostPage: NextPage<PostPageProps> = props => {
  // Hydrate the MDX content. The second argument is an object of React components
  // to interpolate into the MDX components. Hydrating in this fashion means that
  // we can move the MDX to any folder we want, or even to a separate repository.
  const hydrated = useHydrateMdx(props.mdxContent, mdxComponents)

  const {
    title,
    date,
    readingTime,
    publisher,
    link: externalLink,
    tags = [],
  } = props.frontmatter

  const { HOMEPAGE } = process.env

  // If there's a banner image, we want to use that for the metadata, so we need
  // to create a non-relative URL to the image.
  const absoluteImagePath =
    props.image?.src && HOMEPAGE ? HOMEPAGE + props.image?.src : undefined

  return (
    <Layout>
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
        <meta property="og:url" content={HOMEPAGE + '/blog/' + props.slug} />

        {absoluteImagePath && props.image?.alt && (
          <>
            <meta name="twitter:image" content={absoluteImagePath} />
            <meta name="twitter:image:alt" content={props.image?.alt} />
            <meta property="og:image:url" content={absoluteImagePath} />
            <meta property="og:image:alt" content={props.image?.alt} />
          </>
        )}

        <script src="https://unpkg.com/requestidlecallback-polyfill@1.0.2/index.js" />
      </Head>

      <Box
        component="main"
        padding="gutter"
        paddingY="xxl"
        css={{
          maxWidth: '100vw',
          [`@media screen and (min-width: ${container})`]: {
            maxWidth: container,
            margin: '0 auto',
          },
        }}
      >
        <Box paddingTop="l" paddingBottom="xl">
          {tags.length > 0 && (
            <Box>
              {tags.map(tag => (
                <Tag key={tag} tag={tag} />
              ))}
            </Box>
          )}

          <Box>
            <h1>
              <Text variant="h3">{title}</Text>
            </h1>
          </Box>

          <Box paddingTop="xs" display="block">
            <Text variant="caption" css={{ color: palette.neutral_700 }}>
              {date && `${date} — `}
              {readingTime}
            </Text>
          </Box>
        </Box>

        {props.image && (
          <Box paddingBottom="l" bleedX="gutter">
            <Img
              {...props.image}
              alt={props.image.alt}
              css={{
                maxWidth: '100vw',
                overflowX: 'hidden',
              }}
            />
          </Box>
        )}

        <MarkdownWrapperStyles>{hydrated}</MarkdownWrapperStyles>

        {publisher && externalLink && (
          <Box paddingTop="xl">
            <Link external href={externalLink}>
              Read the full article on {publisher}.
            </Link>
          </Box>
        )}
      </Box>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths<PostPageParams> = async () => {
  const postFiles = getPostFilePaths()

  type Path = { params: PostPageParams }
  const paths = postFiles.map<Path>(file => {
    return { params: { slug: slugifyPost(file) } }
  })

  return {
    paths,
    fallback: false,
  }
}

type GetPostPageStaticProps = GetStaticProps<PostPageProps, PostPageParams>
export const getStaticProps: GetPostPageStaticProps = async ctx => {
  const { slug } = ctx.params
  const { frontmatter, body } = getPostBySlug(slug)

  let imageProps: { image?: PostPageProps['image'] } = {}

  // If there's an image, fetch the image, resize it to the max width shown, and
  // create a low quality placeholder image.
  if (frontmatter.image?.url) {
    const resized = require(`../../src/${frontmatter.image.url}?resize&size=640`)
    const image = require(`../../src/${frontmatter.image.url}?lqip`)

    imageProps.image = {
      src: resized.src,
      placeholder: image.preSrc,
      alt: frontmatter.image.alt,
    }
  }

  // Render out the MDX content.
  const mdxContent = await renderToString(body, mdxComponents, {
    // `prism` adds syntax highlighting as CSS classes to the code blocks.
    rehypePlugins: [prism],
  })

  return {
    props: {
      slug,
      mdxContent,
      frontmatter: {
        ...frontmatter,
        date: format(frontmatter.date, 'MM-dd-yyyy'),
        readingTime: readingTime(body).text,
      },
      ...imageProps,
      body,
    },
  }
}

export default PostPage
