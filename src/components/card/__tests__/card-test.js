/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import Card from '../'

test('Card with contents snap', () => {
  const tree = shallow(<Card>Test content</Card>)
  expect(tree).toMatchSnapshot()
})

test('Card with header snap', () => {
  const tree = shallow(<Card header={() => <h1>header</h1>}>test content</Card>)
  expect(tree).toMatchSnapshot()
})
