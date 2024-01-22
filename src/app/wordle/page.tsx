"use client";

import React from "react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import {
  FaGithub,
  FaBook,
  FaRobot,
  FaQuestion,
  FaCloudMoonRain,
  FaMusic,
  FaSpider,
  FaArrowRight,
  FaDelicious,
} from "react-icons/fa";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faB, faC, faD, faE, faF, faG, faH, faI, faJ, faK, faL, faM, faN, faO, faP, faQ, faR, faS, faT, faU, faV, faW, faX, faY, faZ } from '@fortawesome/free-solid-svg-icons';
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/Footer";

export default function WordlePage() {
  const icons = [faA, faB, faC, faD, faE, faF, faG, faH, faI, faJ, faK, faL, faM, faN, faO, faP, faQ, faR, faS, faT, faU, faV, faW, faX, faY, faZ]
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
          <main className="slide-enter-content 12 container flex max-w-screen-sm flex-col items-start justify-start gap-4 px-8 py-12">
            <h1 className="w-full pb-3 text-center text-[2rem] font-bold tracking-tight text-black dark:text-white">
              Wordle
            </h1>
            <div className="slide-enter-content mx-auto grid grid-cols-5 grid-rows-6 place-items-center gap-2">
              {Array.from({ length: 30 }).map((_, index) => (
                <div key={index} id={String(index)} className="rounded bg-gray-500 p-3 text-white">
                  <FontAwesomeIcon icon={faA} size="lg"/>
                </div>
              ))}
            </div>
            <Footer/>
          </main>
        </div>
      </div>
    </>
  );
}
