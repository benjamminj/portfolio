import React from 'react'
import {shallow} from 'enzyme'

import BlogPost from '../BlogPost'

const mockPost = {
  __content: '<p>test</p>',
  id: 'test',
  date: new Date(0),
  title: 'test'
}

test('should render without crashing', () => {
  shallow(<BlogPost post={mockPost} />)
})

test('should throw if `post` prop is absent', () => {
  expect(() => shallow(<BlogPost />)).toThrow()
})
