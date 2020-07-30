module.exports = {
  preset: 'jest-playwright-preset',
  setupFilesAfterEnv: ['./test-utils/setupTests.ts'],
  collectCoverageFrom: ['<rootDir>/src/**']
}
