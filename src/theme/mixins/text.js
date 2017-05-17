export const centered = props => (props.centered ? `text-align: center` : '')

export const genDefaultFontSize = size => props => `font-size: ${props.fontSize || size}`
export const fontSize = genDefaultFontSize('inherit')

export const underlineProp = props => props.underline ? `text-decoration: underline` : ''
