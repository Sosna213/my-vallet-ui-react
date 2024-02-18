import path from "path";
import react from "@vitejs/plugin-react";
import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";
import { defineConfig } from "vite";

interface VitestConfigExport extends UserConfig {
  test: InlineConfig;
}

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFilesAfterEnv: "tests/setup",
  },
  server: {
    port: 5173,
    host: "127.0.0.1",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      find: "./runtimeConfig",
      replacement: "./runtimeConfig.browser",
    },
  },
  build: {
    outDir: "build",
  },
} as VitestConfigExport);
