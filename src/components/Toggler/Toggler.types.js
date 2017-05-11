// @flow
import React from 'react'

export type TogglerProps = {
  id: string,
  toggledComponent: () => React.Component<*>,
  children: React.Component<*>[]
}
