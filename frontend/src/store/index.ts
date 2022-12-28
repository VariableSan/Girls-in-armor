import { defineStore } from "pinia"

export const useMainStore = defineStore("main", () => {
  /* ==================== refs START ==================== */
  const message = ref<Record<string, string>>()
  /* ==================== refs END ==================== */

  /* ==================== methods START ==================== */
  const setMessage = (newMessage: Record<string, string>) => {
    message.value = newMessage
  }
  /* ==================== methods END ==================== */

  return {
    message,
    setMessage,
  }
})
