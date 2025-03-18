import { getAllPosts } from "~/lib/mdx";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = getAllPosts();
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://rolandvanduine.com";

  const rssXml = `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>Roland Van Duine's Blog</title>
        <link>${baseUrl}/blog</link>
        <description>Thoughts on software engineering, technology, and more.</description>
        <language>en</language>
        <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
        ${posts
          .map(
            (post) => `
          <item>
            <title>${post.title}</title>
            <link>${baseUrl}/blog/${post.slug}</link>
            <guid>${baseUrl}/blog/${post.slug}</guid>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <description><![CDATA[${post.excerpt || post.title}]]></description>
          </item>
        `,
          )
          .join("")}
      </channel>
    </rss>`.trim();

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=18000",
    },
  });
}
