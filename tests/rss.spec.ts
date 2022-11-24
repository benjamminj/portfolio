import { test, expect } from '@playwright/test';
import Parser from 'rss-parser';

const parser = new Parser();

test.describe('/feed/rss.xml', () => {
	// No need to run this test on other browsers, it's 100% API based.
	test.skip(({ browserName }) => browserName !== 'chromium');

	test('RSS feed can be parsed', async ({ request }) => {
		const rss = await request.get('/feed/rss.xml');
		const feed = await parser.parseString(await rss.text());

		expect(feed.title).toEqual('benjaminjohnson.me');
		expect(feed.description).toEqual(
			'Benjamin Johnson, Principal Frontend Engineer. Sometimes I write things.'
		);
		expect(feed.items.length).not.toEqual(0);
		for (const item of feed.items) {
			expect(item.title).toBeTruthy();
			expect(item.content).toBeTruthy();
			expect(item.pubDate).toBeTruthy();
		}
	});
});
