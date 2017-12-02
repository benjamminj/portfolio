import { h, Component } from 'preact'

// components
import sections from '../../constants/home-sections'
import { Section } from '../../components/elements'
import { aboveScreenLg } from '../../styles/breakpoints'

// css
import styles from './style.css'

export default class Home extends Component {
  render () {
    return (
      <div class={`Home ${styles.home}`}>
        <section id='#banner' class={styles.banner}>
          <h1>Hi, I'm Ben 👋🏻</h1>
        </section>

        {sections.map(section => (
          <Section id={section.id}>
            <h1 class={styles.sectionTitle}>{section.title}</h1>

            {section.content && section.content()}
          </Section>
        ))}
      </div>
    )
  }
}
