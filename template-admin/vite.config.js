import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import svgSpritePlugin from "vite-plugin-svg-sprite-component";
import ViteComponents, { ElementPlusResolver } from "vite-plugin-components";

export default defineConfig({
  plugins: [
    vue(),
    svgSpritePlugin({ symbolId: (name) => "icon-" + name }),
    ViteComponents({
      customComponentResolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    // eslint-disable-next-line no-undef
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
