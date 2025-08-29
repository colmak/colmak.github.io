import Footer from "~/components/Footer";
import Header from "~/components/Header";
import UnderlinedText from "~/components/UnderlinedText";
import InternalBlogLink from "~/components/InternalBlogLink";
import { getLatestPosts } from "~/lib/mdx";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roland Van Duine",
  description: "I like to code.",
};

export default function HomePage() {
  const latestPosts = getLatestPosts(5);

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
      <Header />
      <div className="container mx-auto flex items-center justify-center">
        <main className="slide-enter-content container flex max-w-screen-sm flex-col items-start justify-center gap-4 px-4 py-12">
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
            <UnderlinedText href="https://github.com/colmak/">
              github
            </UnderlinedText>{" "}
            for other projects.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Some hobbies are rock climbing, language learning, reading, and
            running.
          </p>

          {latestPosts.length > 0 && (
            <div className="mt-4 w-full text-center">
              <h2 className="mb-2 text-xl text-black dark:text-white">Writing</h2>
              <ul className="space-y-1">
                {latestPosts.map((post) => (
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
          )}
          <div className="pb-10"></div>
          <Footer/>
        </main>
      </div>
    </div>
  );
}
