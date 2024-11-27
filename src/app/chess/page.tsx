"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/Footer";
import { Chessboard } from "react-chessboard"; 
import axios from "axios";

// Mapping numeric pieces from the API to chess notation
const pieceMap: { [key: number]: string } = {
  9: "r",   // Black Rook
  10: "n",  // Black Knight
  11: "b",  // Black Bishop
  12: "q",  // Black Queen
  13: "k",  // Black King
  14: "p",  // Black Pawn
  17: "R",  // White Rook
  18: "N",  // White Knight
  19: "B",  // White Bishop
  20: "Q",  // White Queen
  21: "K",  // White King
  22: "P",  // White Pawn
  0: "",    // Empty square
};

// Function to map the board state to chess notation
const mapBoardState = (board: number[][]): { [key: string]: string } => {
  const mappedBoard: { [key: string]: string } = {};
  
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const pieceCode = board?.[row]?.[col];
      const piece = pieceMap[pieceCode || "0"];
      
      if (piece) {
        const file = String.fromCharCode(97 + col); // Convert col to 'a' to 'h'
        const rank = (8 - row).toString();          // Convert row to '8' to '1'
        const square = `${file}${rank}`;
        if (piece !== "") {
          mappedBoard[square] = piece;  // Set the piece at the correct square
        }
      }
    }
  }
  
  return mappedBoard;
};

export default function ChessPage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const cookie = Cookies.get("darkMode");
    return cookie ? (JSON.parse(cookie) as boolean) : false;
  });
  const [boardState, setBoardState] = useState<{ [key: string]: string }>({});
  const [turn, setTurn] = useState<string>("white");

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    Cookies.set("darkMode", String(!isDarkMode));
  };

  // Fetch the board state from the API
// Fetch the board state from the API
const fetchBoardState = async () => {
  try {
    const response = await axios.get("http://localhost:8080/status");
    const apiBoard = response.data.board; // Get the numeric board from API
    const mappedBoard = mapBoardState(apiBoard); // Map it to chess notation
    setBoardState(mappedBoard);

    // Print the board to the console for debugging
    console.log("Fetched Board State:", apiBoard);
    console.log("Mapped Board State:", mappedBoard);

    // Handle turn based on numeric value (8 for White, 16 for Black)
    setTurn(response.data.turn === 8 ? "white" : "black");
  } catch (error) {
    console.error("Error fetching board state:", error);
  }
};

  const handleMove = async (from: string, to: string): Promise<boolean> => {
    if (!from || !to) {
      console.error("Invalid move: 'from' and 'to' must be defined");
      return false;
    }

    const startRow = 8 - parseInt(from[1] || "0", 10); // Convert notation like 'e2' to row 6
    const startCol = from.charCodeAt(0) - 97; // Convert 'e' to column 4 (zero-indexed)
    const endRow = 8 - parseInt(to[1] || "0", 10);
    const endCol = to.charCodeAt(0) - 97;

    try {
      const response = await axios.post("http://localhost:8080/move", {
        start_row: startRow,
        start_col: startCol,
        end_row: endRow,
        end_col: endCol,
      });

      if (response.status === 200) {
        const updatedBoard = mapBoardState(response.data.board); // Map the response board
        setBoardState(updatedBoard); // Update board state
        setTurn(response.data.turn === 8 ? "white" : "black"); // Update turn
        return true;
      } else {
        console.error("Invalid move:", response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Error making move:", error);
      return false;
    }
  };

  const handlePieceDrop = (sourceSquare: string, targetSquare: string, piece: string): boolean => {
    // Call handleMove asynchronously and handle the result
    handleMove(sourceSquare, targetSquare).then((result) => {
      if (!result) {
        console.error("Move failed");
      }
    });
  
    // Return true to indicate the move was handled
    return true;
  };
  
  const resetGame = async () => {
    try {
      const response = await axios.post("http://localhost:8080/reset");
      setBoardState(mapBoardState(response.data.board));
      setTurn("white");
    } catch (error) {
      console.error("Error resetting game:", error);
    }
  };

  useEffect(() => {
    fetchBoardState();
  }, []);

  return (
    <>
      <Head>
        <title>Chess - Roland Van Duine</title>
      </Head>
      <div className="flex min-h-screen flex-col bg-white text-gray-500 dark:bg-black dark:text-gray-200">
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

        <div className="container mx-auto flex items-center justify-center">
          <main className="slide-enter-content 12 container flex max-w-screen-sm flex-col items-start justify-start gap-4 px-8 py-12">
            <h1 className="w-full pb-3 text-center text-[2rem] font-bold tracking-tight text-black dark:text-white">
              Chess
            </h1>

            <Chessboard
              position={boardState} // Position from the API
              onPieceDrop={handlePieceDrop} // Called when a piece is moved
              boardOrientation={turn === "white" ? "white" : "black"} // Handle turn
            />

            <button onClick={resetGame} className="mt-4 p-2 bg-blue-500 text-white">
              Reset Game
            </button>

            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
