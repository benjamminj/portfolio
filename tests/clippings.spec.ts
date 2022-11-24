import { test, expect } from '@playwright/test';

test.describe('/clippings', () => {
	test('should display the clippings page', async ({ page }) => {
		await page.goto('/clippings');
		const $title = page.locator('text=benjamin johnson').first();
		expect(await $title.isVisible()).toEqual(true);

		const $table = page.locator('role=table');
		expect(await $table.isVisible()).toEqual(true);

		const columnValues = ['Link', 'Tags'];
		const $columns = await page.$$('role=columnheader');

		// Validate that the columns are correct
		for (let i = 0; i < $columns.length; i++) {
			const $column = $columns[i];
			const $header = await $column.$(`text=${columnValues[i]}`);
			expect(await $header?.isVisible()).toEqual(true);
		}

		const $rows = await page.$$('css=[data-testid="Clippings__tablebody"] >> role=row');

		// Go thru each row and validate that A) the row has the correct
		// cells with the correct content.
		//
		// Do not validate actual content, since that is somewhat dynamic, just
		// validate that links & tags exist
		for (const $row of $rows) {
			const [$linkCell, $tagsCell] = await $row.$$('role=cell');
			const $link = await $linkCell.$('role=link');
			const $tags = await $tagsCell.$$('role=link');

			expect(await $link?.isVisible()).toEqual(true);
			const $linkHref = await $link?.getAttribute('href');
			expect($linkHref?.startsWith('http')).toEqual(true);

			for (const $tag of $tags) {
				expect(await $tag.isVisible()).toEqual(true);
				const $tagLink = await $tag.getAttribute('href');
				expect($tagLink?.startsWith('/tags')).toEqual(true);
			}
		}
	});
});
