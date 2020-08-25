import { ReactNode } from 'react'
import { jsx, InterpolationWithTheme } from '@emotion/core'
import { fonts, spacing } from '../styles/theme'
/** @jsx jsx */ jsx

export type TextVariantToken =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle'
  | 'body'
  | 'code'
  | 'caption'
  | 'overline'

interface TextVariantConfig {
  scale: number
  lineHeight: number
  letterSpacing: number
  font: 'primary' | 'secondary' | 'mono'
  transform: 'none' | 'uppercase' | 'lowercase'
  weight: 'lighter' | 'normal' | 'bold'
}

export const textVariants: { [key in TextVariantToken]: TextVariantConfig } = {
  h1: {
    scale: 3,
    weight: 'bold',
    letterSpacing: -0.06,
    font: 'secondary',
    lineHeight: 1.25,
    transform: 'none',
  },
  h2: {
    scale: 2.5,
    weight: 'bold',
    letterSpacing: -0.06,
    font: 'secondary',
    lineHeight: 1.25,
    transform: 'none',
  },
  h3: {
    scale: 2,
    weight: 'bold',
    letterSpacing: -0.06,
    font: 'secondary',
    lineHeight: 1.25,
    transform: 'none',
  },
  h4: {
    scale: 1.5,
    weight: 'bold',
    letterSpacing: -0.06,
    font: 'secondary',
    lineHeight: 1.25,
    transform: 'none',
  },
  h5: {
    scale: 1.25,
    weight: 'bold',
    letterSpacing: -0.06,
    font: 'secondary',
    lineHeight: 1.25,
    transform: 'none',
  },
  h6: {
    scale: 1.125,
    weight: 'bold',
    letterSpacing: -0.06,
    font: 'secondary',
    lineHeight: 1.25,
    transform: 'none',
  },
  subtitle: {
    scale: 1.125,
    weight: 'bold',
    letterSpacing: 0,
    font: 'primary',
    lineHeight: 1.5,
    transform: 'none',
  },
  body: {
    scale: 1,
    weight: 'normal',
    letterSpacing: 0,
    font: 'primary',
    lineHeight: 1.5,
    transform: 'none',
  },
  code: {
    scale: 1,
    weight: 'normal',
    letterSpacing: 0,
    font: 'mono',
    lineHeight: 1.5,
    transform: 'none',
  },
  caption: {
    scale: 0.75,
    weight: 'normal',
    letterSpacing: 0,
    font: 'secondary',
    lineHeight: 1.25,
    transform: 'none',
  },
  overline: {
    scale: 0.875,
    weight: 'normal',
    letterSpacing: 0,
    font: 'secondary',
    lineHeight: 1,
    transform: 'uppercase',
  },
}

export const getFontStylesFromVariant = (
  variant: TextVariantToken
): InterpolationWithTheme<any> => {
  const { lineHeight, font, scale, weight, transform } = textVariants[variant]
  return {
    fontFamily: fonts[font],
    fontWeight: weight,
    fontSize: scale * spacing.base,
    lineHeight,
    textTransform: transform,
  }
}

export interface TextProps {
  children: ReactNode
  variant?: TextVariantToken
  className?: string
}

export const Text = ({ children, variant = 'body', ...rest }: TextProps) => {
  return (
    <span {...rest} css={getFontStylesFromVariant(variant)}>
      {children}
    </span>
  )
}
