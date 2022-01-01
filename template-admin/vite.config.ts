import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import WindiCSS from "vite-plugin-windicss";
import viteSvgIcons from "vite-plugin-svg-icons";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  plugins: [
    vue(),
    WindiCSS(),
    Components({ resolvers: [ElementPlusResolver({ importStyle: "sass" })] }),
    viteSvgIcons({ iconDirs: [path.resolve(process.cwd(), "src/icons")], symbolId: "icon-[name]" }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:1010",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/index.scss" as *;`,
      },
    },
  },
});
