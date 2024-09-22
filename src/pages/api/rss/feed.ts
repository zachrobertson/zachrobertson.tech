import { getAllBlogs } from '@/lib/api';
import { BlogData } from '@/interfaces/blog';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
  const blogs: BlogData[] = await getAllBlogs();
  const items = blogs.map(blog => `
    <item>
      <title>${blog.title}</title>
      <link>https://localhost:3000/blog/${blog.id}</link>
      <description>${blog.excerpt}</description>
      <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
      <author>${blog.author}</author>
    </item>
  `).join('');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>My Blog</title>
      <link>https://localhost:3000</link>
      <description>Latest blog posts</description>
      ${items}
    </channel>
  </rss>`;

  response.setHeader("Content-Type", "application/rss+xml").status(200).send(rssFeed);
};
