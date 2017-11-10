import { h, Component } from 'preact'

// components
import ProjectPreview from '../../components/project-preview'
import BlogPreview from '../../components/blog-preview'
import { H1, H2, Section } from '../../components/elements'

// data
import projects from '../../constants/projects'
import postsPreviews from '../../constants/post-previews'

// TODO -- make sure each one of these becomes its own component;
const sections = [
  {
    title: 'Projects',
    route: 'projects',
    content: () => (
      <ProjectPreview projects={projects} />
    )
  },
  {
    title: 'Blog',
    route: 'blog',
    content: () => <BlogPreview posts={postsPreviews} />
  },
  {
    title: 'Resume',
    route: 'resume',
    content: () => <div>just a link to the resume</div>
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
          <Section>
            <H1>Hi, I'm Ben 👋🏻</H1>
          </Section>
        </div>

        {sections.map((section, i) => (
          <Section dark={i % 2 === 0}>
            <H2>{section.title}</H2>

            {section.content && section.content()}
          </Section>
        ))}

        <style jsx>{`
          .home {
            width: 100%;
          }

          .banner {
            height: 50vh;
            justify-content: center;
            display: flex;
            align-items: center;
          }

          .Home :global(.Section) :global(.H2) {
            margin-bottom: 1.5rem;
          }
        `}</style>
      </div>
    )
  }
}
