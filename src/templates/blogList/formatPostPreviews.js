import { LOGROCKET_COLLECTION_ID, LOGROCKET_URL } from '../../constants'

export const formatLogRocketPosts = allMediumUser => {
  return allMediumUser.edges[0].node.posts
    .filter(post => post.homeCollectionId === LOGROCKET_COLLECTION_ID)
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
}

const formatPostPreviews = data => {
  const { allMarkdownRemark, allMediumUser } = data
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

  const logrocketPosts = formatLogRocketPosts(allMediumUser)

  return formattedMarkdownPosts.concat(logrocketPosts)
}

export default formatPostPreviews
