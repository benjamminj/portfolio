import { h, Component } from 'preact'

// components
import AboutMe from '../../components/about-me'
import BlogPreview from '../../components/blog-preview'
import Contact from '../../components/contact'
import ProjectPreview from '../../components/project-preview'
import { Section } from '../../components/elements'

// data
import postsPreviews from '../../constants/post-previews'
import projects from '../../constants/projects'

// TODO -- make sure each one of these becomes its own component;
const sections = [
  {
    title: 'Projects',
    content: () => <ProjectPreview projects={projects} />
  },
  {
    title: 'Latest From the Blog',
    content: () => <BlogPreview posts={postsPreviews} />
  },
  {
    title: 'About Me',
    content: () => <AboutMe />
  },
  {
    title: 'Contact Me',
    content: () => <Contact />
  }
]

export default class Home extends Component {
  render () {
    return (
      <div className='Home'>
        {/* TODO -- remove and latch onto global class */}
        <div className='banner'>
          <h1>Hi, I'm Ben 👋🏻</h1>
        </div>

        {sections.map(section => (
          <Section>
            <h1>{section.title}</h1>

            {section.content && section.content()}
          </Section>
        ))}

        <style jsx>{`
          .Home {
            width: 100%;
          }

          .banner {
            height: 50vh;
            justify-content: center;
            display: flex;
            align-items: center;
          }

          /* TODO -- eventually should be moved to the banner component */
          .Home :global(.banner) h1 {
            font-size: 2rem;
          }

          .Home :global(.Section) h1 {
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
          }
        `}</style>
        <style jsx global>{`
          --primaryColor: steelblue;
        `}</style>
      </div>
    )
  }
}
