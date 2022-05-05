module.exports = {
  setupFilesAfterEnv: ['./test-utils/setupTests.ts'],
  testPathIgnorePatterns: ['<rootDir>/e2e/', '<rootDir>/sveltekit/'],
  collectCoverageFrom: [
    '<rootDir>/{components,lib,pages,styles,src}/**/*.{ts,tsx,js,jsx}',
  ],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
}
