import { Interpolation } from 'emotion'
import { aboveDesktop, aboveTablet } from './media'
import { SerializedStyles } from '@emotion/core'

/**
 * Passing an array of values will apply the values on different screen sizes
 * 
 * @example
 * ```tsx
 * // "large" on all screen sizes
 * <Component size="large" />
 * 
 * // "small" below tablet, "large" everywhere else
 * <Component size={["small", "large"]} />
 * 
 * // "small" below tablet, "medium" below desktop, "large" everywhere else
 * <Component size={["small", "medium", "large"]} />
 * ```
 */
export type ResponsiveProp<T> = T | T[]

export type ScreenSizes = 'mobile' | 'tablet' | 'desktop'

/**
 * Take a responsive prop and turn it into a CSS styles object
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
