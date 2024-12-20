"use client";

import React from "react";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/Footer";
import WordleBoard from '~/components/WordleBoard';


export default function WordlePage() {
  const [dictionary, setDictionary] = useState<string[]>(["APPLE"]);
  const [commonWords, setCommonWords] = useState<string[]>(["APPLE"]);
  const [targetWord, setTargetWord] = useState<string | undefined>("APPLE");
  const [selectedTheme, setSelectedTheme] = useState<string>("default");

  useEffect(() => {
    fetch("words_alpha.txt")
      .then((response) => response.text())
      .then((data) => {
        const words = data
          .split("\n")
          .map((word) => word.replace(/^\n/, ""))
          .map((word) => word.replace(/\r$/, ""));
        setDictionary(words.filter((word) => word.length === 5));
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    fetch("commonwords.txt")
      .then((response) => response.text())
      .then((data) => {
        const words = data
          .split("\n")
          .map((word) => word.replace(/^\n/, ""))
          .map((word) => word.replace(/\r$/, ""));
        setCommonWords(words.filter((word) => word.length === 5));
      })
      .catch((error) => console.error(error));
  }, []);

  function pseudoRandom(seed: number) {
    const x = Math.sin(seed) * 1000000;
    return x - Math.floor(x);
  }

  useEffect(() => {
    if (commonWords && commonWords.length > 0) {
      let randomWord = "";

      // Get today's date and convert it to a string format
      const today = new Date();
      const seed = today.getUTCFullYear() + today.getUTCMonth() + today.getUTCDate();

      // Create a pseudo-random number using the seed
      const randomNumber: number = pseudoRandom(seed);

      // Use the pseudo-random number to get a word from the dictionary
      const randomIndex = Math.floor(randomNumber * commonWords.length);
      randomWord = commonWords[randomIndex]?.toUpperCase() ?? "APPLE";

      setTargetWord(randomWord);
    }
  }, [commonWords]);

  const checkCorrectLetters = (row: string[]) => {
    const result = row.map((letter, index) => {
      let status: string;
      if (letter === (targetWord ?? "")[index]) {
        status = "correct";
      } else if ((targetWord ?? "").includes(letter)) {
        status = "present";
      } else if (letter === null) {
        status = "empty";
      } else {
        status = "incorrect";
      }
  
      setLetterStatus((prevStatus) => {
        // Only update the status if the new status has a higher precedence
        if (
          !prevStatus[letter] ||
          (status === "correct" && prevStatus[letter] !== "correct") ||
          (status === "present" && prevStatus[letter] === "incorrect")
        ) {
          return { ...prevStatus, [letter]: status };
        } else {
          return prevStatus;
        }
      });
  
      return status;
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
  const [letterStatus, setLetterStatus] = useState<Record<string, string>>({});
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
    setLastPressedKey(index !== -1 ? index : null);
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

      if (word === targetWord) {
        alert(`Congratulations! You guessed the word: ${targetWord}`);
        generateShareableResult();
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

      // If the current row is the last row, show the target word
      if (currentRow === wordleRows.length - 1) {
        alert(`All rows are filled. The target word was ${targetWord}`);
        generateShareableResult();
      }
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
  }, [handleRowSubmit]);

  function generateShareableResult() {
    const result = wordleRows
      .slice(0, currentRow+1) // Only include submitted rows
      .map((row, rowIndex) =>
        row
          .map((letter, index) => {
            if (letter === (targetWord ?? "")[index]) {
              return "🟩"; // Green for correct letters in the correct position
            } else if ((targetWord ?? "").includes(letter)) {
              return "🟨"; // Yellow for correct letters in the wrong position
            } else {
              return "⬛"; // Black for incorrect letters
            }
          })
          .join("")
      )
      .join("\n");
  
    const shareText = `Roland's Wordle\nTheme: ${selectedTheme}\n${result}`;
  
    navigator.clipboard.writeText(shareText)
      .then(() => alert("Results copied to clipboard! Share it with your friends."))
      .catch((err) => console.error("Failed to copy results to clipboard:", err));

  }  

  function resetBoard() {
    setWordleRows(Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => " ")));
    setLetterColors([]);
    setCurrentRow(0);
    setLetterStatus({});
    setIsRowSubmitted(new Array(6).fill(false)); 
  }

  function setTheme(value: string): void {
    const fileName = (`${value}.txt`); 
    setSelectedTheme(value)
    resetBoard();
  
    fetch(fileName)
      .then((response) => response.text())
      .then((data) => {
        const words = data
          .split("\n")
          .map((word) => word.trim()) 
          .filter((word) => word.length === 5); 
        setCommonWords(words);
      })
      .catch((error) => console.error(`Error loading ${fileName}:`, error));
  }
  

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
            <div className="flex items-center space-x-4">
            <select
              className="border border-gray-300 rounded px-2 py-1 dark:bg-gray-800 dark:text-white"
              placeholder="Select word list"
              defaultValue="commonwords"
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="commonwords">Default</option>
              <option value="animals">Animals</option>
              <option value="countries">Countries</option>
              <option value="capitals">Capitals</option>
              <option value="science">Science</option>
              <option value="games">Games</option>
              <option value="og_word_list">OG Wordle</option>
              <option value="words_alpha">All The Words</option>
            </select>
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
          <main className="slide-enter-content container flex max-w-screen-sm flex-col items-start justify-start gap-0.5">
            <WordleBoard 
              wordleRows={wordleRows} 
              isRowSubmitted={isRowSubmitted} 
              letterColors={letterColors} 
              currentRow={currentRow} 
              lastPressedKey={lastPressedKey ?? 0} 
            />

            <div className="mx-auto mt-4 grid grid-cols-1 grid-rows-3 gap-1">
              {keyboardRows.map((row, _rowIndex) => (
                <div
                  key={_rowIndex}
                  className="slide-enter-content flex justify-center gap-1"
                >
                  {row.map((letter, index) => (
                    <div
                      key={index}
                      id={String(_rowIndex * row.length + index)}
                      className={`flex h-12 w-12 grid-item cursor-pointer items-center justify-center rounded p-3 font-bold ${
                        letterStatus[letter] === "correct"
                          ? "bg-green-500 text-white"
                          : letterStatus[letter] === "present"
                          ? "bg-yellow-500 text-white"
                          : letterStatus[letter] === "incorrect"
                          ? "bg-gray-500 text-white"
                          : "bg-gray-300 text-black dark:bg-gray-500 dark:text-white"
                      }`}
                      onClick={() => handleKeyPress(letter)}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="p-2"></div>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                onClick={generateShareableResult}
              >
                Share
              </button>
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
