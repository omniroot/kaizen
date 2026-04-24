import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
// import { analyzer } from "vite-bundle-analyzer";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "~": path.resolve(__dirname),
    },
  },
  plugins: [
    // tanstackRouter({
    //   target: "react",
    //   autoCodeSplitting: true,
    //   routesDirectory: "./src/pages/",
    // }),
    svgr({
      svgrOptions: {
        replaceAttrValues: {
          color: "currentColor",
        },
      },
    }),
    react(),
    // analyzer({ openAnalyzer: false }),
  ],
});
