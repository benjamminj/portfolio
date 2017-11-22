/* eslint-env jest */
import { cssUtils } from '../'

const { getGlobalProperty, remToPx } = cssUtils

// TODO -- maybe a good idea to move these DOM/window mocks to a central location?
const getPropertyValue = jest.fn(property => {
  switch (property) {
    case 'font-size':
      return '16px'
    default:
      return property
  }
})
window.getComputedStyle = jest.fn(styles => ({
  getPropertyValue
}))

describe('getGlobalProperty', () => {
  test('calls the appropriate DOM APIs with the desired value', () => {
    getGlobalProperty('test')
    expect(getPropertyValue.mock.calls[0][0]).toBe('test')
  })
})

describe('remToPx', () => {
  test('returns rem amoutn * root pixel value', () => {
    // root px value is 16px
    const result = remToPx('2rem')
    expect(result).toBe(16 * 2)
  })

  test('returns `undefined` with improperly formatted values', () => {
    const result = remToPx('2px')
    expect(result).toBeUndefined()
  })
})
