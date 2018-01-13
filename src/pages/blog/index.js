import React from 'react'

import { Heading, Link, Section } from '../../components'
import GatsbyLink from 'gatsby-link'
import { css } from 'emotion'

// component
const BlogLandingPage = ({ data, errors }) => (
  <Section className={style}>
    <Heading large className="pageHeading">
      <h1>Blog</h1>
    </Heading>

    <ul className="postsList">
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <li className="listItem" key={node.fields.slug}>
          <Heading className="listItemHeading">
            <h2>
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
            </h2>
          </Heading>

          <p>{node.excerpt}</p>

          <h3 className="listItemSubheading">
            {node.frontmatter.date} &mdash; {node.timeToRead} min. read
          </h3>
        </li>
      ))}
    </ul>
  </Section>
)

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
          frontmatter {
            title
            date(formatString: "MM-DD-YYYY")
          }
        }
      }
    }
  }
`

// style
const gutter = '0.5rem'
const style = css`
  .pageHeading {
    margin: 3rem 0 2rem; // todo -- should standardize
  }

  .postsList {
    margin: 1rem 0;
  }

  .listItem + .listItem {
    margin-top: 3rem;
  }

  .listItemHeading {
    margin-bottom: $gutter;
  }

  .listItemSubheading {
    font-size: 0.825rem;
    margin: $gutter 0;
    color: #888;
    font-family: var(--font-secondary);
    font-weight: normal;
  }
`
