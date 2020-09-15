import { jsx } from '@emotion/core'
import { CSSProperties, ReactNode } from 'react'
import {
  resolveResponsiveValue,
  ResponsiveProp,
} from '../../styles/resolveResponsiveValue'
import { spacing, SpacingToken } from '../../styles/theme'
/** @jsx jsx */ jsx

type BoxPaddingToken = SpacingToken | 'none'
type ResponsiveBoxPaddingToken = ResponsiveProp<BoxPaddingToken>
interface BoxProps {
  /** Contents of the box */
  children?: ReactNode
  /** Allows customization of the rendered HTML under the hood */
  component?: keyof HTMLElementTagNameMap
  /**
   * Allows overriding the applied CSS. This should be a last resort over using
   * the built-in styling props
   */
  className?: string
  /** Corresponds 1:1 to the CSS `display` rule */
  display?: ResponsiveProp<CSSProperties['display']>
  /** Padding on all sides for the "box". If not provided, will default to `0` */
  padding?: ResponsiveBoxPaddingToken
  /**
   * Shorthand for padding on both the left and the right sides. This overrides
   * the values in `padding` if it is also provided.
   */
  paddingX?: ResponsiveBoxPaddingToken
  /**
   * Shorthand for padding on both the top and the bottom sides. This overrides
   * the values in `padding` if it is also provided.
   */
  paddingY?: ResponsiveBoxPaddingToken
  /**
   * Set the padding on the left side of the box. If provided, this overrides the
   * values in `padding` _and_ `paddingX`
   */
  paddingLeft?: ResponsiveBoxPaddingToken
  /**
   * Set the padding on the right side of the box. If provided, this overrides the
   * values in `padding` _and_ `paddingX`
   */
  paddingRight?: ResponsiveBoxPaddingToken
  /**
   * Set the padding on the top side of the box. If provided, this overrides the
   * values in `padding` _and_ `paddingY`
   */
  paddingTop?: ResponsiveBoxPaddingToken
  /**
   * Set the padding on the bottom side of the box. If provided, this overrides the
   * values in `padding` _and_ `paddingY`
   */
  paddingBottom?: ResponsiveBoxPaddingToken
}

const resolvePaddingToken = (token: BoxPaddingToken) => {
  if (token === 'none') return 0
  return spacing[token]
}

const applyTokenToRule = (rule: keyof CSSProperties) => (
  token: BoxPaddingToken
) => {
  return {
    [rule]: resolvePaddingToken(token),
  }
}

const resolvePaddingProp = (
  token: ResponsiveBoxPaddingToken,
  rule: keyof CSSProperties
) => {
  if (!token) return {}
  return resolveResponsiveValue(token, applyTokenToRule(rule))
}

/**
 * `Box` is the basic building block for layout and spacing. Rather than applying
 * padding and margin directly on markup, most elements should use `Box` under the
 * hood.
 */
export const Box = ({
  children,
  padding = 'none',
  paddingX,
  paddingY,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  className,
  display,
  component = 'div',
  ...props
}: BoxProps) => {
  return jsx(component, {
    ...props,
    className,
    css: [
      resolveResponsiveValue(display, display => ({ display })),
      resolvePaddingProp(paddingLeft || paddingX || padding, 'paddingLeft'),
      resolvePaddingProp(paddingRight || paddingX || padding, 'paddingRight'),
      resolvePaddingProp(paddingTop || paddingY || padding, 'paddingTop'),
      resolvePaddingProp(paddingBottom || paddingY || padding, 'paddingBottom'),
    ],
    children,
  })
}
