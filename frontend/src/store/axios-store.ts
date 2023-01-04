import { axios } from "@/plugins/axios"
import { RouterKeys } from "@/router/router-keys"
import { defineStore } from "pinia"
import { useMainStore } from "."
import { useUserStore } from "./user-store"

export const useAxiosStore = defineStore("axios", () => {
  const userStore = useUserStore()
  const router = useRouter()
  const mainStore = useMainStore()

  /* ==================== hooks START ==================== */
  onMounted(() => {
    axios.interceptors.request.use(request => {
      if (userStore.isAuth && userStore.token) {
        request.headers?.common?.set(
          "Authorization",
          `Bearer ${userStore.token}`,
        )
      }

      return request
    })

    axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          if (error.response.status === 401) {
            router.push({
              name: RouterKeys.LOGIN_PAGE,
              query: {
                message: "session",
              },
            })
            userStore.logout()
          }
          mainStore.setMessage(error.response.data)
        }
        throw Error(error)
      },
    )
  })
  /* ==================== hooks END ==================== */

  return axios
})
