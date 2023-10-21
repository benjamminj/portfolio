import { PostService } from '@/lib/posts-service.server';

const escapeCdata = (str: string) => {
	return str.replace(/\]\]>/g, ']]]]><![CDATA[>');
};

export const dynamic = 'force-static'
export async function GET(request: Request) {
	const posts = await PostService.list({ include: ['html'] });
	const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');

	if (!host) console.error('Could not determine domain URL.');

	const protocol = host?.includes('localhost') ? 'http' : 'https';

	const domain = `${protocol}://${host}`;

	const getItemXML = (post: typeof posts[0]) => {
		if (!post.html) return '';

		const description = post.html
			? `<description><![CDATA[${escapeCdata(post.html)}]]></description>` // prettier-ignore
			: '';

		return `
      <item>
        <title><![CDATA[${escapeCdata(post.title)}]]></title>
        ${description}
        <author><![CDATA[${escapeCdata('Benjamin Johnson')}]]></author>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        ${post.tags
					.map((tag) => {
						return `<category domain="${domain}/${tag}">${tag}</category>`;
					})
					.join('\n')}
        <link>${domain}/${post.slug}</link>
        <guid>${domain}/${post.slug}</guid>
      </item>
    `.trim();
	};

	const rss = `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml" />
        <title>benjaminjohnson.me</title>
        <link>${domain}</link>
        <description>Benjamin Johnson, Principal Frontend Engineer. Sometimes I write things.</description>
        <language>en-us</language>
        <ttl>40</ttl>
        ${posts.map(getItemXML).join('\n')}
      </channel>
    </rss>
  `.trim();

	const MINUTE = 60;
	const DAY = 24 * 60 * MINUTE;

	return new Response(rss, {
		headers: {
			'Cache-Control': `public, max-age=${MINUTE * 10}, s-maxage=${DAY}`,
			'Content-Type': 'application/xml',
			'Content-Length': String(Buffer.byteLength(rss))
		}
	});
}
