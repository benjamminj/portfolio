/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import Footer from '../'

test('Footer snap', () => {
  const props = {
    socialMedia: [
      {
        url: 'https://awesome-test.com',
        icon: () => <i>😎</i>
      }
    ]
  }

  const tree = shallow(<Footer {...props} />)
  expect(tree).toMatchSnapshot()
})
