module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: ['superjson-next', '@emotion/babel-plugin'],
  env: {
    test: {
      presets: [
        'next/babel',
        [
          '@babel/preset-react',
          { runtime: 'automatic', importSource: '@emotion/react' },
        ],
      ],
    },
  },
}
