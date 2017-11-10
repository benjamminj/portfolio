// @flow @jsx h
import { h } from 'preact'

import Card from '../card'

import { A } from '../elements'

type propTypes = {
  posts: Array<{
    title: String,
    teaser: String,
    url: String
  }>
}

const BlogPreview = ({ posts }: propTypes) => (
  <div className='BlogPreview'>
    <ul>
      {posts.map(post => (
        <li>
          <Card>
            <A>
              <h3>{post.title}</h3>
            </A>

            <p>{post.teaser}...</p>
            {/* TODO -- simple tagging/categorization */}
          </Card>
        </li>
      ))}
    </ul>
  </div>
)

export default BlogPreview
