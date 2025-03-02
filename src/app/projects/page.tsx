"use client";

import Head from "next/head";
import Footer from "~/components/Footer";
import ProjectCard from "~/components/ProjectCardProps";
import Header from "~/components/Header";
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
  FaChess,
} from "react-icons/fa";

export default function ProjectPage() {
  return (
    <>
      <Head>
        <title>Projects - Roland Van Duine</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
        <Header />
        <div className="container mx-auto flex items-center justify-center">
          <main className="slide-enter-content container flex max-w-screen-sm flex-col items-start justify-start gap-4 px-8 py-12">
            <h1 className="w-full pb-3 text-center text-[2rem] font-bold tracking-tight text-black dark:text-white">
              Projects
            </h1>
            <div className="slide-enter-content grid w-full grid-cols-2 gap-2">
              <ProjectCard
                Icon={FaBookOpen}
                href="/wordle"
                title="Wordle 2"
                description="Next.js, Tailwind.css"
              />
              <ProjectCard
                Icon={FaClock}
                href="/timely-tome"
                title="Timely Tome"
                description="Rasberry Pi, eInk, Python, Next.js"
              />
              <ProjectCard
                Icon={FaClock}
                href="/doomsdayalgo"
                title="Doomsday Algorithm"
                description="Next.js, Tailwind.css"
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
                description="Python, Gradio, GPT-3.5"
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
