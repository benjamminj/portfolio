import { jsx } from '@emotion/core'
import prism from '@mapbox/rehype-prism'
import { format } from 'date-fns'
import fm from 'front-matter'
import fs from 'fs'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import useHydrateMdx from 'next-mdx-remote/hydrate'
import renderToString from 'next-mdx-remote/render-to-string'
import Head from 'next/head'
import path from 'path'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import readingTime from 'reading-time'
import { Heading, Layout, Link } from '../../src/components'
import { Img } from '../../src/components/Img'
import { MarkdownWrapperStyles } from '../../src/components/Markdown'
import { fonts } from '../../src/styles/theme'
import { textMaxWidth } from '../../src/styles/variables'
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
  frontmatter: {
    /** The title of the post. */
    title: string
    /** A brief description of the post for social media and for previews. */
    description: string
    /** The date that the post was first published. */
    date: string
    /** A rough estimate of how long this post will take to read. */
    readingTime: string
    /**
     * If the post was published in an external publication, this will contain the
     * name of the publisher.
     */
    publisher?: string
    /**
     * If the post was externally published, this will contain the link to the original
     * article. For these posts, the actual post body will just be a summary of the
     * originally published post.
     */
    link?: string
  }
}

/**
 * This page displays an individual post for viewing.
 */
const PostPage: NextPage<PostPageProps> = props => {
  // Hydrate the MDX content. The second argument is an object of React components
  // to interpolate into the MDX components. Hydrating in this fashion means that
  // we can move the MDX to any folder we want, or even to a separate repository.
  const hydrated = useHydrateMdx(props.mdxContent, {})

  const {
    title,
    date,
    readingTime,
    publisher,
    link: externalLink
  } = props.frontmatter

  const { HOMEPAGE } = process.env

  // If there's a banner image, we want to use that for the metadata, so we need
  // to create a non-relative URL to the image.
  const absoluteImagePath = props.image?.src
    ? HOMEPAGE + props.image?.src
    : undefined

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
      </Head>

      <main
        css={{
          maxWidth: '100vw',
          '@media screen and (min-width: 50rem)': {
            maxWidth: textMaxWidth,
            margin: '0 auto 3rem'
          }
        }}
      >
        <div
          css={{
            fontFamily: fonts.secondary,
            padding: '2rem 0'
          }}
        >
          <Heading large>
            <h1>{title}</h1>
          </Heading>

          <span
            css={{
              fontSize: '0.825rem',
              color: 'rgba(0, 0, 0, 0.5)',
              marginTop: '-1rem',
              display: 'block'
            }}
          >
            {date && `${date} — `}
            {readingTime}
          </span>
        </div>

        {props.image && <Img {...props.image} alt={props.image.alt} />}

        <MarkdownWrapperStyles
          css={{
            padding: 0
          }}
        >
          {hydrated}
        </MarkdownWrapperStyles>

        {publisher && externalLink && (
          <Link
            external
            href={externalLink}
            css={{
              display: 'inline-block',
              marginTop: '2rem'
            }}
          >
            Read the full article on {publisher}.
          </Link>
        )}
      </main>
    </Layout>
  )
}

/**
 * Create a blog URL for each post imported. This page component generates
 * a post per file within the `src/posts` folder.
 */
export const getStaticPaths: GetStaticPaths<PostPageParams> = async () => {
  // Posts live within the `src/posts` directory.
  const basePath = './src/posts/'
  // Get all of the file paths, this will allow us to loop thru and process each
  // file into a blog post "slug".
  const rawPosts = fs.readdirSync(basePath)

  // We are going to generate an array of post "paths"
  type Path = { params: PostPageParams }
  const paths: Path[] = []

  // Loop thru all of the file paths and process each one into a valid "slug" param.
  for (const filePath of rawPosts) {
    // If it's not a markdown (or MDX) file don't build a static path for it.
    if (!filePath.match(/.mdx?$/)) continue

    // There's a special file for testing the markdown rendering, don't render that either.
    //
    // In the future it might make sense to attach this to `NODE_ENV` so that
    // we _do_ render the markdown test in development but not in prod.
    if (filePath.includes('markdown-test')) continue

    // Remove the file extension and nested directory structure from the "slug" param.
    const slug = filePath
      .replace(/^src\/posts/, '')
      .replace(/\.mdx?$/, '')
      .replace(/\.tsx?$/, '')

    paths.push({ params: { slug } })
  }

  return {
    paths,
    fallback: false
  }
}

type GetPostPageStaticProps = GetStaticProps<PostPageProps, PostPageParams>

/**
 * Process the post data at build time.
 */
export const getStaticProps: GetPostPageStaticProps = async ctx => {
  const { slug } = ctx.params

  // The posts are all in the `src/post` directory.
  const basePath = './src/posts'
  // Fetch the list of file names for each post.
  const postFiles = fs.readdirSync(basePath)

  // Specifically, find the post that matches the "slug" parameter passed.
  const matchingPost = postFiles.find(filePath => {
    const postSlug = filePath
      .replace(/^src\/posts/, '')
      .replace(/\.mdx?$/, '')
      .replace(/\.tsx?$/, '')

    return postSlug === slug
  })

  // Fail loudly if we're trying to statically render a path that doesn't have
  // a corresponding markdown file
  if (!matchingPost) {
    throw new Error(`No file found for "${matchingPost}"`)
  }

  // Next, we are going to read the actual file content of the post. Getting this
  // raw first lets us process it into markdown, metadata, etc.
  const filePath = path.join(basePath, matchingPost)
  const source = fs.readFileSync(filePath, 'utf8')

  // Split out the frontmatter from the body content.
  const { attributes, body } = fm<any>(source)

  let imageProps: { image?: PostPageProps['image'] } = {}

  // If there's an image, we fetch the image, resize it to the max width shown, and
  // create a low quality placeholder image.
  if (attributes.image?.url) {
    const resized = require(`../../src/${attributes.image.url}?resize&size=640`)
    const image = require(`../../src/${attributes.image.url}?lqip`)

    imageProps.image = {
      src: resized.src,
      placeholder: image.preSrc,
      alt: attributes.image.alt
    }
  }

  // Render out the MDX content.
  const mdxContent = await renderToString(
    body,
    {},
    {
      // `prism` adds syntax highlighting as CSS classes to the code blocks.
      rehypePlugins: [prism]
    }
  )

  return {
    props: {
      slug,
      mdxContent,
      frontmatter: {
        ...attributes,
        date: format(attributes.date, 'MM-dd-yyyy'),
        readingTime: readingTime(body).text
      },
      ...imageProps,
      body
    }
  }
}

export default PostPage
