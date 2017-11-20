import { h } from 'preact'
// components
import AboutMe from '../components/about-me'
import BlogPreview from '../components/blog-preview'
import Contact from '../components/contact'
import ProjectPreview from '../components/project-preview'

// data
import postsPreviews from '../constants/post-previews'
import projects from '../constants/projects'

const sections = [
  {
    title: 'Projects',
    id: 'projects',
    content: () => <ProjectPreview projects={projects} />
  },
  {
    title: 'Blog',
    id: 'blog',
    content: () => <BlogPreview posts={postsPreviews} />
  },
  {
    title: 'About Me',
    id: 'about',
    content: () => <AboutMe />
  },
  {
    title: 'Contact Me',
    id: 'contact',
    content: () => <Contact />
  }
]

export default sections
