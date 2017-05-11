import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import {Nav} from 'src/components'

class Home extends Component {
  render () {
    return (
      <main className='Home'>
        <Nav navItems={this.props.nav} />
        <section id='Banner'>Banner</section>
        <section id='Work'>Work</section>
        <section id='About'>About</section>
      </main>
    )
  }
}

Home.defaultProps = {
  nav: [
    {url: '/#Banner', text: 'home'},
    {url: '/#Work', text: 'work'},
    {url: '/#About', text: 'about'},
    {url: 'mailto:benjamin.d.johnson@icloud.com', text: 'contact'}
  ]
}

export default Home
