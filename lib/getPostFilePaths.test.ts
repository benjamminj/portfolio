import { getPostFilePaths } from './getPostFilePaths'

test('should return a list of post file paths', () => {
  const paths = getPostFilePaths('./lib/__mocks__/mock-posts')
  expect(paths).not.toContain('index.md')
  expect(paths).not.toContain('markdown-test.md')
  expect(paths.length).toEqual(4)
})
