import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import WindiCSS from "vite-plugin-windicss";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import viteSentry from "vite-plugin-sentry";
import DefineOptions from "unplugin-vue-define-options/vite";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  plugins: [
    vue(),
    Components({ dts: false, resolvers: [ElementPlusResolver()] }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/assets/svgs")],
      symbolId: "icon-[name]",
    }),
    WindiCSS(),
    DefineOptions(),
    viteSentry({
      url: "https://sentry.io/",
      authToken: "<auth_token>",
      org: "<org_name>",
      project: "<project-name>",
      sourceMaps: {
        include: ["./dist/assets"],
        ignore: ["node_modules"],
        urlPrefix: "~/assets",
      },
    }),
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
  build: {
    sourcemap: true,
  },
});
