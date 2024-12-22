import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      external: ["@babylonjs/core"],
    },
  },
  resolve: {
    alias: {
      "@babylonjs/core": "@babylonjs/core/esm",
      "/assets": path.resolve(__dirname, "src/assets"), // アセットのパスをエイリアス
    },
  },
  server: {
    cors: true, // CORS を有効にする
  },
});
