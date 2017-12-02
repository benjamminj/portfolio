// @flow @jsx h
import { h } from 'preact'

import Card from '../card'
import { A } from '../elements'

// css
import styles from './index.css'

type propTypes = {
  projects: Array<{
    name: String,
    link?: String,
    repo: String,
    description: String
  }>
}

const ProjectPreview = (props: propTypes) => (
  <div class={`ProjectPreview ${styles.ProjectPreview}`}>
    <ul>
      {props.projects.map(project => (
        <li>
          <Card>
            <h1>
              <A href={project.link || project.repo} target='_blank'>
                {project.name}
              </A>
            </h1>

            <p>{project.description}</p>

            {project.link && <A href={project.link}>demo</A>}

            <A href={project.repo}>code</A>
          </Card>
        </li>
      ))}
    </ul>
  </div>
)

export default ProjectPreview
