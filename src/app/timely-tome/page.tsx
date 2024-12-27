"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/Footer";
import Papa from "papaparse";
import UnderlinedText from "~/components/UnderlinedText";

import { IoMdSunny, IoMdMoon } from "react-icons/io";

type Quote = {
  "time-of-text": string;
  "text-time": string;
  text: string;
  title: string;
  author: string;
};

export default function TimelyTomePage() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const cookie = Cookies.get("darkMode");
    return cookie ? JSON.parse(cookie) : false;
  });

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    Cookies.set("darkMode", JSON.stringify(!isDarkMode));
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("/times.csv");
        const csvText = await response.text();
        const parsedData = Papa.parse<Quote>(csvText, { header: true }).data;
        setQuotes(parsedData);
      } catch (error) {
        console.error("Failed to fetch or parse quotes:", error);
      }
    };

    void fetchQuotes();
  }, []);

  useEffect(() => {
    const updateQuote = () => {
      const now = new Date();
      const currentTime = now.toTimeString().slice(0, 5); // Format: HH:MM

      const validQuotes = quotes.filter((q) => q["time-of-text"] <= currentTime);

      if (validQuotes.length > 0) {
        const latestQuote = validQuotes.reduce((latest, current) =>
          current["time-of-text"] > latest["time-of-text"] ? current : latest
        );
        setCurrentQuote(latestQuote);
      }
    };

    updateQuote();
    const interval = setInterval(updateQuote, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [quotes]);

  const convertToStandardTime = (militaryTime: string): string => {
    const parts = militaryTime.split(":");
  
   
    const hours = parseInt(parts[0] || "0", 10);
    const minutes = parseInt(parts[1] || "0", 10);
  
    if (isNaN(hours) || isNaN(minutes)) {
      throw new Error("Invalid time format. Expected HH:MM format.");
    }
  
    const period: "AM" | "PM" = hours >= 12 ? "PM" : "AM";
    const standardHours: number = hours % 12 || 12;
  
    return `${standardHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <>
      <Head>
        <title>Timely Tome</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-[#f5ecd6] text-gray-800">
        <header className="flex items-center justify-center p-4">
          <div className="container flex items-center justify-between">
            <Link href="/" className="text-xl font-semibold text-gray-800">
              RVD
            </Link>
            <div className="flex gap-4">
              <Link
                href="/projects"
                className="text-gray-500 hover:text-gray-800"
              >
                Projects
              </Link>
              <Link
                href="https://linkedin.com/in/rolandvanduine"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-800"
              >
                Contact
              </Link>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={toggleTheme}
              >
                {isDarkMode ? <IoMdSunny /> : <IoMdMoon />}
              </button>
            </div>
          </div>
        </header>

        <div className="slide-enter-content flex flex-grow items-center justify-center">
          {currentQuote && (
            <div className="flex h-full w-full flex-col items-center justify-center px-8 py-4">
              <p className="mt-8 max-w-4xl font-serif text-[3rem] leading-[1.5] text-gray-800">
                {currentQuote.text
                  .split(currentQuote["text-time"])
                  .map((part, index, array) => (
                    <span key={index}>
                      {part}
                      {index < array.length - 1 && (
                        <span className="font-bold">
                          {currentQuote["text-time"]}
                        </span>
                      )}
                    </span>
                  ))}
              </p>
              <div className="mt-auto pb-8 pr-8 text-right text-gray-700">
                <span className="font-serif text-lg italic">
                  {currentQuote.title},{" "}
                </span>
                <span className="font-serif text-lg">
                  {currentQuote.author}
                </span>
                <div>
                  Inspired by{" "}
                  <UnderlinedText href="https://www.authorclock.com/">
                    Author Clock
                  </UnderlinedText>
                </div>
                <div>
                  <UnderlinedText href="https://github.com/colmak/The-Timely-Tome">
                    Github
                  </UnderlinedText>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </>
  );
}
