import styled from '@emotion/styled'
import { headingStyle } from '../styles/mixins'

const Heading = styled.div<{ large?: boolean }>`
  ${headingStyle};
  ${props => props.large && 'font-size: 1.5rem;'};
`

export default Heading
