import { test, expect } from '@playwright/test'

test.describe('/writing', () => {
  test('should show the list of articles', async ({ page }) => {
    let consoleErrorsCount = 0
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrorsCount++
      }
    })

    await page.goto(`/writing`)

    expect(await page.locator('text=Benjamin Johnson').isVisible()).toEqual(
      true
    )

    const numPosts = await page
      .locator('css=[data-testid="PostListItem__title"]')
      .count()

    expect(numPosts).toBeGreaterThan(0)
    expect(consoleErrorsCount).toEqual(0)
  })
})
