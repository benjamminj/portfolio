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

          <p className="postPreview">{node.excerpt}</p>

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
const style = css`
  margin-top: 3rem;

  .postsList {
    margin: 1rem 0;
  }

<<<<<<< HEAD
  .listItem {
    margin-top: 4rem;
=======
  .postPreview {
    margin-top: 1rem;
  }

  .listItem + .listItem {
    margin-top: 3rem;
>>>>>>> 3fe1e6a4a7814e1563adf84aa1192583cb458eba
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
