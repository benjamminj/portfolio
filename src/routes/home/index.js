import { h, Component } from 'preact'
import ProjectPreview from '../../components/project-preview'
import projects from '../../constants/projects'
import { H1, H2, Section } from '../../components/elements'
// TODO -- make sure each one of these becomes its own component;
const sections = [
  {
    title: 'Projects',
    route: 'projects',
    content: () => (
      <div>
        <ProjectPreview projects={projects} />
      </div>
    )
  },
  {
    title: 'Blog',
    route: 'blog',
    content: () => <div>blog post previews here</div>
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
      <div className='home'>
        {/* TODO -- remove and latch onto global class */}
        <div className='banner'>
          <Section>
            <H1>Hi, I'm Ben 👋🏻</H1>
          </Section>
        </div>

        {sections.map(section => (
          <Section>
            <a href={section.route}>
              <H2>{section.title}</H2>
            </a>

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
        `}</style>
      </div>
    )
  }
}
