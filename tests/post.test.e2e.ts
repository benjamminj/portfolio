export {}

const BASE_URL = process.env.TEST_BASE_URL

test('smoketest', async () => {
  await page.goto(`${BASE_URL}/blog/mocking-fetch`)
  await page.waitForSelector('text="benjaminjohnson.me"')

  const pageContent = {
    title: 'Mocking the fetch API with Jest',
    description: `Why should we mock the network? We'll take a look at why it's important to mock window.fetch and a couple methods we can use in our test suites.`,
    imageAlt: `Abstract swirling colors of blue and red`,
  }

  // Validate metadata
  const metaContent = [
    ['author', 'Benjamin Johnson'],
    ['description', pageContent.description],
    ['twitter:card', 'summary'],
    ['twitter:site', '@benjamminj'],
    ['twitter:title', pageContent.title],
    ['twitter:creator', '@benjamminj'],
    ['og:title', pageContent.title],
    ['og:description', pageContent.description],
    ['twitter:image:alt', pageContent.imageAlt],
    ['og:image:alt', pageContent.imageAlt],
    ['og:type', 'website'],
  ]

  const metaTags = await Promise.all(
    metaContent.map(([name, content]) => {
      return page.$(`css=meta[name="${name}"][content="${content}"]`)
    })
  )
  expect(metaTags.length).toEqual(metaContent.length)

  // Validate specific page content
  const selectors = [
    `h1 >> text="${pageContent.title}"`,
    'text="04-26-2019 — 12 min read"',
    `[alt="${pageContent.imageAlt}"]`,
    `text="#testing"`,
    `text="#javascript"`,
    `text="#jest"`,
  ]

  await Promise.all(selectors.map(s => page.waitForSelector(s)))
})
