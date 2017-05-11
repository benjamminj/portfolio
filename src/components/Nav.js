import React from 'react'
import {NavLink} from 'react-router-dom'

const Nav = (props) => (
  <nav>
    <ul>
      {
        props.navItems.map(item => (
          <li key={item.url.slice(1)}>
            <NavLink to={item.url}>{item.text}</NavLink>
          </li>
        ))
      }
    </ul>
  </nav>
)

export default Nav
