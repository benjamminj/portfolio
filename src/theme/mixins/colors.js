export const genDefaultBackground = color => props => `background: ${props.background || color}`
export const background = genDefaultBackground('initial')

export const color = props => `color: ${props.color || 'inherit'}`
