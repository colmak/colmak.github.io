import React from "react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { getAllPosts } from "~/lib/mdx";
import type { Metadata } from "next";
import InternalBlogLink from "~/components/InternalBlogLink";

export const metadata: Metadata = {
  title: "Writing | Roland Van Duine",
  description: "Thoughts on software engineering, technology, and more.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
      <Header />
      <main className="container mx-auto flex max-w-screen-sm flex-col items-center px-4 py-12">
        <div className="slide-enter-content w-full">
          <h1 className="mb-6 text-center text-2xl font-bold text-black dark:text-white">
            Writing
          </h1>

          <div className="mx-auto max-w-xl">
            <ul className="space-y-6">
              {posts.map((post) => (
                <li key={post.slug} className="text-center">
                  <InternalBlogLink
                    href={`/blog/${post.slug}`}
                    className="no-underline transition-colors duration-200 hover:text-black dark:hover:text-white"
                  >
                    {post.title}
                  </InternalBlogLink>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {post.formattedDate}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
