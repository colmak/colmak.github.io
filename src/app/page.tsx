"use client";

import Footer from "~/components/Footer";
import Header from "~/components/Header";
import UnderlinedText from "~/components/UnderlinedText";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { PostMeta } from "~/lib/mdx";

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    async function fetchLatestPosts() {
      const response = await fetch("/api/latest-posts");
      if (response.ok) {
        const posts = await response.json();
        setLatestPosts(posts);
      }
    }

    fetchLatestPosts();
  }, []);

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
            <UnderlinedText href="/projects">projects here</UnderlinedText>.
            Also, check out my{" "}
            <UnderlinedText href="https://github.com/colmak/">
              github
            </UnderlinedText>{" "}
            for other projects.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Some hobbies are rock climbing, language learning, reading, and
            exploring new places.
          </p>


          {latestPosts.length > 0 && (
            <div className="mt-4 w-full text-center">
              <h2 className="mb-2 text-xl text-black dark:text-white">
                Writing
              </h2>
              <ul className="space-y-1">
                {latestPosts.map((post) => (
                  <li key={post.slug}>
                    <UnderlinedText href={`/blog/${post.slug}`}>
                      {post.title}
                    </UnderlinedText>
                  </li>
                ))}
              </ul>
              <div className="mt-2">
                <UnderlinedText href="/blog">View all posts</UnderlinedText>
              </div>
            </div>
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
