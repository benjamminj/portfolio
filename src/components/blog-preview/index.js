// @flow @jsx h
import { h } from 'preact'

import Card from '../card'
import { A } from '../elements'

// css
import styles from './index.css'

type propTypes = {
  posts: Array<{
    publishDate: String,
    title: String,
    teaser: String,
    url: String
  }>
}

const BlogPreview = ({ posts }: propTypes) => (
  <div class={`BlogPreview ${styles.BlogPreview}`}>
    <ul>
      {posts.map(post => (
        <li>
          <Card>
            <p class={styles.published}>{post.publishDate}</p>

            <h1>
              <A href={post.url} target='_blank'>
                {post.title}
              </A>
            </h1>

            <p class={styles.teaser}>{post.teaser}...</p>
            {/* TODO -- simple tagging/categorization */}
          </Card>
        </li>
      ))}
    </ul>
  </div>
)

export default BlogPreview
