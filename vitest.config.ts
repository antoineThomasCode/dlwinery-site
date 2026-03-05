import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.tsx"],
    include: ["src/**/__tests__/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: [
        "src/lib/**",
        "src/app/api/**",
        "src/components/layout/newsletter-form.tsx",
      ],
      exclude: ["src/**/__tests__/**"],
    },
  },
});
