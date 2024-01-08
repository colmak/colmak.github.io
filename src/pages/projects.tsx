"use client";

import '../styles/globals.css';
import { useState, useEffect } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Link from "next/link";
import UnderlinedText from "~/components/UnderlinedText";


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
              href="https://example.com/demo1"
              className="text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
            >
              Projects
            </Link>
            <Link
              href="https://example.com/demo2"
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
        <main className="container flex max-w-screen-sm flex-col items-start justify-start gap-4 px-4 py-16">
          <h1 className="pb-3 text-[2rem] font-bold tracking-tight text-black dark:text-white">
            Projects
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Hey, I am Roland Van Duine, a Computer Science University student
          </p>
          <div className="text-gray-500 dark:text-gray-400">
            Upcoming Software Engineer at{" "}
            <UnderlinedText href="https://www.travelers.com/">
              Travelers
            </UnderlinedText>
            <div>
              President of{" "}
              <UnderlinedText href="/">
                CCSU Computer Science Club
              </UnderlinedText>
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
          My passion lies in taking ideas and turning 
          them into reality. You can explore my <UnderlinedText href="/projects">complete list of projects here</UnderlinedText>.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam
            suscipit ipsa voluptatum reiciendis est veritatis omnis eos
            dignissimos odit excepturi quisquam voluptatibus repellendus eveniet
            eum maxime quos, accusamus deserunt ullam.
          </p>
        </main>
      </div>
    </div>
  );
}
