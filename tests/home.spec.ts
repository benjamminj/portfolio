import { test, expect } from '@playwright/test';

test.describe('/', () => {
	test('should display the home page', async ({ page }) => {
		await page.goto('/');
		const $title = page.locator('text=benjamin johnson').first();
		expect(await $title.isVisible()).toEqual(true);

		const navigationLinks = [
			['./writing', '/writing'],
			['./about', '/about']
		];

		await Promise.all(
			navigationLinks.map(async ([text, href]) => {
				const $element = page.locator(`text=${text}`);
				expect(await $element.isVisible()).toEqual(true);
				expect(await $element.getAttribute('href')).toEqual(href);
			})
		);
	});
});
