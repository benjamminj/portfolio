/* eslint-env jest */
import { h } from 'preact'
import { shallow } from 'preact-render-spy'

import * as Icons from '../'

test('GitHub Logo snapshot', () => {
  const tree = shallow(<Icons.GithubLogoIcon />)
  expect(tree).toMatchSnapshot()
})

test('LinkedIn Logo snapshot', () => {
  const tree = shallow(<Icons.LinkedInLogoIcon />)
  expect(tree).toMatchSnapshot()
})

test('Medium Logo snapshot', () => {
  const tree = shallow(<Icons.MediumLogoIcon />)
  expect(tree).toMatchSnapshot()
})

describe('Menu Icon', () => {
  test('closed snapshot', () => {
    const tree = shallow(<Icons.MenuIcon open={false} />)
    expect(tree).toMatchSnapshot()
  })

  test('open snapshot', () => {
    const tree = shallow(<Icons.MenuIcon open />)
    expect(tree).toMatchSnapshot()
  })
})

test('Twitter Logo snapshot', () => {
  const tree = shallow(<Icons.TwitterLogoIcon />)
  expect(tree).toMatchSnapshot()
})
