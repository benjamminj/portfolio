// @flow @jsx h
import { h } from 'preact'
import { fontWeightBold } from '../../styles/variables'
import Card from '../card'

import { A } from '../elements'

type propTypes = {
  projects: Array<{
    name: String,
    link?: String,
    repo: String,
    description: String
  }>
}

const ProjectPreview = (props: propTypes) => (
  <div className='ProjectPreview'>
    <ul>
      {props.projects.map(project => (
        <li>
          <Card>
            <h3>
              <A href={project.link || project.repo} target='_blank'>
                {project.name}
              </A>
            </h3>

            <p>{project.description}</p>

            {project.link && <A href={project.link}>demo</A>}

            <A href={project.repo}>code</A>
          </Card>
        </li>
      ))}
    </ul>

    <style jsx>{`
      li {
      }

      li + li {
        margin-top: 1rem;
      }

      h3 {
        font-weight: ${fontWeightBold};
      }

      p {
        margin: 0.75rem 0;
      }

      /* Margin for horizontal links */
      /* TODO -- move other components to have a global classname that can be latched onto as well as their local styles */
      div :global(.A) + :global(.A) {
        margin-left: 1rem;
      }
    `}</style>
  </div>
)

export default ProjectPreview
