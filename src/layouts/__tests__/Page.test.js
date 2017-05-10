import React from 'react'
import {shallow} from 'enzyme'

import Page from '../Page.js'

test('should render without crashing', () => {
  const wrapper = shallow(<Page />)
  expect(wrapper.find('.page')).toExist
})

test('should render child component', () => {
  const wrapper = shallow(<Page><h1 className='test'>test</h1></Page>)
  expect(wrapper.find('.test')).toExist
  expect(wrapper.find('.test').text()).toBe('test')
})
