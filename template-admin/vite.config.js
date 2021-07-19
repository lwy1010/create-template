import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import mockPlugin from "vite-plugin-mockit";
import svgSpritePlugin from "vite-plugin-svg-sprite-component";

export default defineConfig({
  plugins: [
    vue(),
    svgSpritePlugin({ symbolId: (name) => "icon-" + name }),
    mockPlugin({ entry: "./mock/index.js" }),
  ],
  resolve: {
    // eslint-disable-next-line no-undef
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
