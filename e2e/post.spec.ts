import { test, expect } from '@playwright/test'

test.describe('/[post]', () => {
  test.beforeEach(async ({ context }) => {
    await context.grantPermissions(['clipboard-read'])
  })

  test.afterEach(async ({ context }) => {
    context.clearPermissions()
  })

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
    expect(await page.locator(`text=2020-12-30`).isVisible()).toEqual(true)

    const $footer = page.locator(`data-testid=SlugPage__footer`)
    expect(await $footer.isVisible()).toEqual(true)

    expect(await $footer.locator('text=Tags').isVisible()).toEqual(true)

    const tags = ['testing', 'javascript', 'jest']
    await Promise.all(
      tags.map(async (tag) => {
        const $tag = $footer.locator(`text=#${tag}`)
        expect(await $tag.getAttribute('href')).toEqual(`/tags/${tag}`)
      })
    )
  })

  test('should allow copy-pasting code snippets', async ({ page }) => {
    await page.goto('/mocking-fetch')
    const $copyButton = page.locator(`text=Copy to clipboard`).first()
    expect(await $copyButton.isVisible()).toEqual(true)
    await $copyButton.click()
    const $copySuccess = page.locator(`text=Copied!`).first()
    expect(await $copySuccess.isVisible()).toEqual(true)
    const evaluated = await page.evaluate(() => {
      return navigator.clipboard.readText()
    })

    // TODO: there may be a better locator we can use, perhaps the [language-]
    // tag or relative to the button itself.
    const snippet = await page.locator('pre code').first().innerText()

    expect(evaluated).toEqual(snippet)
  })
})
