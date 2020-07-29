export {}

test('smoketest', async () => {
  await page.goto('https://www.benjaminjohnson.me/blog')
  await page.$('text="benjaminjohnson.me"')
  const blogLinks = await page.$$('[href^="/blog"]')
  expect(blogLinks.length).toBeGreaterThan(0)
})
