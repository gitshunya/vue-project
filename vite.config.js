// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()], // Vue.jsプラグインを使用
  resolve: {
    alias: {
      "@": "/src", // @ を /src へのエイリアスとして設定
    },
  },
  build: {
    chunkSizeWarningLimit: 1600, // チャンクサイズの警告のしきい値を1600KBに設定
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 手動でチャンクを分割する設定
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
  },
});
