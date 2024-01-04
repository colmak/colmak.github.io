"use client";

import { useState } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Link from "next/link";
import UnderlinedText from "../components/UnderlinedText";

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
      <header
        className={`p-4 ${
          isDarkMode ? "black text-white" : "white text-black"
        }`}
      >
        <div className="container flex items-center justify-between">
          <Link
            href="/"
            className={`text-xl font-semibold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            RVD
          </Link>
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

      <div className="container mx-auto flex items-center justify-center">
        <main className="container flex max-w-screen-sm flex-col items-start justify-start gap-4 px-4 py-16">
          <h1 className="pb-3 text-[2rem] font-bold tracking-tight">
            Roland Van Duine
          </h1>
          <p className="text-gray-500">
            Hey, I am Roland Van Duine, a Computer Science University student
            and upcoming Software Engineer at{" "}
            <UnderlinedText href="https://www.travelers.com/">
              Travelers
            </UnderlinedText>
          </p>
          <p className="text-gray-500">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam
            suscipit ipsa voluptatum reiciendis est veritatis omnis eos
            dignissimos odit excepturi quisquam voluptatibus repellendus eveniet
            eum maxime quos, accusamus deserunt ullam.
          </p>
          <p className="text-gray-500">
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
