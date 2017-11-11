/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import Footer from '../'

test('Footer snap', () => {
  const tree = shallow(<Footer />)
  expect(tree).toMatchSnapshot()
})
