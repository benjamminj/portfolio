// @flow @jsx h
import { h } from 'preact'

import Card from '../card'
import { A } from '../elements'

type propTypes = {
  posts: Array<{
    publishDate: String,
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
            <p className='published'>{post.publishDate}</p>

            <h1>
              <A href={post.url} target='_blank'>
                {post.title}
              </A>
            </h1>

            <p className='teaser'>{post.teaser}...</p>
            {/* TODO -- simple tagging/categorization */}
          </Card>
        </li>
      ))}
    </ul>

    <style jsx>{`
      --published-color: var(--gray-normal);

      li + li {
        margin-top: 1rem;
      }

      .published {
        margin-bottom: 1em;
        color: var(--published-color);
        font-size: 0.75rem;
        text-align: right;
      }

      .teaser {
        margin: 1rem 0 0;
      }
    `}</style>
  </div>
)

export default BlogPreview
