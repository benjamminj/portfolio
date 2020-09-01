import { Interpolation } from 'emotion'
import { aboveDesktop, aboveTablet } from './media'
import { SerializedStyles } from '@emotion/core'

export type ResponsiveProp<T> = T | T[]

export type ScreenSizes = 'mobile' | 'tablet' | 'desktop'

/**
 * API
 *
 * Same on all screen sizes:
 * <Component size="small" />
 * <Component size={['small']} />
 *
 * Different for Mobile / Tablet / Desktop
 * <Component size={['small', 'medium', 'large']} />
 *
 * Different for Mobile / Desktop
 * <Component size={['small', 'medium']} />
 */

/**
 *  [small, medium]
 *
 * css
 * font-size: 10px
 *
 * @media (above desktop) {
 *  font-size: 16px
 * }
 */
export const resolveResponsiveValue = <T extends unknown>(
  value: ResponsiveProp<T>,
  getStyles: (responsiveValue: T) => Interpolation
): Interpolation => {
  if (!Array.isArray(value)) {
    return getStyles(value)
  }

  const styles: (Interpolation | SerializedStyles)[] = []
  const transformations = [x => x, aboveTablet, aboveDesktop]

  for (let i = 0; i < value.length; i++) {
    const transform = transformations[i]
    styles.push(transform(getStyles(value[i])))
  }

  return styles
}
