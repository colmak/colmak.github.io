"use client";

import Footer from "~/components/Footer";
import Header from "~/components/Header";
import UnderlinedText from "~/components/UnderlinedText";
import InternalBlogLink from "~/components/InternalBlogLink";
import Head from "next/head";
import { useEffect, useState } from "react";
import type { PostMeta } from "~/lib/mdx";

const useLatestPosts = () => {
  const [state, setState] = useState<{
    posts: PostMeta[];
    loading: boolean;
    error: string | null;
  }>({
    posts: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await fetch("/api/latest-posts");
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.statusText}`);
        }
        const posts = await response.json();
        setState({ posts, loading: false, error: null });
      } catch (error) {
        setState({
          posts: [],
          loading: false,
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    };

    fetchLatestPosts();
  }, []);

  return state;
};

const Bio = () => (
  <>
    <h1 className="pb-3 text-2xl font-bold tracking-tight text-black dark:text-white">
      Roland Van Duine
    </h1>
    <p className="text-gray-500 dark:text-gray-400">
      Hey, I am Roland Van Duine, a software engineer.
    </p>
    <p className="text-gray-500 dark:text-gray-400">
      Software Engineer at{" "}
      <UnderlinedText href="https://www.travelers.com/">
        Travelers
      </UnderlinedText>
    </p>
    <p className="text-gray-500 dark:text-gray-400">
      I like to code. You can explore my{" "}
      <UnderlinedText href="/projects">projects here</UnderlinedText>. Also,
      check out my{" "}
      <UnderlinedText href="https://github.com/colmak/">github</UnderlinedText>{" "}
      for other projects.
    </p>
    <p className="text-gray-500 dark:text-gray-400">
      Some hobbies are rock climbing, language learning, reading, and exploring
      new places.
    </p>
  </>
);

const BlogPosts = ({
  posts,
  error,
}: {
  posts: PostMeta[];
  error: string | null;
}) => {
  if (error) {
    return (
      <div className="text-red-500">Failed to load latest posts: {error}</div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-4 w-full text-center">
      <h2 className="mb-2 text-xl text-black dark:text-white">Writing</h2>
      <ul className="space-y-1">
        {posts.map((post) => (
          <li key={post.slug}>
            <InternalBlogLink
              href={`/blog/${post.slug}`}
              className="no-underline transition-colors duration-200 hover:text-black dark:hover:text-white"
            >
              {post.title}
            </InternalBlogLink>
          </li>
        ))}
      </ul>
      <div className="mt-2">
        <InternalBlogLink
          href="/blog"
          className="no-underline transition-colors duration-200 hover:text-black dark:hover:text-white"
        >
          View all posts
        </InternalBlogLink>
      </div>
    </div>
  );
};

export default function HomePage() {
  const { posts, loading, error } = useLatestPosts();

  return (
    <>
      <Head>
        <title>Roland Van Duine</title>
        <meta name="description" content="I like to code." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
        <Header />
        <main className="container mx-auto flex max-w-screen-sm flex-col items-start justify-center gap-4 px-4 py-12">
          <Bio />

          {loading ? (
            <div className="mt-4 w-full text-center">
              Loading latest posts...
            </div>
          ) : (
            <BlogPosts posts={posts} error={error} />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
