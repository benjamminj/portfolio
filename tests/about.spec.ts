import { test, expect } from "@playwright/test";

test("should display the about page", async ({ page }) => {
	await page.goto("/about");
	const $title = page.locator("text=benjamin johnson").first();
	expect(await $title.isVisible()).toEqual(true);

	const $heading = await page.getByRole("heading", {
		level: 1,
		name: "about me",
	});

	await expect(await $heading).toBeVisible();
});
