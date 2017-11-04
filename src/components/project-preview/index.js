// @flow @jsx h
import { h } from 'preact'
import { fontWeightBold } from '../../styles/variables'
import Card from '../card'

type propTypes = {
  projects: Array<{
    name: String,
    link?: String,
    repo: String,
    description: String
  }>
}

const ProjectPreview = (props: propTypes) => (
  <div>
    <ul>
      {props.projects.map(project => (
        <li>
          {/* todo -- perhaps make a `card` element to house these styles? */}
          <Card header={<h3>{project.name}</h3>}>
            <p>{project.description}</p>

            {project.link && <a href={project.link}>demo</a>}

            <a href={project.repo}>code</a>
          </Card>
        </li>
      ))}
    </ul>

    <style jsx>{`
      li {
        border-radius: 2px;
      }

      li + li {
        margin-top: 1rem;
      }

      h3 {
        font-weight: ${fontWeightBold};
      }

      /* Margin for horizontal links */
      a + a {
        margin-left: 1rem;
      }
    `}</style>
  </div>
)

export default ProjectPreview
