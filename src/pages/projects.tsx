"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaProjectDiagram } from "react-icons/fa";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Link from "next/link";
import Footer from "~/components/Footer";

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
            <div className="flex items-center gap-2">
              <FaProjectDiagram />
              <p>Project 1 description</p>
            </div>
            <div className="flex items-center gap-2">
              <FaProjectDiagram />
              <p>Project 2 description</p>
            </div>
            {/* Add more projects as needed */}
          </div>
          <Footer></Footer>
        </main>
      </div>
    </div>
  );
}
