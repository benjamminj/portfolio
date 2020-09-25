import { slugifyPost } from './slugifyPost'

test.each(['md', 'mdx', 'ts', 'tsx'])(
  'should turn %p extensions into a slug',
  ext => {
    const filePath = `writing/test-post-slug.${ext}`
    expect(slugifyPost(filePath)).toEqual('test-post-slug')
  }
)

test('should only ignore the posts path at the beginning of the file path', () => {
  const filePath = `writing/writing-guidelines`
  expect(slugifyPost(filePath)).toEqual('writing-guidelines')
})
