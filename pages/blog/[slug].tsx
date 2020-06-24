import React from 'react'
import fs from 'fs'
import fm from 'front-matter'
import path from 'path'
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'
import dynamic from 'next/dynamic'
import { MarkdownWrapperStyles } from '../../src/components/Markdown'
import { Layout, Heading, Link } from '../../src/components'
import { jsx } from '@emotion/core'
import { textMaxWidth } from '../../src/styles/variables'
import { fonts } from '../../src/styles/theme'
import { format } from 'date-fns'
import readingTime from 'reading-time'
/** @jsx jsx */ jsx

interface PostPageParams {
  slug: string
}

interface PostPageProps {
  slug: string
  fileName: string
  frontmatter: {
    title: string
    date: string
    readingTime: string
    publisher?: string
    link?: string
  }
}

const PostPage: NextPage<PostPageProps> = props => {
  const MDX = dynamic(import(`../../src/posts/${props.fileName}`))
  const {
    title,
    date,
    readingTime,
    publisher,
    link: externalLink
  } = props.frontmatter
  
  console.log('PROPS >>', props)
  return (
    <Layout>
      <main
        css={{
          maxWidth: '100vw',
          // TODO: this needs to change, it doesn't work at tablet widths
          '@media (min-width: 35rem)': {
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

        <MarkdownWrapperStyles
          css={{
            padding: 0
          }}
        >
          <MDX />
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

export const getStaticPaths: GetStaticPaths<PostPageParams> = async () => {
  const basePath = './src/posts/'
  const rawPosts = fs.readdirSync(basePath)

  type Path = { params: PostPageParams }
  const paths: Path[] = []

  for (const filePath of rawPosts) {
    // If it's not a markdown (or MDX) file don't build a static path for it.
    if (!filePath.match(/.mdx?$/)) continue

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
export const getStaticProps: GetPostPageStaticProps = async ctx => {
  const { slug } = ctx.params

  const basePath = './src/posts'
  const postFiles = fs.readdirSync(basePath)

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

  const filePath = path.join(basePath, matchingPost)
  const { ext, name } = path.parse(filePath)

  const source = fs.readFileSync(filePath, 'utf8')
  const { attributes, body } = fm<any>(source)

  return {
    props: {
      slug,
      fileName: matchingPost,
      frontmatter: {
        ...attributes,
        date: format(attributes.date, 'MM-dd-yyyy'),
        readingTime: readingTime(body).text
      },
      body
    }
  }
}

export default PostPage
