import formatPostPreviews from '../formatPostPreviews'
import queryJson from '../__data__/unformattedPostData'

describe('formatPostPreviews', () => {
  test('returns the correct number of posts', () => {
    const posts = formatPostPreviews(queryJson)
    expect(posts.length).toEqual(8)
  })
})
