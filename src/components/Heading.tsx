import styled from '@emotion/styled'
import { headingStyle } from '../../styles/mixins'

/**
 * A heading component.
 *
 * Has 2 variations, large and regular.
 */
export const Heading = styled.div<{ large?: boolean }>`
  ${headingStyle};
  ${props => props.large && 'font-size: 1.5rem;'};
`
