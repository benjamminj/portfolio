/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'
import NavigationHeader from '..'

// TODO -- up test coveragge for this component
test('Header initial snapshot', () => {
  const tree = shallow(<NavigationHeader />)
  expect(tree).toMatchSnapshot()
})
