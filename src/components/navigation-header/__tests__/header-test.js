/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'
import Header from '..'

test('Header snapshot', () => {
  const tree = shallow(<Header />)
  expect(tree).toMatchSnapshot()
})
