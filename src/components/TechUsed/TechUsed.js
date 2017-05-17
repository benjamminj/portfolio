import React from 'react'
import styled from 'styled-components'
import rgba from 'hex-rgba'

import {COLORS} from 'src/theme'

const List = styled.ul`
  display: flex
  flex-wrap: wrap
`

const TechItem = styled.li`
  border-radius: 2px
  background: ${rgba(COLORS.black, 10)}
  margin: 0.25rem 0.25rem 0 0
  padding: 0.25rem
`

const TechUsed = (props) => (
  <List className='Tech-Used'>
    {
      props.items.map(item => (
        <TechItem key={item}>{item}</TechItem>
      ))
    }
  </List>
)

export default TechUsed
