/* eslint-env jest */
import posts from '../get-posts'
jest.mock('../read-posts-dir')

test('should be an array of objects', () => {
  expect(Array.isArray(posts)).toBe(true)
  console.log(posts[0].toString())
})

test('should have `id` in each item', () => {
  posts.forEach(post => {
    expect(post.id).toExist
  })
})

test('should have a `path` in each item', () => {
  posts.forEach(post => {
    expect(post.path).toExist
    expect(typeof post.path).toBe('string')
  })
})

test('should have a `date` on each item', () => {
  posts.forEach(post => {
    expect(post.path).toExist
    expect(typeof post.path).toBe('string')
    expect(post.path).not.toMatch('./')
  })
})
