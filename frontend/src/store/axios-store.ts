import { axios } from "@/plugins/axios"
import { defineStore } from "pinia"
import { useUserStore } from "./user"

export const useAxiosStore = defineStore("axios", () => {
  const userStore = useUserStore()
  const router = useRouter()

  axios.interceptors.request.use(request => {
    if (userStore.isAuth && !request.headers?.common?.get("Authorization")) {
      const token = userStore.token
      request.headers?.common?.set("Authorization", `Bearer ${token}`)
    }

    return request
  })

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        if (error.response.status === 401) {
          router.push("/auth/login?message=session")
          userStore.logout()
        }

        if (error.response.status === 500) {
          console.error("Server 500 error")
        }
      }
    },
  )

  return {
    axios,
  }
})
