import { h, Component } from 'preact'
import ProjectPreview from '../../components/project-preview'

// TODO -- make sure each one of these becomes its own component;
const sections = [
  {
    title: 'Projects',
    route: 'projects',
    content: () => <div>
      <ProjectPreview projects={[{ name: 'horizon' }]} />
    </div>
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
        <section className='banner'>
          <h1>Hi, I'm Ben 👋🏻</h1>
        </section>

        {sections.map(section => (
          <section>
            <a href={section.route}>
              <h2>{section.title}</h2>
            </a>

            {section.content && section.content()}
          </section>
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
