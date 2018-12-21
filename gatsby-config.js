
module.exports = {
  siteMetadata: {
    title: `Benjamin Johnson`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: ['gatsby-remark-prismjs']
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKER_ID
      }
    },
    'gatsby-plugin-emotion',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`
  ]
}
