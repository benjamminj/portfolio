const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  env: {
    HOMEPAGE: process.env.URL || process.env.VERCEL_URL,
    NEXT_PUBLIC_GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  },
  // TODO: stand up Svelte codebase, and redirect to its deployment URLs
  // here. We can rewrite route by route over time.
  async rewrites() {
    return [
      {
        source: '/sv',
        destination:
          'https://portfolio-sveltekit-git-sveltekit-benjamminj.vercel.app/',
      },
      {
        source: '/_app/:slug*',
        destination:
          'https://portfolio-sveltekit-git-sveltekit-benjamminj.vercel.app/_app/:slug*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/writing',
        permanent: true,
      },
      {
        source: '/blog/:path',
        destination: '/:path',
        permanent: true,
      },
    ]
  },
})
