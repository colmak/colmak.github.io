"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaProjectDiagram } from "react-icons/fa";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Link from "next/link";
import Footer from "~/components/Footer";
import UnderlinedTextWithIcon from "~/components/UnderlinedTextWithIcon";

export default function ProjectPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
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
      <header className="p-4 text-black dark:text-white">
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
        <main className="slide-enter-content container flex max-w-screen-sm flex-col items-start justify-start gap-4 px-4 py-8">
          <h1 className="w-full pb-3 text-center text-[2rem] font-bold tracking-tight text-black dark:text-white">
            Projects
          </h1>
          <div className="grid w-full grid-cols-2 gap-4">
            <div className="gap-2">
              <div>
                <UnderlinedTextWithIcon Icon={FaGithub} href="https://github.com/CCSU-Computer-Science-Club/ccsu-cs-club-website">CCSU CS Club Website</UnderlinedTextWithIcon>
              </div>
              <div className="text-gray-500 dark:text-gray-400">Next.js, Tailwind.css, tRPC</div>
            </div>
            <div className="gap-2 ">
              <div className="">
                <UnderlinedTextWithIcon Icon={FaGithub} href="https://www.yusufmzaidi.com/">Yusuf's Portfolio</UnderlinedTextWithIcon>
              </div>
              <div className="text-gray-500 dark:text-gray-400">Next.js, Tailwind.css, Framer Motion</div>
            </div>
            <div className="gap-2">
              <div>
                <UnderlinedTextWithIcon Icon={FaGithub} href="https://github.com/colmak/SerenityNow">Serenity Now</UnderlinedTextWithIcon>
              </div>
              <div className="text-gray-500 dark:text-gray-400">Python, Gradio, OpenAI GPT-3.5</div>
            </div>
            <div className="gap-2">
              <div>
                <UnderlinedTextWithIcon Icon={FaGithub} href="https://github.com/BigRedDoge/GreenSwitch">Green Switch</UnderlinedTextWithIcon>
              </div>
              <div className="text-gray-500 dark:text-gray-400">React Native, Flask, SQLite</div>
            </div>
            <div className="gap-2">
              <div>
                <UnderlinedTextWithIcon Icon={FaGithub} href="https://github.com/colmak/Weathered-Weather-App">Weathered</UnderlinedTextWithIcon>
              </div>
              <div className="text-gray-500 dark:text-gray-400">Python, Django, SQLite</div>
            </div>
          </div>
          <Footer></Footer>
        </main>
      </div>
    </div>
  );
}
