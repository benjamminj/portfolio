// @flow
import React from 'react'

// Evenutally will hold the header & footer
export default ({children}: {children?: *[]}) => (
  <div className='page'>
    {children}
  </div>
)
