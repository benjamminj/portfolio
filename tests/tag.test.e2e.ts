export {}

const BASE_URL = process.env.TEST_BASE_URL

test('smoketest', async () => {
  const tag = 'javascript'
  await page.goto(`${BASE_URL}/tags/${tag}`)
  await page.$('text="benjaminjohnson.me"')

  // heading
  await page.$(`css=*:not(a) >> text="#${tag}"`)

  const blogLinks = await page.$$('[href^="/blog/"]')
  expect(blogLinks.length).toBeGreaterThan(0)

  const tags = await page.$$(`a >> text="#${tag}"`)
  expect(tags.length).toEqual(blogLinks.length)
})
