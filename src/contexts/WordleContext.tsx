"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";

type LetterStatus = "correct" | "present" | "incorrect" | "empty";
type GameMode = "classic" | "speed" | "endless";

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
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  timeRemaining: number;
  streak: number;
  bestStreak: number;
  solvedCount: number;
  startNewGame: () => void;
  classicStreak: number;
  classicBestStreak: number;
  solveTime: number;
  bestSolveTime: number | null;
  isGameActive: boolean;
  isGameCompleted: boolean;
  formatTime: (seconds: number) => string;

  setTheme: (value: string) => void;
  handleKeyPress: (key: string) => void;
  resetBoard: () => void;
  generateShareableResult: () => boolean;
  setTargetWord?: (word: string) => void;
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
  const [gameMode, setGameMode] = useState<GameMode>("classic");
  const [timeRemaining, setTimeRemaining] = useState<number>(300); // 5 minutes in seconds
  const [streak, setStreak] = useState<number>(0);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const [solvedCount, setSolvedCount] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(false);
  const [classicStreak, setClassicStreak] = useState<number>(0);
  const [classicBestStreak, setClassicBestStreak] = useState<number>(0);
  const [solveTime, setSolveTime] = useState<number>(0);
  const [bestSolveTime, setBestSolveTime] = useState<number | null>(null);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [gameStartTime, setGameStartTime] = useState<number>(0);
  const [isGameCompleted, setIsGameCompleted] = useState<boolean>(false);

  function pseudoRandom(seed: number) {
    const x = Math.sin(seed) * 1000000;
    return x - Math.floor(x);
  }

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

  const getClassicWordForToday = useCallback(() => {
    if (commonWords && commonWords.length > 0) {
      const today = new Date();
      const seed =
        today.getUTCFullYear() * 10000 +
        (today.getUTCMonth() + 1) * 100 +
        today.getUTCDate();

      const randomNumber: number = pseudoRandom(seed);
      const randomIndex = Math.floor(randomNumber * commonWords.length);
      return commonWords[randomIndex]?.toUpperCase() ?? "APPLE";
    }
    return "APPLE";
  }, [commonWords]);

  useEffect(() => {
    if (commonWords && commonWords.length > 0) {
      if (gameMode === "classic") {
        setTargetWord(getClassicWordForToday());
      } else {
        const randomIndex = Math.floor(Math.random() * commonWords.length);
        const randomWord = commonWords[randomIndex]?.toUpperCase() ?? "APPLE";
        setTargetWord(randomWord);
      }
    }
  }, [commonWords, gameMode, getClassicWordForToday]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (gameMode === "speed" && isTimerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0 && gameMode === "speed") {
      alert(`Time's up! You solved ${solvedCount} puzzles.`);
      setIsTimerActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameMode, isTimerActive, timeRemaining, solvedCount]);

  useEffect(() => {
    const savedBestStreak = localStorage.getItem("wordleBestStreak");
    if (savedBestStreak) {
      setBestStreak(parseInt(savedBestStreak, 10));
    }
  }, []);

  useEffect(() => {
    const savedClassicStreak = localStorage.getItem("wordleClassicStreak");
    const savedClassicBestStreak = localStorage.getItem(
      "wordleClassicBestStreak",
    );
    const savedBestSolveTime = localStorage.getItem("wordleBestSolveTime");

    if (savedClassicStreak) {
      setClassicStreak(parseInt(savedClassicStreak, 10));
    }
    if (savedClassicBestStreak) {
      setClassicBestStreak(parseInt(savedClassicBestStreak, 10));
    }
    if (savedBestSolveTime) {
      setBestSolveTime(parseInt(savedBestSolveTime, 10));
    }
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isGameActive && !isGameCompleted) {
      interval = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);
        setSolveTime(elapsedTime);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive, gameStartTime, isGameCompleted]);

  useEffect(() => {
    if (
      wordleRows.some((row) => row.some((cell) => cell !== " ")) &&
      !isGameActive &&
      gameMode === "classic"
    ) {
      setIsGameActive(true);
      setGameStartTime(Date.now());
    }
  }, [wordleRows, isGameActive, gameMode]);

  const checkCorrectLetters = (row: string[]) => {
    const targetLetters = targetWord.split("");
    const letterCounts: Record<string, number> = {};

    for (const letter of targetLetters) {
      letterCounts[letter] = (letterCounts[letter] || 0) + 1;
    }

    const result = Array(row.length).fill("incorrect");

    for (let i = 0; i < row.length; i++) {
      const letter = row[i];
      if (letter === targetWord[i]) {
        result[i] = "correct";
        letterCounts[letter] = letterCounts[letter]! - 1;
      }
    }

    for (let i = 0; i < row.length; i++) {
      const letter = row[i];
      if (result[i] !== "correct" && letterCounts[letter]! > 0) {
        result[i] = "present";
        letterCounts[letter] = letterCounts[letter]! - 1;
      }
    }

    row.forEach((letter, index) => {
      const status = result[index];

      setLetterStatus((prevStatus) => {
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
    });

    return result as LetterStatus[];
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

        if (gameMode === "classic") {
          setTimeout(() => {
            setTargetWord(getClassicWordForToday());
          }, 100);
        } else {
          const randomIndex = Math.floor(Math.random() * words.length);
          const randomWord = words[randomIndex]?.toUpperCase() ?? "APPLE";
          setTargetWord(randomWord);
        }
      })
      .catch((error) => console.error(`Error loading ${fileName}:`, error));
  }

  const handleKeyPress = (key: string) => {
    if (gameMode === "classic" && isGameCompleted) {
      return;
    }

    const index = wordleRows[currentRow]?.indexOf(key) ?? -1;
    setLastPressedKey(index !== -1 ? index : null);
    const whitelist = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    key = key.toUpperCase();
    if (
      !whitelist.includes(key) &&
      key !== "ENTER" &&
      key !== "BACKSPACE" &&
      key !== "↵" &&
      key !== "⌦"
    ) {
      return;
    }

    if (key === "↵" || key === "ENTER") {
      if (wordleRows[currentRow]?.includes(" ")) {
        alert("Please fill the entire row before submitting.");
        return;
      }
      const word =
        wordleRows[currentRow]?.join("").toLowerCase() ?? "".toLowerCase();
      if (!dictionary.includes(word)) {
        alert("Not in word list");
        return;
      }

      if (word.toUpperCase() === targetWord) {
        const results = checkCorrectLetters(wordleRows[currentRow] ?? []);

        setLetterColors((prevColors) => {
          const newColors = [...prevColors];
          newColors[currentRow] = results.map((result) => {
            switch (result) {
              case "correct":
                return "green";
              case "present":
                return "yellow";
              case "empty":
                return "white";
              case "incorrect":
                return "gray";
              default:
                return "white";
            }
          });
          return newColors;
        });

        setIsRowSubmitted((prevSubmitted) => {
          const newSubmitted = [...prevSubmitted];
          newSubmitted[currentRow] = true;
          return newSubmitted;
        });

        if (gameMode === "classic") {
          const finalSolveTime = Math.floor(
            (Date.now() - gameStartTime) / 1000,
          );
          setSolveTime(finalSolveTime);
          setIsGameActive(false);
          setIsGameCompleted(true);

          if (bestSolveTime === null || finalSolveTime < bestSolveTime) {
            setBestSolveTime(finalSolveTime);
            localStorage.setItem(
              "wordleBestSolveTime",
              finalSolveTime.toString(),
            );
          }

          const newStreak = classicStreak + 1;
          setClassicStreak(newStreak);
          localStorage.setItem("wordleClassicStreak", newStreak.toString());

          if (newStreak > classicBestStreak) {
            setClassicBestStreak(newStreak);
            localStorage.setItem(
              "wordleClassicBestStreak",
              newStreak.toString(),
            );
          }

          setTimeout(() => {
            alert(
              `Congratulations! You guessed the word: ${targetWord}\nTime: ${formatTime(
                finalSolveTime,
              )}\nStreak: ${newStreak}`,
            );
          }, 100);
        } else if (gameMode === "speed") {
          setSolvedCount((prev) => prev + 1);
          setTimeout(() => {
            const randomIndex = Math.floor(
              Math.random() * (commonWords.length || 1),
            );
            const randomWord =
              commonWords[randomIndex]?.toUpperCase() ?? "APPLE";
            setTargetWord(randomWord);

            setWordleRows(
              Array.from({ length: 6 }, () =>
                Array.from({ length: 5 }, () => " "),
              ),
            );
            setLetterColors([]);
            setCurrentRow(0);
            setLetterStatus({});
            setIsRowSubmitted(new Array(6).fill(false));
          }, 300);
        } else if (gameMode === "endless") {
          const newStreak = streak + 1;
          setStreak(newStreak);

          if (newStreak > bestStreak) {
            setBestStreak(newStreak);
            localStorage.setItem("wordleBestStreak", newStreak.toString());
          }

          setTimeout(() => {
            alert(`Correct! Your current streak: ${newStreak}`);
            startNewGame();
          }, 300);
        }
        return;
      }

      const results = checkCorrectLetters(wordleRows[currentRow] ?? []);

      setLetterColors((prevColors) => {
        const newColors = [...prevColors];
        newColors[currentRow] = results.map((result) => {
          switch (result) {
            case "correct":
              return "green";
            case "present":
              return "yellow";
            case "empty":
              return "white";
            case "incorrect":
              return "gray";
            default:
              return "white";
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

      if (currentRow === wordleRows.length - 1) {
        if (gameMode === "classic") {
          setIsGameActive(false);
          setIsGameCompleted(true);
          setClassicStreak(0);
          localStorage.setItem("wordleClassicStreak", "0");
          alert(`All rows are filled. The target word was ${targetWord}`);
          generateShareableResult();
        } else if (gameMode === "endless") {
          alert(
            `Game over! The word was ${targetWord}. Your final streak: ${streak}`,
          );
          setStreak(0);
          startNewGame();
        } else if (gameMode === "speed") {
          setTimeout(() => {
            const randomIndex = Math.floor(
              Math.random() * (commonWords.length || 1),
            );
            const randomWord =
              commonWords[randomIndex]?.toUpperCase() ?? "APPLE";
            setTargetWord(randomWord);

            setWordleRows(
              Array.from({ length: 6 }, () =>
                Array.from({ length: 5 }, () => " "),
              ),
            );
            setLetterColors([]);
            setCurrentRow(0);
            setLetterStatus({});
            setIsRowSubmitted(new Array(6).fill(false));
          }, 300);
        }
      }
    } else if (key === "⌦" || key === "BACKSPACE") {
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

  function resetBoardOnly() {
    setWordleRows(
      Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => " ")),
    );
    setLetterColors([]);
    setCurrentRow(0);
    setLetterStatus({});
    setIsRowSubmitted(new Array(6).fill(false));
  }

  function resetBoard() {
    setWordleRows(
      Array.from({ length: 6 }, () => Array.from({ length: 5 }, () => " ")),
    );
    setLetterColors([]);
    setCurrentRow(0);
    setLetterStatus({});
    setIsRowSubmitted(new Array(6).fill(false));

    if (gameMode === "classic") {
      setIsGameActive(false);
      setIsGameCompleted(false);
      setSolveTime(0);
    }
  }

  function generateShareableResult() {
    let shareText = "";
    let header = "";
    let gameDetails = "";
    let gridResult = "";

    const currentAttempt = isRowSubmitted.filter(Boolean).length;
    const success =
      gameMode === "classic" &&
      wordleRows.some(
        (row, index) => isRowSubmitted[index] && row.join("") === targetWord,
      );

    gridResult = wordleRows
      .filter((_, rowIndex) => isRowSubmitted[rowIndex])
      .map((row) => {
        return row
          .map((letter, index) => {
            if (letter === targetWord[index]) {
              return "🟩";
            } else if (targetWord.includes(letter)) {
              const targetLetters = targetWord.split("");
              const letterCounts: Record<string, number> = {};

              for (const l of targetLetters) {
                letterCounts[l] = (letterCounts[l] || 0) + 1;
              }

              for (let i = 0; i < row.length; i++) {
                if (row[i] === targetWord[i] && row[i] === letter) {
                  letterCounts[letter] = letterCounts[letter]! - 1;
                }
              }

              if (letterCounts[letter]! > 0) {
                letterCounts[letter] = letterCounts[letter]! - 1;
                return "🟨";
              }
              return "⬛";
            } else {
              return "⬛";
            }
          })
          .join("");
      })
      .join("\n");

    header = `Roland's Wordle (${selectedTheme})`;

    if (gameMode === "classic") {
      const attempts = success ? currentAttempt : "X/6";
      const timeText = success ? `Time: ${formatTime(solveTime)}` : "";
      const dateStr = new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      gameDetails = `Mode: Classic (${dateStr})\n${attempts}${
        timeText ? "\n" + timeText : ""
      }`;
    } else if (gameMode === "speed") {
      gameDetails = `Mode: Speed\nSolved: ${solvedCount}\nTime: ${formatTime(
        timeRemaining,
      )}`;
    } else if (gameMode === "endless") {
      gameDetails = `Mode: Endless\nStreak: ${streak}\nBest Streak: ${bestStreak}`;
    }

    shareText = `${header}\n${gameDetails}\n\n${gridResult}`;

    try {
      navigator.clipboard.writeText(shareText);
      return true;
    } catch (err) {
      console.error("Could not copy text: ", err);

      try {
        const textarea = document.createElement("textarea");
        textarea.value = shareText;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        return true;
      } catch (fallbackErr) {
        console.error("Fallback copy method failed: ", fallbackErr);
        alert("Could not copy to clipboard. Your results are:\n\n" + shareText);
        return false;
      }
    }
  }

  function startNewGame() {
    resetBoard();

    if (gameMode === "classic") {
      setTargetWord(getClassicWordForToday());
      setIsGameActive(false);
      setSolveTime(0);
    } else if (gameMode === "speed" && !isTimerActive) {
      setTimeRemaining(300);
      setSolvedCount(0);
      setIsTimerActive(true);
      const randomIndex = Math.floor(Math.random() * (commonWords.length || 1));
      const randomWord = commonWords[randomIndex]?.toUpperCase() ?? "APPLE";
      setTargetWord(randomWord);
    } else if (gameMode === "endless") {
      const randomIndex = Math.floor(Math.random() * (commonWords.length || 1));
      const randomWord = commonWords[randomIndex]?.toUpperCase() ?? "APPLE";
      setTargetWord(randomWord);
    }
  }

  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  }

  const handleModeChange = (newMode: GameMode) => {
    setGameMode(newMode);
    resetBoard();
    setIsGameCompleted(false);

    if (newMode === "classic") {
      setTargetWord(getClassicWordForToday());
      setIsGameActive(false);
      setSolveTime(0);
    } else if (newMode === "speed") {
      setTimeRemaining(300);
      setSolvedCount(0);
      setIsTimerActive(false);
      const randomIndex = Math.floor(Math.random() * (commonWords.length || 1));
      const randomWord = commonWords[randomIndex]?.toUpperCase() ?? "APPLE";
      setTargetWord(randomWord);
    } else if (newMode === "endless") {
      const randomIndex = Math.floor(Math.random() * (commonWords.length || 1));
      const randomWord = commonWords[randomIndex]?.toUpperCase() ?? "APPLE";
      setTargetWord(randomWord);
    }
  };

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
    setTargetWord,
    gameMode,
    setGameMode: handleModeChange,
    timeRemaining,
    streak,
    bestStreak,
    solvedCount,
    startNewGame,
    classicStreak,
    classicBestStreak,
    solveTime,
    bestSolveTime,
    isGameActive,
    isGameCompleted,
    formatTime,
  };

  return (
    <WordleContext.Provider value={value}>{children}</WordleContext.Provider>
  );
}
