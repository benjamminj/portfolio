import React from 'react'

import { Heading, Link, Section } from '../../components'
import GatsbyLink from 'gatsby-link'

import style from './index.module.scss'

const BlogLandingPage = ({ data, errors }) => (
  <Section className={style.BlogLandingPage}>
    <Heading large className={style.pageHeading}>
      <h1>Blog</h1>
    </Heading>

    <ul className={style.postsList}>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <li className={style.listItem} key={node.fields.slug}>
          <Heading className={style.listItemHeading}>
            <h2>
              <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
            </h2>
          </Heading>

          <p>{node.excerpt}</p>

          <h3 className={style.listItemSubheading}>
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
