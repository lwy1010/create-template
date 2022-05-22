import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import WindiCSS from "vite-plugin-windicss";
import viteSvgIcons from "vite-plugin-svg-icons";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import styleImport, { VantResolve } from "vite-plugin-style-import";
import viteSentry from "vite-plugin-sentry";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  plugins: [
    vue(),
    Components({ dts: false, resolvers: [VantResolver()] }),
    viteSvgIcons({ iconDirs: [path.resolve(process.cwd(), "src/icons")], symbolId: "icon-[name]" }),
    WindiCSS(),
    styleImport({ resolves: [VantResolve()] }),
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
