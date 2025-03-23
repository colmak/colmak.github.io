import "@testing-library/jest-dom";
import { vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = String(value);
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    length: 0,
    key: vi.fn((_: number) => null),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  usePathname: () => "",
  useSearchParams: () => new URLSearchParams(),
}));

if (typeof document.createRange !== "function") {
  document.createRange = () =>
    ({
      setStart: () => {
        /* Mock implementation - intentionally empty */
      },
      setEnd: () => {
        /* Mock implementation - intentionally empty */
      },
      commonAncestorContainer: {
        nodeName: "BODY",
        ownerDocument: document,
      },
      getClientRects: () => [],
    }) as unknown as Range;
}

function afterEach(arg0: () => void) {
  throw new Error("Function not implemented.");
}
