module.exports = {
  preset: 'jest-playwright-preset',
  setupFilesAfterEnv: ['./test-utils/setupTests.ts'],
  collectCoverageFrom: ['<rootDir>/src/**'],
  testMatch: [
    '**/__tests__/**/*.e2e.[jt]s?(x)',
    '**/?(*.)+(spec|test).e2e.[jt]s?(x)',
  ],
}
