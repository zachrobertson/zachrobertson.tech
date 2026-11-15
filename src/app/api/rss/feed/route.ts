import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://zachrobertson.tech";

const escapeXml = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const dynamic = "force-static";

export function GET() {
    const items = getAllPosts()
        .map(
            (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${SITE_URL}/blog/${post.id}</link>
      <guid>${SITE_URL}/blog/${post.id}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`
        )
        .join("");

    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Zach Robertson</title>
    <link>${SITE_URL}</link>
    <description>Project write-ups on simulation, embedded hardware, and AI-assisted engineering.</description>${items}
  </channel>
</rss>`;

    return new Response(feed, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
