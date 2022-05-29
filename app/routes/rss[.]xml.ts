import type { LoaderFunction } from '@remix-run/node'
import { list } from '~/lib/posts.server'
import { posts as content } from '~/generated/posts.generated.server'

const escapeCdata = (str: string) => {
  return str.replace(/\]\]>/g, ']]]]><![CDATA[>')
}

/**
 * Escapes special characters into HTML-safe entities.
 */
const escapeHtml = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export const loader: LoaderFunction = async ({ request }) => {
  const posts = await list({ include: ['html'] })
  console.log('POSTS >>', posts)
  const host =
    request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')

  if (!host) throw new Error('Could not determine domain URL.')

  const protocol = host.includes('localhost') ? 'http' : 'https'

  const domain = `${protocol}://${host}`

  const getItemXML = (post: typeof posts[0]) => {
    // TODO: this should be the whole dang post, not just the description.
    const description = post.description
      ? `<description><![CDATA[${escapeCdata(escapeHtml(post.html))}]]></description>` // prettier-ignore
      : ''

    return `
      <item>
        <title><![CDATA[${escapeCdata(post.title)}]]></title>
        ${description}
        <author><![CDATA[${escapeCdata(
          'benjamin.d.johnson@icloud.com (Ben Johnson)'
        )}]]></author>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        ${post.tags
          .map((tag) => {
            return `<category domain="${domain}/${tag}">${tag}</category>`
          })
          .join('\n')}
        <link>${domain}/${post.slug}</link>
        <guid>${domain}/${post.slug}</guid>
      </item>
    `.trim()
  }
  // TODO: tidy up into sections, dangit.
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
  `.trim()

  const MINUTE = 60
  const DAY = 24 * 60 * MINUTE

  return new Response(rss, {
    headers: {
      'Cache-Control': `public, max-age=${MINUTE * 10}, s-maxage=${DAY}`,
      // TODO: could dynamically also do `application/rss+xml` depending on the
      // incoming headers??
      'Content-Type': 'application/xml',
      'Content-Length': String(Buffer.byteLength(rss)),
    },
  })
}
