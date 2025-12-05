import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ["src"],
      exclude: ["src/**/*.test.*", "src/**/__tests__/**", "src/**/*.stories.*"],
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "PxUICharts",
      fileName: () => `index.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "@px-ui/core", "echarts", "echarts-for-react"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        entryFileNames: "[name].js",
      },
    },
  },
});
