import { test, expect } from '@playwright/test'

test.describe('/notes', () => {
  test('should show the list of notes', async ({ page }) => {
    await page.goto('/notes')
    expect(await page.locator('text=Benjamin Johnson').count()).toEqual(1)
    const $notes = await page.$$('css=[href^="/notes/"]')
    expect($notes.length).toBeGreaterThan(0)
  })

  test('should be blocked from search indexing', async ({ page }) => {
    await page.goto('/notes')
    const $meta = page.locator(`css=meta[name="robots"]`)
    expect(await $meta.getAttribute('content')).toEqual('noindex')
  })
})
