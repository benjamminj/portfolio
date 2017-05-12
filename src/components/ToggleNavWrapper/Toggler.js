// @flow
import React from 'react'
import styled from 'styled-components'

import {Input, mixins, MARGIN_SIZES} from 'src/theme'
import Nav from '../Nav'
import type {TogglerProps} from './Toggler.types'

const ToggleInput = styled(Input)`
  // Hides the navigation by default
  ;& + .Nav .toggle-able {
    visibility: hidden
    opacity: 0
    ${mixins.animations.transitionShort('all')}
  }

  // TODO: refactor into a function
  ;& + .Nav .Menu-Icon {
    visibility: visible
  }

  ;& + .Nav .Close-Icon {
    visibility: hidden
    position: absolute
    left: ${MARGIN_SIZES.base}
  }

  // Shows navigation when checkbox is checked
  ${mixins.pseudo.checked`
    ;& + .Nav .Menu-Icon {
      visibility: hidden
    }

    ;& + .Nav .Close-Icon {
      visibility: visible
    }

    ;& + .Nav .toggle-able {
      visibility: visible
      opacity: 1
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
