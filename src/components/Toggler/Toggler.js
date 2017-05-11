// @flow
import React from 'react'

import {Input} from 'src/theme'
import type {TogglerProps} from './Toggler.types'

const Toggler = ({id, toggledComponent, children}: TogglerProps) => (
  <div className='Toggler'>
    <Input invisible type='checkbox' id={id} />
    {toggledComponent()}
    {children}
  </div>
)

export default Toggler
