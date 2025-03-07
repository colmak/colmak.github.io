"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Link from "next/link";
import { useWordleContext } from "~/contexts/WordleContext";

export default function WordleHeader() {
  const { selectedTheme, setTheme } = useWordleContext();
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
    <header className="p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Column */}
        <div className="w-1/3">
          <Link
            href="/"
            className="text-xl font-semibold text-black dark:text-white"
          >
            RVD
          </Link>
        </div>
        {/* Center Column */}
        <div className="flex w-1/3 justify-center">
          <div className="text-xl font-extrabold text-black dark:text-white">
            Wordle 2
          </div>
        </div>
        {/* Right Column */}
        <div className="flex w-1/3 items-center justify-end space-x-4">
          <select
            className="rounded border border-gray-300 px-2 py-1 dark:bg-gray-800 dark:text-white"
            value={selectedTheme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="commonwords">Default</option>
            <option value="animals">Animals</option>
            <option value="countries">Countries</option>
            <option value="capitals">Capitals</option>
            <option value="science">Science</option>
            <option value="games">Games</option>
            <option value="og_word_list">OG Wordle</option>
            <option value="words_alpha">All The Words</option>
          </select>
          <button
            className="text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
            onClick={toggleTheme}
          >
            {isDarkMode ? <IoMdSunny /> : <IoMdMoon />}
          </button>
        </div>
      </div>
    </header>
  );
}
