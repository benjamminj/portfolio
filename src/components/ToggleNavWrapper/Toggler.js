// @flow
import React from 'react'
import styled from 'styled-components'

import {Input, mixins} from 'src/theme'
import Nav from '../Nav'
import type {TogglerProps} from './Toggler.types'

const ToggleInput = styled(Input)`
  // Hides the navigation by default
  ;& + .Nav .toggle-able {
    visibility: hidden
  }

  // Shows navigation when checkbox is checked
  ${mixins.pseudo.checked`
    ;& + .Nav .toggle-able {
      visibility: visible
    }
  `}
`

const Toggler = ({id, navItems, children}: TogglerProps) => (
  <div className='Toggle-Nav-Wrapper'>
    <ToggleInput invisible type='checkbox' id={id} />
    <Nav navItems={navItems} toggleId={id} />
    {children}
  </div>
)

export default Toggler
