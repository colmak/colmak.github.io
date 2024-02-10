"use client";

import React from "react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/Footer";

export default function WordlePage() {
  const targetWord = "wtzyv".toUpperCase();
  const [dictionary, setDictionary] = useState<string[]>([]);

  useEffect(() => {
    fetch("words_alpha.txt")
      .then((response) => response.text())
      .then((data) => {
        const words = data
          .split("\n")
          .map((word) => word.replace(/^\n/, ""))
          .map((word) => word.replace(/\r$/, ""));
        setDictionary(words);
      });
  }, []);

  const checkCorrectLetters = (row: string[]) => {
    const result = row.map((letter, index) => {
      if (letter === targetWord[index]) {
        return "correct";
      } else if (targetWord.includes(letter)) {
        return "present";
      } else if (letter === null) {
        return "empty";
      } else {
        return "incorrect";
      }
    });
    return result;
  };
  const keyboardRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["↵", "z", "x", "c", "v", "b", "n", "m", "⌦"],
  ].map((row) => row.map((letter) => letter.toUpperCase()));

  const initialWordleRows = Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => " "),
  );
  const [letterColors, setLetterColors] = useState<string[][]>([]);
  const [wordleRows, setWordleRows] = useState(initialWordleRows);
  const [currentRow, setCurrentRow] = useState(0);
  const [lastPressedKey, setLastPressedKey] = React.useState<
    number | null | undefined
  >(null);
  const [isRowSubmitted, setIsRowSubmitted] = useState<boolean[]>(
    new Array(5).fill(false),
  );

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const key = event.key;
    handleKeyPress(key.toUpperCase());
  };

  const handleKeyPress = (key: string) => {
    const index = wordleRows[currentRow]?.indexOf(key);
    setLastPressedKey(index !== -1 ? index : (null as null));
    // Whitelist of letters
    const whitelist = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Convert the key to uppercase and check if it's in the whitelist
    key = key.toUpperCase();
    if (
      !whitelist.includes(key) &&
      key !== "ENTER" &&
      key !== "BACKSPACE" &&
      key !== "↵" &&
      key !== "⌦"
    ) {
      return; // If the key is not in the whitelist, exit the function
    }

    if (key === "↵" || key == "ENTER") {
      // Check if the current row is filled
      if (wordleRows[currentRow]?.includes(" ")) {
        alert("Please fill the entire row before submitting.");
        return;
      }

      // Check if the word is real
      const word =
        wordleRows[currentRow]?.join("").toLowerCase() ?? "".toLowerCase();
      if (!dictionary.includes(word)) {
        alert("Please enter a real word.");
        return;
      }

      // Submit the current row and check for correct letters
      const results = checkCorrectLetters(wordleRows[currentRow] ?? []);

      // Update the color of each letter based on the results
      setLetterColors((prevColors) => {
        const newColors = [...prevColors];
        newColors[currentRow] = results.map((result) => {
          switch (result) {
            case "correct":
              return "green"; // Change to the color for correct letters
            case "present":
              return "yellow"; // Change to the color for present letters
            case "empty":
              return "white"; // Change to the color for empty letters
            case "incorrect":
              return "gray"; // Change to the color for incorrect letters
            default:
              return "white"; // Default color
          }
        });
        return newColors;
      });

      setIsRowSubmitted((prevSubmitted) => {
        const newSubmitted = [...prevSubmitted];
        newSubmitted[currentRow] = true;
        return newSubmitted;
      });

      setCurrentRow((prevRow) => prevRow + 1);
    } else if (key === "⌦" || key == "BACKSPACE") {
      // Remove the last letter from the current row
      setWordleRows((prevRows) => {
        const newRows = [...prevRows];
        const currentRowLetters = [...(newRows[currentRow] ?? [])];
        const lastLetterIndex = currentRowLetters.findLastIndex(
          (letter: string) => letter !== " ",
        );
        if (lastLetterIndex !== -1) {
          currentRowLetters[lastLetterIndex] = " ";
        }
        newRows[currentRow] = currentRowLetters;
        return newRows;
      });
    } else if (wordleRows[currentRow]?.includes(" ")) {
      // Only add the key if the current row is not full
      setWordleRows((prevRows) => {
        const newRows = [...prevRows];
        const unfilledRow = [...(newRows[currentRow] ?? [])];
        const emptyIndex = unfilledRow.indexOf(" ");
        unfilledRow[emptyIndex] = key;
        newRows[currentRow] = unfilledRow;
        return newRows;
      });
    }
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const cookie = Cookies.get("darkMode");
    return cookie ? (JSON.parse(cookie) as boolean) : false;
  });

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    Cookies.set("darkMode", String(!isDarkMode));
  };

  function handleRowSubmit() {
    setIsRowSubmitted((prevSubmitted) => {
      const newSubmitted = [...prevSubmitted];
      newSubmitted[currentRow] = true;
      return newSubmitted;
    });
  }

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      // Whitelist of letters
      const whitelist = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

      // Check if the key is in the whitelist
      if (whitelist.includes(key)) {
        // Add the letter to the grid
      } else if (key === "Enter") {
        handleRowSubmit();
      } else if (key === "Backspace") {
        // Handle backspace
      } else {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Wordle - Roland Van Duine</title>
      </Head>
      <div
        className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
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
              className="pe-10 text-xl font-extrabold text-black dark:text-white"
            >
              Wordle 2
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
                      className={`grid-item flex h-16 w-16 items-center justify-center p-3 text-3xl sm:h-14 sm:w-14 ${
                        letter !== " " ? "font-bold" : ""
                      } ${
                        isRowSubmitted[rowIndex]
                          ? letterColors[rowIndex]?.[index] === "green"
                            ? "bg-green-500 text-white"
                            : letterColors[rowIndex]?.[index] === "yellow"
                            ? "bg-yellow-500 text-white"
                            : "border-0 bg-gray-500 text-white"
                          : "border-2 border-gray-300 bg-white text-black dark:border-gray-600 dark:bg-black dark:text-white"
                      } ${
                        rowIndex === currentRow && index === lastPressedKey
                          ? "scaleUp"
                          : ""
                      }`}
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
                      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded bg-gray-300 p-3 font-bold text-black dark:bg-gray-500 dark:text-white"
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
