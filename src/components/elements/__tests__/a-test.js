/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import { A } from '../'

test('Anchor snapshot', () => {
  const tree = shallow(<A>Test Link</A>)
  expect(tree).toMatchSnapshot()
})
