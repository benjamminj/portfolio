// @flow
import React from 'react'

type TogglerProps = {
  id: string,
  toggledComponent: () => React.Component<*>,
  children: React.Component<*>[]
}

const Toggler = ({id, toggledComponent, children}: TogglerProps) => (
  <div className='Toggler'>
    <input hidden type='checkbox' id={id} />
    {toggledComponent()}
    {children}
  </div>
)

export default Toggler
