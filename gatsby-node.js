/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const get = require('lodash/get')

const { createFilePath } = require('gatsby-source-filesystem')
const { LOGROCKET_COLLECTION_ID } = require('./src/constants')

// You can delete this file if you're not using it
exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    // const fileNode = getNode(node.parent)
    const slug = createFilePath({ node, getNode, basePath: `posts` })

    const { createNodeField } = actions

    // add slug
    createNodeField({
      node,
      name: 'slug',
      value: '/blog' + slug
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const filter =
      process.env.NODE_ENV === 'production'
        ? `frontmatter: { draft: { ne: true } }`
        : ''

    graphql(`
      query BuildQuery {
        allMarkdownRemark(filter: {${filter}}) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                publishDate: date(formatString: "x")
                image {
                  url
                  alt
                }
              }
            }
          }
        }
      }
    `)
      .then(({ data, errors }) => {
        if (errors) {
          console.log(errors)
          reject(errors)
        }
        // build the individual post pages
        const posts = data.allMarkdownRemark.edges
        posts.map(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve('./src/templates/post/post.js'),
            context: {
              slug: node.fields.slug,
              bannerUrl: get(node, 'frontmatter.image.url', '')
            }
          })
        })

        // build the blog "list" pages
        // the list of blog articles combines two data sources (markdown & Medium)
        // to create one unified list.
        const numberOfPosts = posts.length
        const numberOfPostsPerPage = 10
        const numberOfPages = Math.ceil(numberOfPosts / numberOfPostsPerPage)

        Array.from({ length: numberOfPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? '/blog' : `/blog/${i + 1}`,
            component: path.resolve('./src/templates/blogList/blogList.js'),
            context: {
              pageNumber: i === 0 ? null : i + 1,
              limit: numberOfPostsPerPage,
              skip: i * numberOfPostsPerPage
            }
          })
        })

        resolve()
      })
      .catch(err => {
        console.log(err)
      })
  })
}
