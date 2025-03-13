import React from "react";
import PostCard from "./PostCard";
import type { PostMeta } from "~/lib/mdx";

interface PostListProps {
  posts: PostMeta[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="my-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-1">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
