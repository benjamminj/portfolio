// @flow @jsx h
import { h } from 'preact';

import Card from '../card'
import { A } from '../elements'

type propTypes = {
  posts: Array<{
    title: String,

  }>
}

const BlogPreview = ({ posts }: propTypes) => (
  <div className='BlogPreview'>
    <ul>
      {posts.map(post => (
        <li>
          <Card>
            <A><h3>{post.title}</h3></A>

            {/* TODO -- simple preview of the post */}
            {/* TODO -- simple tagging/categorization */}
          </Card>
        </li>
      ))}
    </ul>
  </div>
)

export default BlogPreview
