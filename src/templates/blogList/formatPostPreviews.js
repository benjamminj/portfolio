const formatPostPreviews = data => {
  const { allMarkdownRemark } = data

  const formattedMarkdownPosts = allMarkdownRemark.edges.map(({ node }) => ({
    external: false,
    url: node.fields.slug,
    title: node.frontmatter.title,
    excerpt: node.excerpt,
    publishDate: node.frontmatter.publishDate,
    formattedPublishDate: node.frontmatter.formattedPublishDate,
    timeToRead: node.timeToRead
  }))

  return formattedMarkdownPosts
}

export default formatPostPreviews
