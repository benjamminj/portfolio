import { test, expect } from "@playwright/test";

test.describe("/clippings", () => {
	test("should display the clippings page", async ({ page }) => {
		await page.goto("/clippings");
		const $title = page.locator("text=benjamin johnson").first();
		expect(await $title.isVisible()).toEqual(true);

		const $listItems = await page.getByRole("listitem");

		// Go thru each list item and validate that it has the correct
		// structure with links and tags.
		for (const $listItem of await $listItems.all()) {
			const $link = await $listItem.getByRole("link").first();
			expect(await $link.isVisible()).toEqual(true);
			const $linkHref = await $link.getAttribute("href");
			expect($linkHref?.startsWith("http")).toEqual(true);

			const $tags = await $listItem.getByRole("link", { name: /tag/i });
			for (const $tag of await $tags.all()) {
				expect(await $tag.isVisible()).toEqual(true);
				const $tagLink = await $tag.getAttribute("href");
				expect($tagLink?.startsWith("/tags")).toEqual(true);
			}
		}
	});
});
