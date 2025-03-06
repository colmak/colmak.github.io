"use client";

import Head from "next/head";
import Footer from "~/components/Footer";
import ProjectCard from "~/components/ProjectCard";
import Header from "~/components/Header";
import { useState } from "react";
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
  FaFilter,
  FaSearch,
} from "react-icons/fa";

export default function ProjectPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const projects = [
    {
      id: 1,
      icon: FaBookOpen,
      href: "/wordle",
      title: "Wordle 2",
      description: "Next.js, Tailwind.css",
      category: "Web Development",
    },
    {
      id: 2,
      icon: FaClock,
      href: "/timely-tome",
      title: "Timely Tome",
      description: "Rasberry Pi, eInk, Python, Next.js",
      category: "IoT",
    },
    {
      id: 3,
      icon: FaClock,
      href: "/doomsdayalgo",
      title: "Doomsday Algorithm",
      description: "Next.js, Tailwind.css",
      category: "Web Development",
    },
    {
      id: 4,
      icon: FaBug,
      href: "https://github.com/Cyber-Tutor/Cyber-Tutor-Frontend",
      title: "Cyber Tutor",
      description: "Python, Langchain, Next.js, Firebase...",
      category: "AI",
    },
    {
      id: 5,
      icon: FaLock,
      href: "https://github.com/colmak/Image-Encryption",
      title: "Image Encryptor",
      description: "Python, Numpy, PyQt5, Pillow",
      category: "Security",
    },
    {
      id: 6,
      icon: FaBook,
      href: "https://www.yusufmzaidi.com/",
      title: "Yusuf's Portfolio",
      description: "Next.js, Tailwind.css, Framer Motion",
      category: "Web Development",
    },
    {
      id: 7,
      icon: FaChess,
      href: "/chess",
      title: "Go Chess Go",
      description: "Golang, Gin",
      category: "Game",
    },
    {
      id: 8,
      icon: FaRobot,
      href: "https://github.com/colmak/SerenityNow",
      title: "Serenity Now",
      description: "Python, Gradio, GPT-3.5",
      category: "AI",
    },
    {
      id: 9,
      icon: FaQuestion,
      href: "https://github.com/BigRedDoge/GreenSwitch",
      title: "Green Switch",
      description: "React Native, Flask, SQLite",
      category: "Mobile",
    },
    {
      id: 10,
      icon: FaCloudMoonRain,
      href: "https://github.com/colmak/Weathered-Weather-App",
      title: "Weathered",
      description: "Python, Django, SQLite",
      category: "Web Development",
    },
    {
      id: 11,
      icon: FaSpider,
      href: "https://github.com/colmak/wikiCountryScraper/",
      title: "Country Scraper",
      description: "Python, BS4, Requests",
      category: "Data",
    },
    {
      id: 12,
      icon: FaMusic,
      href: "https://github.com/colmak/infrared-music-player",
      title: "IR Music Player",
      description: "C, Arduino",
      category: "IoT",
    },
  ];

  const categories = ["All", ...new Set(projects.map((project) => project.category))];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || project.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Head>
        <title>Projects - Roland Van Duine</title>
        <meta name="description" content="Explore Roland Van Duine's portfolio of projects in web development, AI, IoT, and more." />
      </Head>
      <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
        <Header />
        <div className="container mx-auto flex items-center justify-center">
          <main className="slide-enter-content container flex max-w-screen-md flex-col items-start justify-start gap-4 px-4 py-12 sm:px-8">
            <h1 className="w-full pb-3 text-center text-3xl sm:text-4xl font-bold tracking-tight text-black dark:text-white">
              My Projects
            </h1>
            <p className="text-center w-full mb-6 text-gray-600 dark:text-gray-300">
              A collection of personal and collaborative projects across various technologies
            </p>

            <div className="w-full mb-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full px-10 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="relative min-w-[140px]">
                <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full appearance-none px-10 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="w-full p-8 text-center text-gray-500 dark:text-gray-400">
                No projects found matching your criteria.
              </div>
            ) : (
              <div className="slide-enter-content grid w-full grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    Icon={project.icon}
                    href={project.href}
                    title={project.title}
                    description={project.description}
                    category={project.category}
                  />
                ))}
              </div>
            )}

            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}