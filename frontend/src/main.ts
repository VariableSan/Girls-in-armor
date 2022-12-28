import "@mdi/font/css/materialdesignicons.css"
import { createPinia } from "pinia"
import { createApp } from "vue"
import { createI18n } from "vue-i18n"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { aliases, mdi } from "vuetify/iconsets/mdi"
import "vuetify/styles"
import App from "./App.vue"
import router from "./router"
import "./style.scss"

const pinia = createPinia()
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: "dark",
  },
})
const i18n = createI18n({
  locale: "en",
  messages: {
    en: {
      language: "Language",
      hello: "hello, world!",
    },
    ja: {
      language: "言語",
      hello: "こんにちは、世界！",
    },
  },
})

const app = createApp(App)

app.use(router).use(pinia).use(vuetify).use(i18n).mount("#app")
