import React from 'react'
import styled from 'react-emotion'
import { headingStyle } from '../styles/mixins'

const Heading = styled.div`
  ${headingStyle};
  ${props => props.large && 'font-size: 1.5rem;'};
`

export default Heading
