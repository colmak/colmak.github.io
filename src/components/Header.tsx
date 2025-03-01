"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Link from "next/link";

export default function Header() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const cookie = Cookies.get("darkMode");
    return cookie ? JSON.parse(cookie) as boolean : false;
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
  );
}
