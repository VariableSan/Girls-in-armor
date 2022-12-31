import { SnackbarMessage } from "@/types/common"
import { defineStore } from "pinia"

export const useMainStore = defineStore("main", () => {
  /* ==================== refs START ==================== */
  const snackbar = ref(false)
  const message = ref<SnackbarMessage>()
  const globalLoading = ref(false)
  /* ==================== refs END ==================== */

  /* ==================== methods START ==================== */
  const setMessage = (newMessage: SnackbarMessage) => {
    message.value = newMessage
    snackbar.value = true
  }

  const toggleGlobalLoading = () => {
    globalLoading.value = !globalLoading.value
  }
  /* ==================== methods END ==================== */

  return {
    message,
    snackbar,
    globalLoading,

    setMessage,
    toggleGlobalLoading,
  }
})
