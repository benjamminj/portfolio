/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import Contact from '../'

test('Contact snapshot', () => {
  const tree = shallow(<Contact />)
  expect(tree).toMatchSnapshot()
})
