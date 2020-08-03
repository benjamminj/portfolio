jest.mock('fs', () => {
  return {
    readdirSync: () => [
      '5-myths-about-the-post-bootcamp-job-search.md',
      'how-css-works-understanding-the-cascade.md',
      'index.md',
      'intro-to-testing.md',
      'learning-a-new-codebase.md',
      'markdown-test.md',
      'mocking-fetch.md',
      'refactoring-legacy-code-with-jest-snapshots.md',
      'regex-test-side-effects.md',
      'what-makes-reasonml-so-great.md',
      'why-keeping-a-code-journal-will-make-you-a-better-developer.md',
    ],
  }
})

import { getPostFilePaths } from './getPostFilePaths'

test('should return a list of post file paths', () => {
  const paths = getPostFilePaths()

  expect(paths).not.toContain('index.md')
  expect(paths).not.toContain('markdown-test.md')
  expect(paths.length).toEqual(9)
})
