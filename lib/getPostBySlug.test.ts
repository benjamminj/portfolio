import { getPostBySlug } from './getPostBySlug'

test('should return parsed post data for a given slug', () => {
  const post = getPostBySlug('mocking-fetch')

  expect(post.frontmatter).toEqual({
    title: 'Mocking the fetch API with Jest',
    description:
      "Why should we mock the network? We'll take a look at why it's important to mock window.fetch and a couple methods we can use in our test suites.",
    draft: false,
    date: new Date('2019-04-26T00:00:00.000Z'),
    image: {
      url: 'blue-paint-swirls.jpg',
      alt: 'Abstract swirling colors of blue and red',
    },
    tags: ['testing', 'jest', 'javascript'],
  })

  expect(typeof post.body).toEqual('string')
})

test('should throw an error if a post matching the slug is not found', () => {
  expect(() => getPostBySlug('test-potato')).toThrow()
})
