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
          <h1 className="mb-2 text-center text-2xl font-bold text-black dark:text-white">
            Writing
          </h1>

          <div className="mx-auto max-w-xl">
            <div className="mb-6 flex justify-center">
              <a
                href="/rss.xml"
                className="flex items-center text-sm text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white"
                aria-label="RSS Feed"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="mr-1 h-4 w-4"
                >
                  <path d="M3.75 3a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c6.075 0 11 4.925 11 11v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V16C17 8.82 11.18 3 4 3h-.25z" />
                  <path d="M3.75 8a.75.75 0 00-.75.75v.5c0 .414.336.75.75.75H4c3.256 0 5.897 2.641 5.897 5.897v.25c0 .414.336.75.75.75h.5a.75.75 0 00.75-.75V15c0-3.866-3.134-7-7-7h-.25z" />
                  <path d="M6.5 15.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>
                RSS
              </a>
            </div>
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
