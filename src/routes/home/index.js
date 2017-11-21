import { h, Component } from 'preact'

// components
import sections from '../../constants/home-sections'
import { Section } from '../../components/elements'
import { aboveScreenLg } from '../../styles/breakpoints'

export default class Home extends Component {
  render () {
    return (
      <div className='Home'>
        <section id='#banner' className='banner'>
          <h1>Hi, I'm Ben 👋🏻</h1>
        </section>

        {sections.map(section => (
          <Section id={section.id}>
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
          .Home .banner h1 {
            font-size: 2rem;
          }

          .Home :global(.Section) h1 {
            margin-bottom: 1.5rem;
            font-size: 1.5rem;
          }

          @media (${aboveScreenLg}) {
            section,
            :global(.Section) {
              padding-left: 2rem;
            }

            .banner {
              height: 70vh;
            }
          }
        `}</style>
        <style jsx global>{`
          --primaryColor: steelblue;
        `}</style>
      </div>
    )
  }
}
