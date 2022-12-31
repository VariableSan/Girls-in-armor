import vueI18n from "@intlify/vite-plugin-vue-i18n"
import vue from "@vitejs/plugin-vue"
import path from "path"
import AutoImport from "unplugin-auto-import/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import Components from "unplugin-vue-components/vite"
import { defineConfig } from "vite"
import WindiCSS from "vite-plugin-windicss"
import windiConfig from "./windi.config"

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    vue(),
    WindiCSS({
      config: windiConfig,
    }),
    AutoImport({
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/, /\.ts$/],
      imports: ["vue", "vue-router", "vue-i18n"],
      eslintrc: {
        enabled: true,
      },
      resolvers: [ElementPlusResolver()],
      vueTemplate: true,
      dts: true,
    }),
    Components(),
    vueI18n(),
  ],
})
