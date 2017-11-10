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
            <h3>
              <A>{post.title}</A>
            </h3>

            <p>{post.teaser}...</p>
            {/* TODO -- simple tagging/categorization */}
          </Card>
        </li>
      ))}
    </ul>

    <style jsx>{`
      li + li {
        margin-top: 1rem;
      }
    `}</style>
  </div>
)

export default BlogPreview
