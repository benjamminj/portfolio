import { test, expect } from '@playwright/test'

test.describe('/tags', () => {
  test('should show all writings associated with a tag', async ({ page }) => {
    const tag = 'javascript'
    await page.goto(`/tags/${tag}`)
    const $title = await page.$('text=Benjamin Johnson')
    expect(await $title.isVisible()).toEqual(true)

    const $heading = await page.$$(`css=*:not(a):text("#${tag}")`)
    expect($heading.length).toEqual(1)

    const $writingLinks = await page.$$('data-testid=PostListItem__title')
    expect($writingLinks.length).toBeGreaterThan(0)

    const $links = await page.$$(`a:text("#${tag}")`)
    expect($links.length).toEqual($writingLinks.length)
  })
})
