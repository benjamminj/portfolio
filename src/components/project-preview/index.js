// @flow @jsx h
import { h } from 'preact'

type propTypes = {
  projects: Array<{ name: String }>
}

const ProjectPreview = (props: propTypes) => (
  <div>
    <ul>
      {props.projects.map(project => (
        <li>
          {project.name}
        </li>
      ))}
    </ul>

    <style jsx>{`
      li {
        border: 1px solid black;
      }
    `}</style>
  </div>
)

export default ProjectPreview
