import { h, Component } from 'preact'

const sections = [
  {
    title: 'Projects',
    route: 'projects'
  },
  {
    title: 'Blog',
    route: 'blog'
  },
  {
    title: 'Resume',
    route: 'resume'
  },
  {
    title: 'Contact',
    route: 'mailto:benjamin.d.johnson@icloud.com'
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
