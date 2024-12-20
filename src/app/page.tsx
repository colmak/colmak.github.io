"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Link from "next/link";
import UnderlinedText from "~/components/UnderlinedText";
import Footer from "~/components/Footer";

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const cookie = Cookies.get("darkMode");
    return cookie ? (JSON.parse(cookie) as boolean) : false;
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    Cookies.set("darkMode", String(!isDarkMode));
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
      <header className="flex items-center justify-center p-4">
        <div className="container flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-semibold text-black dark:text-white"
          >
            RVD
          </Link>
          <div className="flex gap-4">
            <Link
              href="/projects"
              className="text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Projects
            </Link>
            <Link
              href="https://linkedin.com/in/rolandvanduine"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Contact
            </Link>
            <button
              className="text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
              onClick={toggleTheme}
            >
              {isDarkMode ? <IoMdSunny /> : <IoMdMoon />}
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto flex items-center justify-center">
        <main className="slide-enter-content container flex max-w-screen-sm flex-col items-start justify-start gap-4 px-4 py-12">
          <h1 className="pb-3 text-[2rem] font-bold tracking-tight text-black dark:text-white">
            Roland Van Duine
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Hey, I am Roland Van Duine, a software engineer
          </p>
          <div className="text-gray-500 dark:text-gray-400">
            Software Engineer at{" "}
            <UnderlinedText href="https://www.travelers.com/">
              Travelers
            </UnderlinedText>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            My passion lies in taking ideas and turning them into reality. You
            can explore my{" "}
            <UnderlinedText href="/projects">
              projects here
            </UnderlinedText>
            . Also check out my{" "}
            <UnderlinedText href="https://github.com/colmak/">
              github
            </UnderlinedText>{" "}
            for other projects
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            When I&apos;m not coding, I love rock climbing, learning languages and exploring new
            places.
          </p>

          <div className="mt-8 flex gap-4">
            <UnderlinedText href="https://github.com/colmak">
              <div className="flex items-center">
                <FaGithub className="mr-2" />
                GitHub
              </div>
            </UnderlinedText>
            <UnderlinedText href="https://linkedin.com/in/rolandvanduine">
              <div className="flex items-center">
                <FaLinkedin className="mr-2" />
                LinkedIn
              </div>
            </UnderlinedText>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
