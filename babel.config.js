module.exports = {
  env: {
    development: {
      presets: ['next/babel']
    },
    production: {
      presets: ['next/babel']
    },
    test: {
      presets: [
        ['@babel/env', { targets: { node: 'current' } }],
        '@babel/react',
        '@babel/preset-typescript'
      ]
    }
  }
}
