import { css, jsx } from '@emotion/core'
import { CSSProperties, ReactNode } from 'react'
import {
  resolveResponsiveValue,
  ResponsiveProp,
} from '../styles/resolveResponsiveValue'
import { spacing, SpacingToken } from '../styles/theme'
/** @jsxImportSource @emotion/core */ jsx

type BoxSpacingToken = SpacingToken | 'none'
type ResponsiveBoxSpacingToken = ResponsiveProp<BoxSpacingToken>

interface BoxProps {
  /** Contents of the box */
  children?: ReactNode
  /** Allows customization of the rendered HTML under the hood */
  component?: keyof HTMLElementTagNameMap
  /**
   * Amount that the Box "bleeds" outside of its own container. Defaults to `0` if
   * not provided
   */
  bleed?: ResponsiveBoxSpacingToken
  /**
   * Amount that the Box "bleeds" outside of its own container on the X-axis.
   *
   * Overrides the "bleed" property.
   */
  bleedX?: ResponsiveBoxSpacingToken
  /**
   * Amount that the Box "bleeds" outside of its own container on the Y-axis.
   *
   * Overrides the "bleed" property.
   */
  bleedY?: ResponsiveBoxSpacingToken
  /**
   * Amount that the Box "bleeds" outside of its own container on the top side.
   *
   * Overrides the "bleedY" and "bleed" properties.
   */
  bleedTop?: ResponsiveBoxSpacingToken
  /**
   * Amount that the Box "bleeds" outside of its own container on the bottom side.
   *
   * Overrides the "bleedY" and "bleed" properties.
   */
  bleedBottom?: ResponsiveBoxSpacingToken
  /**
   * Amount that the Box "bleeds" outside of its own container on the left side.
   *
   * Overrides the "bleedX" and "bleed" properties.
   */
  bleedLeft?: ResponsiveBoxSpacingToken
  /**
   * Amount that the Box "bleeds" outside of its own container on the right side.
   *
   * Overrides the "bleedX" and "bleed" properties.
   */
  bleedRight?: ResponsiveBoxSpacingToken
  /**
   * Allows overriding the applied CSS. This should be a last resort over using
   * the built-in styling props
   */
  className?: string
  /** Corresponds 1:1 to the CSS `display` rule */
  display?: ResponsiveProp<CSSProperties['display']>
  /** Padding on all sides for the "box". If not provided, will default to `0` */
  padding?: ResponsiveBoxSpacingToken
  /**
   * Shorthand for padding on both the left and the right sides. This overrides
   * the values in `padding` if it is also provided.
   */
  paddingX?: ResponsiveBoxSpacingToken
  /**
   * Shorthand for padding on both the top and the bottom sides. This overrides
   * the values in `padding` if it is also provided.
   */
  paddingY?: ResponsiveBoxSpacingToken
  /**
   * Set the padding on the left side of the box. If provided, this overrides the
   * values in `padding` _and_ `paddingX`
   */
  paddingLeft?: ResponsiveBoxSpacingToken
  /**
   * Set the padding on the right side of the box. If provided, this overrides the
   * values in `padding` _and_ `paddingX`
   */
  paddingRight?: ResponsiveBoxSpacingToken
  /**
   * Set the padding on the top side of the box. If provided, this overrides the
   * values in `padding` _and_ `paddingY`
   */
  paddingTop?: ResponsiveBoxSpacingToken
  /**
   * Set the padding on the bottom side of the box. If provided, this overrides the
   * values in `padding` _and_ `paddingY`
   */
  paddingBottom?: ResponsiveBoxSpacingToken
}

const resolveSpacingToken = (token: BoxSpacingToken) => {
  if (token === 'none') return 0
  return spacing[token]
}

const applyTokenToRule = (
  rule: keyof CSSProperties,
  getValue = resolveSpacingToken
) => (token: BoxSpacingToken) => {
  return {
    [rule]: getValue(token),
  }
}

const resolvePaddingProp = (
  token: ResponsiveBoxSpacingToken,
  rule: keyof CSSProperties
) => {
  return resolveResponsiveValue(token, applyTokenToRule(rule))
}

const resolveBleedToken = (token, rule) => {
  return resolveResponsiveValue(
    token,
    applyTokenToRule(rule, v => `calc(${resolveSpacingToken(v)} * -1)`)
  )
}

const getBleedStyles = ({
  bleed,
  bleedY,
  bleedX,
  bleedTop,
  bleedBottom,
  bleedLeft,
  bleedRight,
}: Pick<
  BoxProps,
  | 'bleed'
  | 'bleedY'
  | 'bleedX'
  | 'bleedTop'
  | 'bleedBottom'
  | 'bleedLeft'
  | 'bleedRight'
>) => {
  const styles = css([
    resolveBleedToken(bleedLeft || bleedX || bleed, 'marginLeft'),
    resolveBleedToken(bleedRight || bleedX || bleed, 'marginRight'),
    resolveBleedToken(bleedTop || bleedY || bleed, 'marginTop'),
    resolveBleedToken(bleedBottom || bleedY || bleed, 'marginBottom'),
  ])

  return styles
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
  bleed = 'none',
  bleedY,
  bleedX,
  bleedTop,
  bleedBottom,
  bleedLeft,
  bleedRight,
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
      getBleedStyles({
        bleed,
        bleedY,
        bleedX,
        bleedTop,
        bleedBottom,
        bleedLeft,
        bleedRight,
      }),
    ],
    children,
  })
}
