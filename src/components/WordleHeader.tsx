"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useWordleContext } from "~/contexts/WordleContext";

interface WordleHeaderProps {
  onShowInstructions?: () => void;
}

const WordleHeader: React.FC<WordleHeaderProps> = ({ onShowInstructions }) => {
  const { selectedTheme, setTheme, gameMode, setGameMode, startNewGame } =
    useWordleContext();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const cookie = Cookies.get("darkMode");
    return cookie ? (JSON.parse(cookie) as boolean) : false;
  });
  const [showModeInfo, setShowModeInfo] = useState<boolean>(false);
  const [showThemeInfo, setShowThemeInfo] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    Cookies.set("darkMode", String(!isDarkMode));
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMode = e.target.value as "classic" | "speed" | "endless";
    setGameMode(newMode);
    // startNewGame removed as it's now handled within setGameMode
  };

  // Get current mode description
  const getModeDescription = (): string => {
    switch (gameMode) {
      case "classic":
        return "The original Wordle experience - one word per day, same for everyone. Guess in 6 tries.";
      case "speed":
        return "Solve as many puzzles as you can in 5 minutes. If you fail to solve a puzzle, you'll get a new word without losing time.";
      case "endless":
        return "Keep solving puzzles until you make a mistake. Build the longest streak.";
      default:
        return "";
    }
  };

  // Get current theme description
  const getThemeDescription = (): string => {
    switch (selectedTheme) {
      case "commonwords":
        return "Common English words that most people know.";
      case "animals":
        return "Animal names from around the world.";
      case "countries":
        return "Countries from around the globe.";
      case "capitals":
        return "Capital cities from around the world.";
      case "science":
        return "Scientific terms and concepts.";
      case "games":
        return "Terms related to video games and gaming.";
      case "og_word_list":
        return "The original Wordle word list.";
      case "words_alpha":
        return "All valid English 5-letter words.";
      default:
        return "";
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <header className="container mx-auto flex w-full flex-wrap items-center justify-between border-b border-gray-200 p-5 dark:border-gray-700">
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
      <div className="flex w-1/3 flex-wrap items-center justify-end space-x-2 md:space-x-3">
        {onShowInstructions && (
          <button
            onClick={onShowInstructions}
            className="rounded border border-gray-300 p-1.5 dark:border-gray-700 dark:text-white"
            aria-label="Show instructions"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
          </button>
        )}

        <div className="relative flex items-center space-x-1">
          <select
            className="w-24 rounded border border-gray-300 px-1 py-1 text-xs dark:bg-gray-800 dark:text-white sm:text-sm"
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
            <option value="words_alpha">All Words</option>
          </select>

          <button
            onClick={() => setShowThemeInfo(!showThemeInfo)}
            className="rounded-full border border-gray-300 p-1 text-xs dark:border-gray-700 dark:text-white"
            aria-label="Theme info"
          >
            ?
          </button>

          {showThemeInfo && (
            <div className="absolute right-0 top-8 z-10 w-64 rounded-md bg-white p-2 text-xs shadow-lg dark:bg-gray-800 dark:text-white">
              {getThemeDescription()}
            </div>
          )}
        </div>

        <div className="relative flex items-center space-x-1">
          <select
            id="mode-select"
            className="w-20 rounded border border-gray-300 px-1 py-1 text-xs dark:bg-gray-800 dark:text-white sm:text-sm"
            value={gameMode}
            onChange={handleModeChange}
          >
            <option value="classic">Classic</option>
            <option value="speed">Speed</option>
            <option value="endless">Endless</option>
          </select>

          <button
            onClick={() => setShowModeInfo(!showModeInfo)}
            className="rounded-full border border-gray-300 p-1 text-xs dark:border-gray-700 dark:text-white"
            aria-label="Mode info"
          >
            ?
          </button>

          {showModeInfo && (
            <div className="absolute right-0 top-8 z-10 w-64 rounded-md bg-white p-2 text-xs shadow-lg dark:bg-gray-800 dark:text-white">
              {getModeDescription()}
            </div>
          )}
        </div>

        <button
          onClick={startNewGame}
          className="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600 sm:text-sm"
        >
          New
        </button>

        <button
          onClick={toggleTheme}
          className="rounded border border-gray-300 p-1.5 dark:border-gray-700"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-yellow-500"
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
              className="h-4 w-4"
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
    </header>
  );
};

export default WordleHeader;
