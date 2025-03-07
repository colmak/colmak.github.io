"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

type LetterStatus = "correct" | "present" | "incorrect" | "empty";

interface WordleContextType {
  dictionary: string[];
  commonWords: string[];
  targetWord: string;
  selectedTheme: string;
  wordleRows: string[][];
  letterColors: string[][];
  currentRow: number;
  letterStatus: Record<string, string>;
  lastPressedKey: number | null;
  isRowSubmitted: boolean[];

  setTheme: (value: string) => void;
  handleKeyPress: (key: string) => void;
  resetBoard: () => void;
  generateShareableResult: () => void;
}

const WordleContext = createContext<WordleContextType | undefined>(undefined);

export const useWordleContext = () => {
  const context = useContext(WordleContext);
  if (context === undefined) {
    throw new Error("useWordleContext must be used within a WordleProvider");
  }
  return context;
};

interface WordleProviderProps {
  children: ReactNode;
}

export function WordleProvider({ children }: WordleProviderProps) {
  const [dictionary, setDictionary] = useState<string[]>(["APPLE"]);
  const [commonWords, setCommonWords] = useState<string[]>(["APPLE"]);
  const [targetWord, setTargetWord] = useState<string>("APPLE");
  const [selectedTheme, setSelectedTheme] = useState<string>("commonwords");

  const initialWordleRows = Array.from({ length: 6 }, () =>
    Array.from({ length: 5 }, () => " "),
  );
  const [letterColors, setLetterColors] = useState<string[][]>([]);
  const [wordleRows, setWordleRows] = useState(initialWordleRows);
  const [currentRow, setCurrentRow] = useState(0);
  const [letterStatus, setLetterStatus] = useState<Record<string, string>>({});
  const [lastPressedKey, setLastPressedKey] = useState<number | null>(null);
  const [isRowSubmitted, setIsRowSubmitted] = useState<boolean[]>(
    new Array(6).fill(false),
  );

  function pseudoRandom(seed: number) {
    const x = Math.sin(seed) * 1000000;
    return x - Math.floor(x);
  }

  // Load dictionary
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

  // Load common words initially
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

  // Set target word
  useEffect(() => {
    if (commonWords && commonWords.length > 0) {
      let randomWord = "";

      // Get today's date and convert it to a string format
      const today = new Date();
      const seed =
        today.getUTCFullYear() + today.getUTCMonth() + today.getUTCDate();

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
      if (letter === targetWord[index]) {
        status = "correct";
      } else if (targetWord.includes(letter)) {
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

  function setTheme(value: string): void {
    const fileName = `${value}.txt`;
    setSelectedTheme(value);
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

  const handleKeyPress = (key: string) => {
    const index = wordleRows[currentRow]?.indexOf(key);
    setLastPressedKey((index !== -1 ? index : null) as number | null);
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

    if (key === "↵" || key === "ENTER") {
      // Check if the current row is filled
      if (wordleRows[currentRow]?.includes(" ")) {
        alert("Please fill the entire row before submitting.");
        return;
      }
      // Check if the word is real
      const word =
        wordleRows[currentRow]?.join("").toLowerCase() ?? "".toLowerCase();
      if (!dictionary.includes(word)) {
        alert("Not in word list");
        return;
      }

      if (word.toUpperCase() === targetWord) {
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
    } else if (key === "⌦" || key === "BACKSPACE") {
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

  function resetBoard() {
    setWordleRows(
      Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => " ")),
    );
    setLetterColors([]);
    setCurrentRow(0);
    setLetterStatus({});
    setIsRowSubmitted(new Array(6).fill(false));
  }

  function generateShareableResult() {
    const result = wordleRows
      .slice(0, currentRow + 1) // Only include submitted rows
      .map((row, rowIndex) =>
        row
          .map((letter, index) => {
            if (letter === targetWord[index]) {
              return "🟩"; // Green for correct letters in the correct position
            } else if (targetWord.includes(letter)) {
              return "🟨"; // Yellow for correct letters in the wrong position
            } else {
              return "⬛"; // Black for incorrect letters
            }
          })
          .join(""),
      )
      .join("\n");

    const shareText = `Roland's Wordle\nTheme: ${selectedTheme}\n${result}`;

    navigator.clipboard
      .writeText(shareText)
      .then(() =>
        alert("Results copied to clipboard! Share it with your friends."),
      )
      .catch((err) =>
        console.error("Failed to copy results to clipboard:", err),
      );
  }

  const value = {
    dictionary,
    commonWords,
    targetWord,
    selectedTheme,
    wordleRows,
    letterColors,
    currentRow,
    letterStatus,
    lastPressedKey,
    isRowSubmitted,
    setTheme,
    handleKeyPress,
    resetBoard,
    generateShareableResult,
  };

  return (
    <WordleContext.Provider value={value}>{children}</WordleContext.Provider>
  );
}
