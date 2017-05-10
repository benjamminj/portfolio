/* eslint-env jest */
import {mount, shallow} from 'enzyme'
import React from 'react'
import ReactDOM from 'react-dom'

import App from '../App'
jest.mock('../get-posts/read-posts-dir')

test('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
})

test('renders two routes', () => {
  const wrapper = mount(<App />)
  expect(wrapper.find('.App').children().length).toBe(2)
})

test('renders the `Home` component', () => {
  const wrapper = mount(<App />)
  const HomeComponent = wrapper.find('.App').children().first().props()
    .component
  expect(HomeComponent.name).toMatch('Home')
})

test('renders the `Blog` component', () => {
  const wrapper = mount(<App />)
  const BlogComponent = wrapper.find('.App').children().last().props().component
  expect(BlogComponent.name).toMatch('Blog')
})
