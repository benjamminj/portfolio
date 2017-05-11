import React from 'react'
import {shallow, render} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'

import BlogPreview from '../BlogPreview'

const mockPosts = Array.from(new Array(5)).map((post, i) => ({
  title: `test-${i}`,
  id: `test-${i}`,
  preview: `test-${i}`,
  date: new Date(0)
}))

const defaultProps = {
  posts: mockPosts,
  url: 'http://test.com'
}

test('should render without crashing', () => {
  const wrapper = shallow(<BlogPreview {...defaultProps} />)
})

test('should render the default headline if none given', () => {
  const wrapper = render(
    <MemoryRouter>
      <BlogPreview {...defaultProps} />
    </MemoryRouter>
  )
  expect(wrapper.find('h2')).toExist
})
