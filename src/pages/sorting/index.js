import React from 'react'
import PropTypes from 'prop-types'
import { Heading, Link } from '../../components'

const SortingPage = () => (
  <div>
    <Heading large>
      <h1>This will be the wrapper/menu</h1>
    </Heading>
    <p>This will contain the sorting stuff.</p>
    <Link to="/sorting/bubble-sort/">Bubble Sort</Link>
  </div>
)

export default SortingPage
