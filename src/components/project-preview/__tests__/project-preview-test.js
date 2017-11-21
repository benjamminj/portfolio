/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import ProjectPreview from '../'

test('Social Media CSS Wrapper snap', () => {
  const projects = [
    {
      name: 'My Test Project',
      link: 'www.test.com',
      repo: 'https://github.com/test/test',
      description: 'A cool project'
    }
  ]

  const tree = shallow(<ProjectPreview projects={projects} />)
  expect(tree).toMatchSnapshot()
})
