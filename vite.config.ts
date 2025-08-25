import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { analyzer } from "vite-bundle-analyzer";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname),
    },
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        replaceAttrValues: {
          color: "currentColor",
        },
      },
    }),
    analyzer({ openAnalyzer: true }),
  ],
});
