// Temp rules:
/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */

"use client";

import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { IoMdSunny, IoMdMoon } from "react-icons/io";
import Head from "next/head";
import Link from "next/link";
import Footer from "~/components/Footer";
import { Chessboard } from "react-chessboard"; 
import axios from "axios";
import UnderlinedText from "~/components/UnderlinedText";

const pieceMap: { [key: number]: string } = {
  9: "bR",  // Black Rook
  10: "bN", // Black Knight
  11: "bB", // Black Bishop
  12: "bQ", // Black Queen
  13: "bK", // Black King
  14: "bP", // Black Pawn
  17: "wR", // White Rook
  18: "wN", // White Knight
  19: "wB", // White Bishop
  20: "wQ", // White Queen
  21: "wK", // White King
  22: "wP", // White Pawn
  0: "",    // Empty square
};

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
          mappedBoard[square] = piece;
        }
      }
    }
  }
  
  return mappedBoard;
};

const defaultBoardState = {
  a8: "bR", b8: "bN", c8: "bB", d8: "bQ", e8: "bK", f8: "bB", g8: "bN", h8: "bR",
  a7: "bP", b7: "bP", c7: "bP", d7: "bP", e7: "bP", f7: "bP", g7: "bP", h7: "bP",
  a2: "wP", b2: "wP", c2: "wP", d2: "wP", e2: "wP", f2: "wP", g2: "wP", h2: "wP",
  a1: "wR", b1: "wN", c1: "wB", d1: "wQ", e1: "wK", f1: "wB", g1: "wN", h1: "wR",
};

export default function ChessPage() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const cookie = Cookies.get("darkMode");
    return cookie ? (JSON.parse(cookie) as boolean) : false;
  });
  const [boardState, setBoardState] = useState<{ [key: string]: string }>(defaultBoardState);
  const [turn, setTurn] = useState<string>("white");
  const [apiDown, setApiDown] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    Cookies.set("darkMode", String(!isDarkMode));
  };


const fetchBoardState = async () => {
  try {
    const response = await axios.get("http://localhost:8080/status");
    const apiBoard = response.data.board; 
    const mappedBoard = mapBoardState(apiBoard); 
    setBoardState(mappedBoard);

    console.log("Fetched Board State:", apiBoard);
    console.log("Mapped Board State:", mappedBoard);

    
    setTurn(response.data.turn === 8 ? "white" : "black");
    setApiDown(false);
  } catch (error) {
    console.error("Error fetching board state:", error);
    setApiDown(true);
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
        const updatedBoard = mapBoardState(response.data.board); 
        setBoardState(updatedBoard); 
        setTurn(response.data.turn === 8 ? "white" : "black"); 
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
    handleMove(sourceSquare, targetSquare).then((result) => {
      if (!result) {
        console.error("Move failed");
      }
    });
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
          <main className="slide-enter-content container flex max-w-screen-sm flex-col items-start justify-start gap-4 px-8 py-12">
            <h1 className="w-full pb-3 text-center text-[2rem] font-bold tracking-tight text-black dark:text-white">
              
            </h1>

            {apiDown ? (
              <div className="text-center text-red-500">
                <p>The chess API is currently not being hosted.</p>
                <p>
                  Check out the code here: <UnderlinedText href="https://github.com/colmak/go-chess-go">
              Github
            </UnderlinedText>
                </p>
              </div>
            ) : (
              <Chessboard
                position={boardState}
                onPieceDrop={handlePieceDrop}
                boardOrientation={turn === "white" ? "white" : "black"}
              />
            )}

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
