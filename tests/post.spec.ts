import { test, expect } from '@playwright/test';

test.describe('/[post]', () => {
	test('should display the post', async ({ page }) => {
		await page.goto('/mocking-fetch');
		const $title = page.locator('text=benjamin johnson').first();
		expect(await $title.isVisible()).toEqual(true);

		const pageContent = {
			title: 'Mocking the fetch API with Jest',
			description: `Why should we mock the network? We'll take a look at why it's important to mock window.fetch and a couple methods we can use in our test suites.`,
			imageAlt: `Abstract swirling colors of blue and red`,
		};

		const metaContent = [
			['name', 'author', 'Benjamin Johnson'],
			['name', 'description', pageContent.description],
			['name', 'twitter:card', 'summary'],
			['name', 'twitter:site', '@benjamminj'],
			['name', 'twitter:title', pageContent.title],
			['name', 'twitter:creator', '@benjamminj'],
			['property', 'og:title', pageContent.title],
			['property', 'og:description', pageContent.description],
			['property', 'og:type', 'website'],
		];

		await Promise.all(
			metaContent.map(async ([key, name, content]) => {
				const $meta = page.locator(`css=meta[${key}="${name}"]`);
				expect(await $meta.getAttribute('content')).toEqual(content);
			})
		);

		const $header = page.locator(`text=${pageContent.title}`);
		expect(await $header.isVisible()).toEqual(true);
		expect(await page.locator(`text=2020-12-30`).isVisible()).toEqual(true);

		const $footer = page.locator(`data-testid=SlugPage__footer`);
		expect(await $footer.isVisible()).toEqual(true);

		expect(await $footer.locator('text=Tags').isVisible()).toEqual(true);

		const tags = ['testing', 'javascript', 'jest'];
		await Promise.all(
			tags.map(async (tag) => {
				const $tag = $footer.locator(`text=#${tag}`);
				expect(await $tag.getAttribute('href')).toEqual(`/tags/${tag}`);
			})
		);
	});

	test('should link to externally published blog posts', async ({ page }) => {
		await page.goto('/how-css-works-parsing-and-painting-in-the-critical-rendering-path');
		const $link = page.locator('text=Read the full article on LogRocket.');
		expect(await $link.getAttribute('href')).toEqual(
			'https://blog.logrocket.com/how-css-works-parsing-painting-css-in-the-critical-rendering-path-b3ee290762d3/'
		);
	});
});

test.describe('/[post] (chromium only)', () => {
	// see https://github.com/microsoft/playwright/issues/13037
	test.skip(
		({ browserName }) => browserName !== 'chromium',
		'`clipboard-read/write` permissions can only be granted in Chromium'
	);

	test.beforeEach(async ({ context }) => {
		await context.grantPermissions(['clipboard-read', 'clipboard-write']);
	});

	test.afterEach(async ({ context }) => {
		context.clearPermissions();
	});

	test('should allow copy-pasting code snippets', async ({ page }) => {
		await page.goto('/mocking-fetch');
		const $copyButton = page.locator(`text=Copy to clipboard`).first();
		await $copyButton.click();
		const $copySuccess = page.locator(`text=Copied!`).first();
		expect(await $copySuccess.isVisible()).toEqual(true);
		const evaluated = await page.evaluate(() => {
			return navigator.clipboard.readText();
		});

		// TODO: there may be a better locator we can use, perhaps the [language-]
		// tag or relative to the button itself.
		const snippet = await page.locator('pre code').first().innerText();

		expect(evaluated).toEqual(snippet);
	});
});
