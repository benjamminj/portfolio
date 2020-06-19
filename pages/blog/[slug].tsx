import fs from 'fs'
import fm from 'front-matter'
import path from 'path'
import { GetStaticProps, GetStaticPaths, NextPage } from 'next'

interface PostPageParams {
  slug: string
}

interface PostPageProps {
  slug: string
}

const PostPage: NextPage<PostPageProps> = props => {
  return (
    <pre>
      <code>{JSON.stringify(props, null, 4)}</code>
    </pre>
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
      .replace(/.mdx?$/, '')
      .replace(/.tsx?$/, '')

    paths.push({ params: { slug } })
  }

  return {
    paths,
    fallback: false
  }
}

type GetPostPageStaticProps = GetStaticProps<PostPageProps, PostPageParams>
export const getStaticProps: GetPostPageStaticProps = async ctx => {
  console.log('CTX', ctx.params)
  const { slug } = ctx.params

  const basePath = './src/posts'
  const postFiles = fs.readdirSync(basePath)

  const matchingPost = postFiles.find(filePath => {
    const postSlug = filePath
      .replace(/^src\/posts/, '')
      .replace(/.mdx?$/, '')
      .replace(/.tsx?$/, '')

    return postSlug === slug
  })

  // Fail loudly if we're trying to statically render a path that doesn't have
  // a corresponding markdown file
  if (!matchingPost) {
    throw new Error(`No file found for "${matchingPost}"`)
  }

  const filePath = path.join(basePath, matchingPost)
  const { ext, name } = path.parse(filePath)

  const { attributes, body } = fm<any>(fs.readFileSync(filePath, 'utf8'))
  console.log('POST >>', ext, name)

  return {
    props: {
      slug,
      attributes: {
        ...attributes,
        date: null
      },
      body
    }
  }
}

export default PostPage
