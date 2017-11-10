import { h, Component } from 'preact'

// components
import ProjectPreview from '../../components/project-preview'
import BlogPreview from '../../components/blog-preview'
import { Section } from '../../components/elements'

// data
import projects from '../../constants/projects'
import postsPreviews from '../../constants/post-previews'

// TODO -- make sure each one of these becomes its own component;
const sections = [
  {
    title: 'Projects',
    content: () => (
      <ProjectPreview projects={projects} />
    )
  },
  {
    title: 'Latest From the Blog',
    content: () => <BlogPreview posts={postsPreviews} />
  },
  {
    title: 'About Me',
    content: () => <div>Say a little something about myself</div>
  },
  {
    title: 'Contact',
    route: 'mailto:benjamin.d.johnson@icloud.com',
    content: () => <div>a little blurb to get people to come calling</div>
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
