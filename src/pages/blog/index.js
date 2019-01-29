import React from 'react'

import { graphql } from 'gatsby'
import { LOGROCKET_COLLECTION_ID, LOGROCKET_URL } from '../../constants'
import { Heading, Link, Section, Layout } from '../../components'
import { css } from 'react-emotion'

// component
const BlogLandingPage = ({ data, errors }) => {
  const { allMarkdownRemark, allMediumUser } = data
  const formattedMarkdownPosts = allMarkdownRemark.edges.map(({ node }) => ({
    external: false,
    url: node.fields.slug,
    title: node.frontmatter.title,
    excerpt: node.excerpt,
    publishDate: node.frontmatter.publishDate,
    formattedPublishDate: node.frontmatter.formattedPublishDate,
    timeToRead: node.timeToRead
  }))

  const logrocketPosts = allMediumUser.edges[0].node.posts
    .filter(post => post.homeCollectionId !== LOGROCKET_COLLECTION_ID)
    .map(
      ({
        updatedAt,
        publishDate,
        formattedPublishDate,
        uniqueSlug,
        title,
        previewContent,
        virtuals
      }) => ({
        external: true,
        url: `${LOGROCKET_URL}/${uniqueSlug}`,
        title,
        excerpt: previewContent.subtitle,
        publishDate,
        formattedPublishDate,
        timeToRead: virtuals.readingTime
      })
    )

  const posts = [...formattedMarkdownPosts, ...logrocketPosts].sort(
    (current, next) => next.publishDate - current.publishDate
  )

  console.log(posts)
  return (
    <Layout>
      <Section className={style}>
        <Heading large className="pageHeading">
          <h1>Blog</h1>
        </Heading>

        <ul className="postsList">
          {posts.map(
            ({
              external,
              url,
              title,
              excerpt,
              formattedPublishDate,
              timeToRead
            }) => (
              <li className="listItem" key={url}>
                <Heading className="listItemHeading">
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

                <p className="postPreview">{excerpt}</p>

                <h3 className="listItemSubheading">
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

export const query = graphql`
  query PostsQuery {
    allMarkdownRemark(
      filter: {
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "//pages/blog//" }
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
            approvedHomeCollectionId
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

// style
const style = css`
  margin-top: 3rem;

  .postsList {
    margin: 1rem 0;
  }

  .listItem {
    margin-top: 4rem;
  }

  .listItemHeading {
    margin: 0.75rem 0;
  }

  .listItemSubheading {
    font-size: 0.825rem;
    margin: 1rem 0;
    color: #888;
    font-family: var(--font-secondary);
    font-weight: normal;
  }
`
