import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "/assets": path.resolve(__dirname, "src/assets"),
    },
  },
  server: {
    cors: true,
    proxy: {
      "/cdn": {
        target: "https://infird.com",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  optimizeDeps: {
    include: ["@babylonjs/core", "@babylonjs/gui"],
  },
});
