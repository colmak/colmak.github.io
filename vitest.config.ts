import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()] as any,
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
    include: ["**/*.{test,spec}.{js,jsx,ts,tsx}"],
    exclude: ["**/node_modules/**", "**/.next/**"],
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
});
