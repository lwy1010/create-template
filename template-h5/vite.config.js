import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import styleImport from "vite-plugin-style-import";

export default defineConfig({
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: "vant",
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ],
});
