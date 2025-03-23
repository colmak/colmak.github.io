import { describe, test, expect, beforeEach, vi, beforeAll } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { WordleProvider, useWordleContext } from "../contexts/WordleContext";
import WordleGame from "../components/WordleGame";
import React from "react";

vi.mock("../components/WordleBoard", () => ({
  default: ({
    wordleRows,
    isRowSubmitted,
    letterColors,
    currentRow,
    lastPressedKey,
  }: {
    wordleRows: string[][];
    isRowSubmitted: boolean[];
    letterColors: string[][];
    currentRow: number;
    lastPressedKey: string;
  }) => (
    <div data-testid="wordle-board">
      {wordleRows.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} data-testid="wordle-row">
          {row.map((letter, colIndex) => (
            <div
              key={`cell-${rowIndex}-${colIndex}`}
              data-testid="grid-item"
              className={
                isRowSubmitted[rowIndex] && letterColors[rowIndex]
                  ? `bg-${letterColors[rowIndex][colIndex]}-500`
                  : ""
              }
            >
              {letter !== " " ? letter : ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
}));

vi.mock("../components/WordleKeyboard", () => {
  const WordleKeyboardMock = () => {
    const { handleKeyPress } = useWordleContext();
    return (
      <div data-testid="wordle-keyboard">
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map((key) => (
          <div
            key={key}
            data-testid={`key-${key}`}
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </div>
        ))}
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((key) => (
          <div
            key={key}
            data-testid={`key-${key}`}
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </div>
        ))}
        <div data-testid="key-↵" onClick={() => handleKeyPress("↵")}>
          ↵
        </div>
        {["Z", "X", "C", "V", "B", "N", "M"].map((key) => (
          <div
            key={key}
            data-testid={`key-${key}`}
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </div>
        ))}
        <div data-testid="key-⌦" onClick={() => handleKeyPress("⌦")}>
          ⌦
        </div>
      </div>
    );
  };

  return {
    default: WordleKeyboardMock,
  };
});

global.fetch = vi.fn(async (url: RequestInfo | URL) => {
  let data = "";

  if (url === "words_alpha.txt") {
    data =
      "apple\nspeed\nessee\nworld\nword\nwould\nwater\nhouse\npaper\nhello";
  } else if (url === "commonwords.txt") {
    data = "apple\nspeed\nworld\nword\nwater\nhouse";
  }

  return Promise.resolve({
    text: () => Promise.resolve(data),
  }) as Promise<Response>;
});

Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

global.alert = vi.fn();

const TestComponentWithWord = ({ targetWord }: { targetWord: string }) => {
  const { setTargetWord } = useWordleContext();

  React.useEffect(() => {
    if (setTargetWord) {
      setTargetWord(targetWord);
    }
  }, [setTargetWord, targetWord]);

  return <WordleGame />;
};

describe("WordleGame", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  beforeAll(() => {
    document.body.innerHTML = '<div id="root"></div>';
  });

  test("renders the game board and keyboard", async () => {
    render(
      <WordleProvider>
        <WordleGame />
      </WordleProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId("wordle-board")).toBeInTheDocument();
      expect(screen.getByTestId("wordle-keyboard")).toBeInTheDocument();
    });

    expect(screen.getAllByTestId("grid-item")).toHaveLength(30);

    expect(screen.getByTestId("key-Q")).toBeInTheDocument();
    expect(screen.getByTestId("key-↵")).toBeInTheDocument();
    expect(screen.getByTestId("key-⌦")).toBeInTheDocument();
  });

  test("allows typing and deleting letters", async () => {
    render(
      <WordleProvider>
        <WordleGame />
      </WordleProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("grid-item")).toHaveLength(30);
    });

    fireEvent.click(screen.getByTestId("key-W"));
    fireEvent.click(screen.getByTestId("key-O"));
    fireEvent.click(screen.getByTestId("key-R"));
    fireEvent.click(screen.getByTestId("key-D"));

    const cells = screen.getAllByTestId("grid-item");
    expect(cells[0]).toHaveTextContent("W");
    expect(cells[1]).toHaveTextContent("O");
    expect(cells[2]).toHaveTextContent("R");
    expect(cells[3]).toHaveTextContent("D");

    fireEvent.click(screen.getByTestId("key-⌦"));

    expect(cells[3]).toHaveTextContent("");
  });

  test("sets a target word and handles dictionary validation", async () => {
    render(
      <WordleProvider>
        <TestComponentWithWord targetWord="SPEED" />
      </WordleProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("grid-item")).toHaveLength(30);
    });

    const alertSpy = vi.spyOn(window, "alert");

    fireEvent.click(screen.getByTestId("key-Z"));
    fireEvent.click(screen.getByTestId("key-Z"));
    fireEvent.click(screen.getByTestId("key-Z"));
    fireEvent.click(screen.getByTestId("key-Z"));
    fireEvent.click(screen.getByTestId("key-Z"));

    fireEvent.click(screen.getByTestId("key-↵"));

    expect(alertSpy).toHaveBeenCalledWith("Not in word list");
    alertSpy.mockClear();

    for (let i = 0; i < 5; i++) {
      fireEvent.click(screen.getByTestId("key-⌦"));
    }

    fireEvent.click(screen.getByTestId("key-W"));
    fireEvent.click(screen.getByTestId("key-O"));
    fireEvent.click(screen.getByTestId("key-R"));
    fireEvent.click(screen.getByTestId("key-L"));
    fireEvent.click(screen.getByTestId("key-D"));

    fireEvent.click(screen.getByTestId("key-↵"));

    expect(alertSpy).not.toHaveBeenCalledWith("Not in word list");
  });

  test("handles incomplete rows", async () => {
    render(
      <WordleProvider>
        <WordleGame />
      </WordleProvider>,
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("grid-item")).toHaveLength(30);
    });

    fireEvent.click(screen.getByTestId("key-C"));
    fireEvent.click(screen.getByTestId("key-A"));
    fireEvent.click(screen.getByTestId("key-T"));

    fireEvent.click(screen.getByTestId("key-↵"));

    expect(global.alert).toHaveBeenCalledWith(
      "Please fill the entire row before submitting.",
    );
  });

  test("shows congratulations when word is guessed correctly", async () => {
    vi.clearAllMocks();
    const alertMock = vi.fn();
    global.alert = alertMock;

    const SpecialTestComponent = () => {
      const wordleContext = useWordleContext();
      const contextRef = React.useRef(wordleContext);

      React.useEffect(() => {
        contextRef.current = wordleContext;
      }, [wordleContext]);

      React.useEffect(() => {
        if (contextRef.current.setTargetWord) {
          contextRef.current.setTargetWord("WORLD");

          setTimeout(() => {
            "WORLD".split("").forEach((letter) => {
              if (contextRef.current.handleKeyPress) {
                // eslint-disable-next-line @typescript-eslint/unbound-method
                const handleKeyPress = (key: string) =>
                  contextRef.current.handleKeyPress?.(key);
                handleKeyPress(letter);
              }
            });
            if (contextRef.current.handleKeyPress) {
              // eslint-disable-next-line @typescript-eslint/unbound-method
              const handleKeyPress = (key: string) =>
                contextRef.current.handleKeyPress?.(key);
              handleKeyPress("↵");
            }
          }, 50);
        }
      }, []);

      return <WordleGame />;
    };

    render(
      <WordleProvider>
        <SpecialTestComponent />
      </WordleProvider>,
    );

    await waitFor(
      () => {
        expect(alertMock).toHaveBeenCalledWith(
          "Congratulations! You guessed the word: WORLD",
        );
      },
      { timeout: 2000 },
    );

    expect(vi.mocked(navigator.clipboard.writeText)).toHaveBeenCalled();
  });
});
