/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import SocialMediaCssWrapper from '../social-media-css-wrapper'

test('Social Media CSS Wrapper snap', () => {
  const tree = shallow(
    <SocialMediaCssWrapper>Test Content</SocialMediaCssWrapper>
  )
  expect(tree).toMatchSnapshot()
})
