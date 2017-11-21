/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import BlogPreview from '../'

const posts = [
  {
    publishDate: '2017-10-07',
    title: 'Test Post',
    teaser: 'This is a test post',
    url: 'http://test.com'
  },
  {
    publishDate: '2017-10-09',
    title: 'Test Post #2',
    teaser: 'This is another test post',
    url: 'http://test-2.com'
  }
]

test('blog preview snap', () => {
  const tree = shallow(<BlogPreview posts={posts} />)
  expect(tree).toMatchSnapshot()
})
