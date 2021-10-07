import { test, expect } from '@playwright/test'

test.describe('/[post]', () => {
  test('should display the post', async ({ page }) => {
    await page.goto('/mocking-fetch')
    const $title = page.locator('text=Benjamin Johnson')
    expect(await $title.isVisible()).toEqual(true)

    const pageContent = {
      title: 'Mocking the fetch API with Jest',
      description: `Why should we mock the network? We'll take a look at why it's important to mock window.fetch and a couple methods we can use in our test suites.`,
      imageAlt: `Abstract swirling colors of blue and red`,
    }

    const metaContent = [
      ['name', 'author', 'Benjamin Johnson'],
      ['name', 'description', pageContent.description],
      ['name', 'twitter:card', 'summary'],
      ['name', 'twitter:site', '@benjamminj'],
      ['name', 'twitter:title', pageContent.title],
      ['name', 'twitter:creator', '@benjamminj'],
      ['property', 'og:title', pageContent.title],
      ['property', 'og:description', pageContent.description],
      ['property', 'og:type', 'website'],
    ]

    await Promise.all(
      metaContent.map(async ([key, name, content]) => {
        const $meta = page.locator(`css=meta[${key}="${name}"]`)
        expect(await $meta.getAttribute('content')).toEqual(content)
      })
    )

    const $header = page.locator(`text=${pageContent.title}`)
    expect(await $header.isVisible()).toEqual(true)
    const $footer = page.locator(`data-testid=SlugPage__footer`)
    expect(await $footer.isVisible()).toEqual(true)

    expect(await $footer.locator('text=2020-12-30').isVisible()).toEqual(true)
    expect(await $footer.locator('text=Last updated').isVisible()).toEqual(true)

    const tags = ['testing', 'javascript', 'jest']
    await Promise.all(
      tags.map(async tag => {
        const $tag = page.locator(`text=#${tag}`)
        expect(await $tag.getAttribute('href')).toEqual(`/tags/${tag}`)
      })
    )
  })
})
