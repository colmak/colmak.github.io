"use client";

import React from "react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/Footer";

export default function WordlePage() {
  const letters = ["", "", "", "", ""];
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
      <header className="flex justify-center items-center p-4">
  <div className="container mx-auto flex items-center justify-between">
    <Link
      href="/"
      className="text-xl font-semibold text-black dark:text-white"
    >
      RVD
    </Link>
    <Link
      href="/"
      className="text-xl font-bold text-black dark:text-white pe-10"
    >
      Wordle
    </Link>
    <div className="flex gap-4">
      {/* Other elements */}
    </div>
  </div>
</header>

        <div className="container mx-auto flex items-center justify-center">
          <main className="slide-enter-content container flex max-w-screen-sm flex-col items-start justify-start gap-0.5">
            
            <div className="slide-enter-content mx-auto grid grid-cols-1 grid-rows-6 gap-0.5">
              {Array.from({ length: 6 }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex gap-0.5">
                  {letters.map((letter, index) => (
                    <div
                      key={index}
                      id={String(rowIndex * letters.length + index)}
                      className="flex h-12 w-12 items-center justify-center rounded bg-gray-500 p-3 text-white"
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
