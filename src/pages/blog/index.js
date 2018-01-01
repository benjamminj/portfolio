import React from 'react'

const BlogLandingPage = ({ data, errors }) => (
  <div>
    <h1>Blog</h1>

    <p>Welcome to the blog! This hasn't been written yet.</p>

    <pre><code>
      {JSON.stringify(data, null, 4)}
    </code></pre>
  </div>
)

export default BlogLandingPage

export const query = graphql`
  query PostsQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "//pages/blog//" } }
      sort: { fields: [frontmatter___date] }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MM-DD-YYYY")
          }
        }
      }
    }
  }
`
