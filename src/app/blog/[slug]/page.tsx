import React from "react";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import MDXComponents from "~/components/blog/MDXComponents";
import { getAllPosts, getPostBySlug } from "~/lib/mdx";
import type { Metadata } from "next";
import InternalBlogLink from "~/components/InternalBlogLink";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { meta } = getPostBySlug(params.slug);

    return Promise.resolve({
      title: `${meta.title} | Roland Van Duine`,
      description: meta.excerpt,
    });
  } catch (error) {
    return Promise.resolve({
      title: "Post Not Found | Roland Van Duine",
      description: "The requested post could not be found.",
    });
  }
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: PageProps) {
  try {
    const { meta, content } = getPostBySlug(params.slug);

    return (
      <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
        <Header />
        <main className="container mx-auto flex max-w-screen-sm flex-col items-center px-4 py-12">
          <article className="slide-enter-content w-full">
            <header className="mb-8 text-center">
              <h1 className="mb-2 text-2xl font-bold text-black dark:text-white">
                {meta.title}
              </h1>
              <time
                dateTime={meta.date}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                {meta.formattedDate}
              </time>
            </header>

            <div className="prose prose-lg dark:prose-invert prose-headings:font-normal prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline dark:prose-a:text-blue-400 mx-auto">
              <MDXRemote source={content} components={MDXComponents} />
            </div>

            <div className="mt-12 text-center">
              <InternalBlogLink
                href="/blog"
                className="no-underline transition-colors duration-200 hover:text-black dark:hover:text-white"
              >
                ← Back to all posts
              </InternalBlogLink>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    notFound();
  }
}
