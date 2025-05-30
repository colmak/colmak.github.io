/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Footer from "~/components/Footer";
import Papa from "papaparse";
import UnderlinedText from "~/components/UnderlinedText";
import Header from "~/components/Header";

type Quote = {
  "time-of-text": string;
  "text-time": string;
  text: string;
  title: string;
  author: string;
};

export default function TimelyTomePage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("/times.csv");
        const csvText = await response.text();
        const parsed = Papa.parse<Quote>(csvText, { header: true });
        if (!Array.isArray(parsed.data)) {
          throw new Error("Parsed data is not an array.");
        }
        const validQuotes: Quote[] = parsed.data.filter(
          (quote): quote is Quote =>
            quote &&
            typeof quote["time-of-text"] === "string" &&
            typeof quote["text-time"] === "string" &&
            typeof quote.text === "string" &&
            typeof quote.title === "string" &&
            typeof quote.author === "string"
        );
        setQuotes(validQuotes);
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

  return (
    <>
      <Head>
        <title>Timely Tome</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-[#f5ecd6] text-gray-800">
        <Header />
        <div className="slide-enter-content flex flex-grow items-center justify-center">
          {currentQuote && (
            <div className="flex w-full max-w-6xl flex-col items-center px-8 py-4">
              {/* Quote Section */}
              <div className="w-full max-w-4xl">
                <div className="h-64 overflow-y-auto font-serif text-[2rem] leading-[1.5] text-gray-800">
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
                </div>
              </div>

              {/* Author and Title Information */}
              <div className="mt-4 self-end text-right text-gray-700">
                <div className="font-serif text-lg italic">
                  {currentQuote.title},{" "}
                </div>
                <div className="font-serif text-lg">{currentQuote.author}</div>
                <div className="mt-2">
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
