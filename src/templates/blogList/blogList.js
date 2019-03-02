/** @jsx jsx */
import { useStaticQuery, graphql } from 'gatsby'
import { Heading, Link, Section, Layout } from '../../components'
import { jsx } from '@emotion/core'
import formatPostPreviews from './formatPostPreviews'

export const pageQuery = graphql`
  query PostsQuery {
    allMarkdownRemark(
      filter: {
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "//posts//" }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          timeToRead
          title: frontmatter {
            title
          }
          frontmatter {
            title
            publishDate: date(formatString: "x")
            formattedPublishDate: date(formatString: "MM-DD-YYYY")
          }
        }
      }
    }
    allMediumUser {
      edges {
        node {
          posts {
            formattedPublishDate: firstPublishedAt(formatString: "MM-DD-YYYY")
            publishDate: firstPublishedAt(formatString: "x")
            updatedAt
            slug
            title
            virtuals {
              readingTime
            }
            uniqueSlug
            homeCollectionId
            previewContent {
              isFullContent
              subtitle
            }
          }
        }
      }
    }
  }
`

// component
const BlogLandingPage = ({ data }) => {
  const formattedPostPreviews = formatPostPreviews(data)
  const posts = formattedPostPreviews.sort(
    (current, next) => next.publishDate - current.publishDate
  )

  return (
    <Layout>
      <Section
        css={{
          marginTop: '3rem'
        }}
      >
        <Heading large className="pageHeading">
          <h1>Blog</h1>
        </Heading>

        <ul css={{ margin: '1rem 0' }}>
          {posts.map(
            ({
              external,
              url,
              title,
              excerpt,
              formattedPublishDate,
              timeToRead
            }) => (
              <li css={{ marginTop: '4rem' }} key={url}>
                <Heading css={{ margin: '0.75rem 0' }}>
                  <h2>
                    {external ? (
                      <Link external href={url}>
                        {title}
                      </Link>
                    ) : (
                      <Link to={url}>{title}</Link>
                    )}
                  </h2>
                </Heading>

                <p>{excerpt}</p>

                <h3
                  css={{
                    fontSize: '0.825rem',
                    margin: '1rem 0',
                    color: '#888',
                    fontFamily: 'var(--font-secondary)',
                    fontWeight: 'normal'
                  }}
                >
                  {formattedPublishDate} &mdash; {Math.ceil(timeToRead)} min.
                  read
                </h3>
              </li>
            )
          )}
        </ul>
      </Section>
    </Layout>
  )
}

export default BlogLandingPage
