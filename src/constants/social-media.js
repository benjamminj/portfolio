import { h } from 'preact'
import {
  GithubLogoIcon,
  LinkedInLogoIcon,
  MediumLogoIcon,
  TwitterLogoIcon
} from '../components/icons'

export default [
  {
    url: 'https://twitter.com/benjamminj',
    icon: <TwitterLogoIcon />,
    color: '#1da1f2',
    name: 'Twitter'
  },
  {
    url: 'https://github.com/benjaminj6',
    icon: <GithubLogoIcon />,
    color: 'var(--black)',
    name: 'Github'
  },
  {
    url: 'https://www.linkedin.com/in/benjamin-d-johnson',
    icon: <LinkedInLogoIcon />,
    color: '#0077b5',
    name: 'LinkedIn'
  },
  {
    url: 'https://medium.com/@benjamin.d.johnson',
    icon: <MediumLogoIcon />,
    color: 'var(--black)',
    name: 'Medium'
  }
]
