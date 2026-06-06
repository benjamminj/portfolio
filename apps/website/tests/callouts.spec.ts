import { test, expect } from "@playwright/test";

test.describe("callouts", () => {
	test("should render all callout variants correctly", async ({ page }) => {
		await page.goto("/test");

		const variantConfig = {
			note: { icon: "💬" },
			tip: { icon: "💡" },
			important: { icon: "📣" },
			warning: { icon: "⚠️" },
			caution: { icon: "🚨" },
		} as const;

		for (const [variant, config] of Object.entries(variantConfig)) {
			const $callout = page.locator(`blockquote[data-variant="${variant}"]`);

			// Verify callout exists and is visible
			await expect($callout).toBeVisible();

			// Verify icon is present
			const $icon = $callout.locator(`div[aria-label="${variant}"]`);
			await expect($icon).toBeVisible();
			await expect($icon).toHaveText(config.icon);

			// Verify inner content renders
			const $link = $callout.getByRole("link", { name: "link to google" });
			await expect($link).toBeVisible();
			await expect($link).toHaveAttribute("href", "https://google.com");

			const $code = $callout.locator("code", { hasText: "inline code" });
			await expect($code).toBeVisible();
		}
	});
});
