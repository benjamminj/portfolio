/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')

const { createFilePath } = require('gatsby-source-filesystem')

// You can delete this file if you're not using it
exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  if (node.internal.type === 'MarkdownRemark') {
    // const fileNode = getNode(node.parent)
    const slug = createFilePath({ node, getNode, basePath: `pages` })

    const { createNodeField } = boundActionCreators

    // add slug
    createNodeField({
      node,
      name: 'slug',
      value: slug
    })
  }
}

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
    
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `)
      .then(({ data }) => {
        data.allMarkdownRemark.edges.map(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: path.resolve('./src/templates/post.js'),
            context: {
              slug: node.fields.slug
            }
          })
        })

        // console.log(JSON.stringify(res, null, 4))
        resolve()
      })
      .catch(err => {
        console.log(err)
      })
  })
}
