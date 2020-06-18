import { GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'
import fm from 'front-matter'
import { format, compareAsc } from 'date-fns'
import readingTime from 'reading-time'

interface BlogPageProps {}

const BlogPage = ({ posts }) => {
  return (
    <div>
      <pre>
        <code>{JSON.stringify(posts, null, 4)}</code>
      </pre>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const basePath = './src/posts/'
  const rawPosts = fs.readdirSync(basePath)

  let posts = []
  for (let item of rawPosts) {
    const filePath = path.join(basePath, item)
    const { ext, name } = path.parse(filePath)

    console.log('NAME >>', name)
    if (
      ext.startsWith('.md') &&
      ext !== 'index' &&
      !filePath.includes('posts/markdown-test')
    ) {
      try {
        const { attributes, ...rest } = fm(fs.readFileSync(filePath, 'utf8'))
        // console.log('FM >>', name, attributes)
        const { date } = attributes as { date: Date }
        const postData = {
          ...(attributes as object),
          // date: format(attributes.date, 'MM-dd-yyyy'),
          href: filePath
            .replace(/^src\/posts/, '/blog')
            .replace(/.mdx?$/, '')
            .replace(/.tsx?$/, ''),
          // TODO: reading time estimate
          readingTime: readingTime(rest.body).text
        }
        posts.push(postData)
      } catch (error) {
        console.log(`Error reading frontmatter of ${filePath}`, error)
      }
    }
  }

  const addDateFormattingToPost = p => ({
    ...p,
    date: format(p.date, 'MM-dd-yyyy')
  })

  return {
    props: {
      posts: posts
        .sort((a, b) => compareAsc(a.date, b.date))
        .map(addDateFormattingToPost)
    }
  }
}
export default BlogPage
