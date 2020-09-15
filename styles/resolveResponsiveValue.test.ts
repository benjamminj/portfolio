import { resolveResponsiveValue } from './resolveResponsiveValue'

const getStyles = (value: 'small' | 'medium' | 'large') => {
  const styles = {
    small: 10,
    medium: 15,
    large: 20,
  }

  return { fontSize: styles[value] }
}

test('should resolve a non-array value', () => {
  expect(resolveResponsiveValue('small', getStyles)).toEqual({ fontSize: 10 })
})

test('should resolve an array of 1', () => {
  expect(resolveResponsiveValue(['small'], getStyles)).toEqual([
    { fontSize: 10 },
  ])
})

test('should resolve an array of 2 to mobile / tablet styles', () => {
  expect(resolveResponsiveValue(['small', 'large'], getStyles)).toEqual([
    { fontSize: 10 },
    { '@media (min-width: 30rem)': { fontSize: 20 } },
  ])
})

test('should resolve an array of 3 to mobile / tablet / desktop styles', () => {
  expect(
    resolveResponsiveValue(['small', 'medium', 'large'], getStyles)
  ).toEqual([
    { fontSize: 10 },
    { '@media (min-width: 30rem)': { fontSize: 15 } },
    { '@media (min-width: 60rem)': { fontSize: 20 } },
  ])
})
