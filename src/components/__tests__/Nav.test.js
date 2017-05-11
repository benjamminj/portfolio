/* eslint-env jest */
import React from 'react'
import {shallow, render} from 'enzyme'

import Nav from '../Nav'

const mockNavItems = Array.from(new Array(5)).map((_, i) => ({
  url: `/test-${i}`,
  text: `test-${i}`
}))

const genWrapper = () => shallow(<Nav navItems={mockNavItems} />)

test('should render without crashing', () => {
  genWrapper()
})

test('should throw if no `navItems`', () => {
  expect(() => shallow(<Nav />)).toThrow()
})

test('should render all of the navItems passed to it as `li`s', () => {
  const wrapper = genWrapper()
  expect(wrapper.find('ul').children().length).toBe(5)
})

test('should not render a `label` without a `toggleNav` prop', () => {
  const wrapper = genWrapper()
  expect(wrapper.find('label').exists()).toBe(false)
})

test('should render the `label` when passed via `toggleNav` prop', () => {
  const mockToggleNav = {
    target: '#test',
    icon: () => <i id='test-icon' />
  }

  const wrapper = shallow(
    <Nav navItems={mockNavItems} toggleNav={mockToggleNav} />
  )

  expect(wrapper.find('label').exists()).toBe(true)
  expect(wrapper.find('#test-icon').exists()).toBe(true)
  expect(wrapper.find('label').props().htmlFor).toBe('#test')
})
