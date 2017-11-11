/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'
import SocialMediaLink from '..'

test('SocialMediaLink snapshot', () => {
  const tree = shallow(<SocialMediaLink />)
  expect(tree).toMatchSnapshot()
})
