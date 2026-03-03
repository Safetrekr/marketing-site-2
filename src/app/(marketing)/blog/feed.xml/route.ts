// src/app/(marketing)/blog/feed.xml/route.ts

import { getAllPosts } from '@/lib/blog'
import { getAuthor } from '@/lib/blog-authors'
import { SITE_CONFIG } from '@/lib/config/site'

export async function GET() {
  const posts = await getAllPosts()

  const items = posts
    .slice(0, 20) // Limit feed to 20 most recent
    .map((post) => {
      const author = getAuthor(post.author)
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${SITE_CONFIG.url}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_CONFIG.url}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${author ? `<dc:creator><![CDATA[${author.name}]]></dc:creator>` : ''}
      ${post.tags.map((tag) => `<category>${tag}</category>`).join('\n      ')}
    </item>`
    })
    .join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
>
  <channel>
    <title>Safetrekr Blog</title>
    <description>Insights on travel safety, duty of care, and organizational risk management from the Safetrekr team.</description>
    <link>${SITE_CONFIG.url}/blog</link>
    <atom:link href="${SITE_CONFIG.url}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${items}
  </channel>
</rss>`

  return new Response(feed.trim(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
