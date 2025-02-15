"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import {
  FaBookOpen,
  FaBook,
  FaRobot,
  FaQuestion,
  FaCloudMoonRain,
  FaMusic,
  FaSpider,
  FaLock,
  FaBug,
  FaClock,
  FaChess
} from "react-icons/fa";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/Footer";
import ProjectCard from "~/components/ProjectCardProps";

export default function ProjectPage() {
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

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <Head>
        <title>Projects - Roland Van Duine</title>
      </Head>
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
          <main className="slide-enter-content 12 container flex max-w-screen-sm flex-col items-start justify-start gap-4 px-8 py-12">
            <h1 className="w-full pb-3 text-center text-[2rem] font-bold tracking-tight text-black dark:text-white">
              Projects
            </h1>
            <div className="slide-enter-content grid w-full grid-cols-2 gap-2">
              <ProjectCard
                Icon={FaBookOpen}
                href="/wordle"
                title="Wordle 2"
                description="Next.js, Tailwind.css, tRPC"
              />
              <ProjectCard
                Icon={FaClock}
                href="/timely-tome"
                title="Timely Tome"
                description="Rasberry Pi, eInk, Python, Next.js"
              />
              <ProjectCard
                Icon={FaBug}
                href="https://github.com/Cyber-Tutor/Cyber-Tutor-Frontend"
                title="Cyber Tutor"
                description="Python, Langchain, Next.js, Firebase..."
              />
              <ProjectCard
                Icon={FaLock}
                href="/https://github.com/colmak/Image-Encryption"
                title="Image Encryptor"
                description="Python, Numpy, PyQt5, Pillow"
              />
              <ProjectCard
                Icon={FaBook}
                href="https://www.yusufmzaidi.com/"
                title="Yusuf's Portfolio"
                description="Next.js, Tailwind.css, Framer Motion"
              />
              <ProjectCard
                Icon={FaChess}
                href="/chess"
                title="Go Chess Go"
                description="Golang, Gin"
              />
              <ProjectCard
                Icon={FaRobot}
                href="https://github.com/colmak/SerenityNow"
                title="Serenity Now"
                description="Python, Gradio, OpenAI GPT-3.5"
              />

              <ProjectCard
                Icon={FaQuestion}
                href="https://github.com/BigRedDoge/GreenSwitch"
                title="Green Switch"
                description="React Native, Flask, SQLite"
              />

              <ProjectCard
                Icon={FaCloudMoonRain}
                href="https://github.com/colmak/Weathered-Weather-App"
                title="Weathered"
                description="Python, Django, SQLite"
              />
              <ProjectCard
                Icon={FaSpider}
                href="https://github.com/colmak/wikiCountryScraper/"
                title="Country Scraper"
                description="Python, BS4, Requests"
              />
              <ProjectCard
                Icon={FaMusic}
                href="https://github.com/colmak/infrared-music-player"
                title="IR Music Player"
                description="C, Arduino"
              />
            </div>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
