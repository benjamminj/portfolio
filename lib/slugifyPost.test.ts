import { slugifyPost } from './slugifyPost'

test.each(['md', 'mdx', 'ts', 'tsx'])(
  'should turn %p extensions into a slug',
  ext => {
    const filePath = `posts/test-post-slug.${ext}`
    expect(slugifyPost(filePath)).toEqual('test-post-slug')
  }
)
