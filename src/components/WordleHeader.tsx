"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useWordleContext } from "~/contexts/WordleContext";

interface WordleHeaderProps {
  onShowInstructions?: () => void;
}

export default function WordleHeader({
  onShowInstructions,
}: WordleHeaderProps) {
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
        <div className="w-1/3">
          <Link
            href="/"
            className="text-xl font-semibold text-black dark:text-white"
          >
            RVD
          </Link>
        </div>
        <div className="flex w-1/3 justify-center">
          <div className="text-xl font-extrabold text-black dark:text-white">
            Wordle 2
          </div>
        </div>
        <div className="flex w-1/3 items-center justify-end space-x-4">
          {onShowInstructions && (
            <button
              onClick={onShowInstructions}
              className="rounded border border-gray-300 px-2 py-1 dark:border-gray-700 dark:text-white"
              aria-label="Show instructions"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            </button>
          )}
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
            onClick={toggleTheme}
            className="rounded border border-gray-300 px-2 py-1 dark:border-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
