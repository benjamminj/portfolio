import { test, expect } from '@playwright/test'

test.describe('/notes/[note]', () => {
  test('should display the note', async ({ page }) => {
    await page.goto('/notes/code-comments')

    expect(await page.locator('text=Benjamin Johnson').count()).toEqual(1)
    const $header = page.locator('text="Code comments"')
    expect(await $header.count()).toEqual(1)

    const $footer = page.locator(`data-testid=SlugPage__footer`)
    expect(await $footer.isVisible()).toEqual(true)

    expect(await $footer.locator('text=2021-01-01').isVisible()).toEqual(true)
    expect(await $footer.locator('text=Last updated').isVisible()).toEqual(true)

    const tags = ['documentation', 'tech-debt', 'philosophy', 'clean-code']
    await Promise.all(
      tags.map(async tag => {
        const $tag = page.locator(`text=#${tag}`)
        expect(await $tag.getAttribute('href')).toEqual(null)
      })
    )
  })

  test('should be blocked from search indexing', async ({ page }) => {
    await page.goto('/notes/code-comments')
    const $meta = page.locator(`css=meta[name="robots"]`)
    expect(await $meta.getAttribute('content')).toEqual('noindex')
  })
})
