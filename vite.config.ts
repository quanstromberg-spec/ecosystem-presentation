import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "production" ? "/ecosystem-presentation/" : "/",

  resolve: {
    alias: {
      "~@husqvarna/ui-core": path.resolve(
        __dirname,
        "../node_modules/@husqvarna/ui-core/dist"
      ),
      "@husqvarna/ui-core": path.resolve(
        __dirname,
        "../node_modules/@husqvarna/ui-core/dist"
      ),
      "@@": path.resolve(__dirname, "../src/UI/hbd-ui/src"),
      "@husqvarna/hbd-ui/src": path.resolve(__dirname, "../src/UI/hbd-ui/src"),
      "@husqvarna/hbd-ui": path.resolve(__dirname, "../src/UI/hbd-ui/src"),
      react: path.resolve(__dirname, "../node_modules/react"),
      "react-dom": path.resolve(__dirname, "../node_modules/react-dom"),
      "react-router-dom": path.resolve(
        __dirname,
        "../node_modules/react-router-dom"
      ),
      "react-intl": path.resolve(__dirname, "../node_modules/react-intl"),
      "@design-tokens": path.resolve(
        __dirname,
        "../src/UI/hbd-ui/src/design-tokens"
      ),
      "@fixtures": path.resolve(
        __dirname,
        "../src/UI/hbd-storybook/src/fixtures"
      ),
    },
  },

  optimizeDeps: {
    exclude: ["@husqvarna/hbd-ui"],
    include: ["react", "react-dom"],
  },

  server: {
    port: 5173,
    fs: {
      strict: false,
      allow: ["..", "../.."],
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@husqvarna/hbd-ui/src/design-tokens/all.scss";`,
        silenceDeprecations: ["legacy-js-api"],
      },
    },
  },

  define: {
    "process.env.SSR": false,
    "process.env.BROWSER": true,
    "process.env.NODE_ENV": JSON.stringify(
      process.env.NODE_ENV || "development"
    ),
    GRAPHQL_URL: JSON.stringify("/hbd/graphql"),
  },
});
