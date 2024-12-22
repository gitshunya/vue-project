import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ["@babylonjs/core"],
    },
  },
  resolve: {
    alias: {
      "@babylonjs/core": "/node_modules/@babylonjs/core/index.js",
    },
  },
});
