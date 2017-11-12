/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'
import NavigationHeader from '..'

test('Header snapshot', () => {
  const tree = shallow(<NavigationHeader />)
  expect(tree).toMatchSnapshot()
})
