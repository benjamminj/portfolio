// @flow
import React from 'react'

import type {TogglerProps} from './Toggler.types'

const Toggler = ({id, toggledComponent, children}: TogglerProps) => (
  <div className='Toggler'>
    <input type='checkbox' id={id} />
    {toggledComponent()}
    {children}
  </div>
)

export default Toggler
