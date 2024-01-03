"use client";

import { useState } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Link from "next/link";

export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`flex min-h-screen flex-col ${
        isDarkMode ? "bg-black" : "bg-white"
      } text-${isDarkMode ? "white" : "black"}`}
    >
      {/* Header */}
      <header
        className={`p-4 ${
          isDarkMode ? "black text-white" : "white text-black"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Home Link */}
          <Link
            href="/"
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Home
          </Link>
          {/* Demo Links */}
          <div className="flex gap-4">
            <Link
              href="https://example.com/demo1"
              className={`hover:text-${isDarkMode ? "blue-300" : "blue-500"}`}
            >
              Projects
            </Link>
            <Link
              href="https://example.com/demo2"
              className={`hover:text-${isDarkMode ? "blue-300" : "blue-500"}`}
            >
              Contact
            </Link>
            <button
              className={` ${isDarkMode ? " text-white" : " text-black"}`}
              onClick={toggleTheme}
            >
              {isDarkMode ? <IoMdSunny /> : <IoMdMoon />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto flex items-center justify-center">
        <main className="container flex max-w-screen-sm flex-col items-start justify-start gap-4 px-4 py-16">
          <h1 className="text-[2rem] font-bold tracking-tight pb-3">
            Roland Van Duine
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam
            suscipit ipsa voluptatum reiciendis est veritatis omnis eos
            dignissimos odit excepturi quisquam voluptatibus repellendus eveniet
            eum maxime quos, accusamus deserunt ullam.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam
            suscipit ipsa voluptatum reiciendis est veritatis omnis eos
            dignissimos odit excepturi quisquam voluptatibus repellendus eveniet
            eum maxime quos, accusamus deserunt ullam.
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam
            suscipit ipsa voluptatum reiciendis est veritatis omnis eos
            dignissimos odit excepturi quisquam voluptatibus repellendus eveniet
            eum maxime quos, accusamus deserunt ullam.
          </p>
        </main>
      </div>
    </div>
  );
}
