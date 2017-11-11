/* eslint-env jest */
import { h } from 'preact'
import render from 'preact-render-to-string'
import AboutMe from '.'


test('About Me snapshot', () => {
  const tree = render(<AboutMe />)

  expect(tree).toMatchSnapshot()
})
