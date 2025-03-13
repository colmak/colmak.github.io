import React from "react";
import Link from "next/link";
import type { PostMeta } from "~/lib/mdx";

interface PostCardProps {
  post: PostMeta;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <Link href={`/blog/${post.slug}`} className="no-underline">
        <h3 className="mb-2 text-xl font-bold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
          {post.title}
        </h3>
      </Link>
      <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        {post.formattedDate}
        {post.author && <span> • {post.author}</span>}
      </div>
      <p className="mb-4 text-gray-600 dark:text-gray-300">{post.excerpt}</p>
      <div className="flex flex-wrap gap-2">
        {post.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600 dark:bg-gray-700 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
