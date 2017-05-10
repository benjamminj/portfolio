/* eslint-env jest */
import React from 'react'
import {shallow, mount} from 'enzyme'
import {MemoryRouter} from 'react-router-dom'

import Blog from '../Blog.js'
jest.mock('../../get-posts/read-posts-dir')

const matchMock = {
  url: 'http://test.com'
}

test('should crash if props are not present', () => {
  expect(() => shallow(<Blog />)).toThrow()
})

test('should render with a `match` prop', () => {
  const wrapper = shallow(<Blog match={matchMock} />)
  expect(wrapper).toExist
  expect(wrapper.instance().props.match).toExist
  expect(wrapper.instance().props.match.url).toBe('http://test.com')
})
