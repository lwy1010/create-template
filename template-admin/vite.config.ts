import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import svgSpritePlugin from "vite-plugin-svg-sprite-component";

export default defineConfig({
  plugins: [vue(), svgSpritePlugin({ symbolId: (name) => "icon-" + name })],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:1010",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
