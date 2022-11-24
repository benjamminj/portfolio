import { test, expect } from '@playwright/test';

test.describe('/links/[link]', () => {
	test('should redirect to the specified link', async ({ page }) => {
		await page.goto('/links/twitter');
		expect(await page.url()).toEqual('https://twitter.com/benjamminj');
	});
});
