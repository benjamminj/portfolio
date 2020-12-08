import styled from '@emotion/styled'
import {
  border,
  BorderProps,
  color,
  ColorProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
} from 'styled-system'

type BoxProps = ColorProps &
  LayoutProps &
  BorderProps &
  SpaceProps &
  TypographyProps

export const Box = styled.div<BoxProps>(
  color,
  layout,
  border,
  space,
  typography
)
