"use client";

import React from "react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/Footer";

export default function WordlePage() {
  const keyboardRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["↵", "z", "x", "c", "v", "b", "n", "m", "⌦"],
  ].map((row) => row.map((letter) => letter.toUpperCase()));

  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  const initialWordleRows = Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => " "),
  );
  const [wordleRows, setWordleRows] = useState(initialWordleRows);

  const handleKeyPress = (key: string) => {
    setWordleRows((prevRows) => {
      const newRows = [...prevRows];
      const newRow = [...(newRows[newRows.length - 1] || []), key];
      if (newRow.length > 5) {
        newRow.shift();
      }
      newRows[newRows.length - 1] = newRow;
      return newRows;
    });
  };

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
        <title>Wordle - Roland Van Duine</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
        <header className="flex items-center justify-center p-4">
          <div className="container mx-auto flex items-center justify-between">
            <Link
              href="/"
              className="text-xl font-semibold text-black dark:text-white"
            >
              RVD
            </Link>
            <Link
              href="/"
              className="pe-10 text-xl font-bold text-black dark:text-white"
            >
              Wordle-2
            </Link>
            <button
              className="text-gray-500 hover:text-black dark:text-gray-300 dark:hover:text-white"
              onClick={toggleTheme}
            >
              {isDarkMode ? <IoMdSunny /> : <IoMdMoon />}
            </button>
          </div>
        </header>

        <div className="container mx-auto flex items-center justify-center">
          <main className="slide-enter-content container flex max-w-screen-sm flex-col items-start justify-start gap-0.5">
            <div className="mx-auto grid grid-cols-1 grid-rows-6 gap-1">
              {wordleRows.map((row, rowIndex) => (
                <div key={rowIndex} className="slide-enter-content flex gap-1">
                  {row.map((letter, index) => (
                    <div
                      key={index}
                      id={String(rowIndex * row.length + index)}
                      className="flex h-12 w-12 items-center justify-center border-2 border-gray-300 bg-white p-3 text-black dark:border-gray-600 dark:bg-black dark:text-white"
                    >
                      {letter}
                    </div>  
                  ))}
                </div>
              ))}
            </div>

            <div className="mx-auto mt-4 grid grid-cols-1 grid-rows-3 gap-1">
              {keyboardRows.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className="slide-enter-content flex justify-center gap-1"
                >
                  {row.map((letter, index) => (
                    <div
                      key={index}
                      id={String(rowIndex * row.length + index)}
                      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded bg-gray-400 p-3 font-bold text-black dark:bg-gray-500 dark:text-white"
                      onClick={() => handleKeyPress(letter)}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="p-2"></div>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
