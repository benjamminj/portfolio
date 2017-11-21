/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import { Section } from '../'

test('Section snapshot', () => {
  const tree = shallow(<Section />)
  expect(tree).toMatchSnapshot()
})
