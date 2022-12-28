import { useDark } from "@vueuse/core"
import { defineStore } from "pinia"
import { useTheme } from "vuetify"

export const useThemeStore = defineStore("theme", () => {
  const theme = useTheme()
  const isDark = useDark()

  /* ==================== methods START ==================== */
  const changeTheme = () => {
    isDark.value = !isDark.value
    initVuetifyTheme()
  }

  const initVuetifyTheme = () => {
    theme.global.name.value = isDark.value ? "dark" : "light"
  }
  /* ==================== methods END ==================== */

  /* ==================== hooks START ==================== */
  onMounted(() => {
    initVuetifyTheme()
  })
  /* ==================== hooks END ==================== */

  return {
    isDark,
    changeTheme,
  }
})
