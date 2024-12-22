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
      "@babylonjs/core": path.resolve(
        __dirname,
        "node_modules/@babylonjs/core/esm/index.js"
      ),
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
});
