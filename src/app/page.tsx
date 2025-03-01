"use client";

import Footer from "~/components/Footer";
import Header from "~/components/Header";
import UnderlinedText from "~/components/UnderlinedText";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Roland Van Duine</title>
        <meta
          name="description"
          content="I like to code."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
        <Header />
        <main className="container mx-auto flex flex-col items-start justify-center gap-4 px-4 py-12 max-w-screen-sm">
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
            <UnderlinedText href="/projects">projects here</UnderlinedText>. Also, check out my{" "}
            <UnderlinedText href="https://github.com/colmak/">
              github
            </UnderlinedText>{" "}
            for other projects.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Some hobbies are rock climbing, language learning, reading, and exploring new places.
          </p>
          <div className="mt-8 flex gap-4">
            <UnderlinedText href="https://github.com/colmak">
              <div className="flex items-center">
                <FaGithub className="mr-2" /> GitHub
              </div>
            </UnderlinedText>
            <UnderlinedText href="https://linkedin.com/in/rolandvanduine">
              <div className="flex items-center">
                <FaLinkedin className="mr-2" /> LinkedIn
              </div>
            </UnderlinedText>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
}
