import { LOGROCKET_URL } from '../../constants'

export const formatLogRocketPosts = allMediumPost => {
  console.log(allMediumPost.edges)
  return allMediumPost.edges.map(({ node }) => {
    const {
      publishDate,
      formattedPublishDate,
      uniqueSlug,
      title,
      previewContent,
      virtuals
    } = node

    return {
      external: true,
      url: `${LOGROCKET_URL}/${uniqueSlug}`,
      title,
      excerpt: previewContent.subtitle,
      publishDate,
      formattedPublishDate,
      timeToRead: virtuals.readingTime
    }
  })
}

const formatPostPreviews = data => {
  const { allMarkdownRemark, allMediumPost } = data
  console.log(data)
  const formattedMarkdownPosts = allMarkdownRemark.edges.map(({ node }) => ({
    external: false,
    url: node.fields.slug,
    title: node.frontmatter.title,
    excerpt: node.excerpt,
    publishDate: node.frontmatter.publishDate,
    formattedPublishDate: node.frontmatter.formattedPublishDate,
    timeToRead: node.timeToRead
  }))

  const logrocketPosts = formatLogRocketPosts(allMediumPost)

  return formattedMarkdownPosts.concat(logrocketPosts)
}

export default formatPostPreviews
