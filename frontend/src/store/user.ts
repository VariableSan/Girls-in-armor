import { RouterKeys } from "@/router/router-keys"
import { User, UserForm } from "@/types/common"
import Cookie from "cookie"
import Cookies from "js-cookie"
import jwtDecode from "jwt-decode"
import { defineStore } from "pinia"
import { useMainStore } from "."
import { useAxiosStore } from "./axios-store"

export const useUserStore = defineStore("user", () => {
  const router = useRouter()
  const mainStore = useMainStore()
  const axios = useAxiosStore()

  /* ==================== refs START ==================== */
  const token = ref<string>()
  const user = ref<User>()
  const permission = ref(false)
  /* ==================== refs END ==================== */

  /* ==================== computeds START ==================== */
  const isAuth = computed(() => Boolean(user.value))
  /* ==================== computeds END ==================== */

  /* ==================== methods START ==================== */
  const setUser = (payload: User) => {
    user.value = payload
    setPermission(user.value.permission)
  }

  const setToken = (newToken: string) => {
    axios.defaults.headers.common = {
      Authorization: `Bearer ${newToken}`,
    }
    token.value = newToken
    Cookies.set("jwt-token", newToken)
  }

  const setPermission = (newPermission: boolean) => {
    permission.value = newPermission
  }

  const logout = () => {
    axios.defaults.headers.common = {
      Authorization: false,
    }
    token.value = undefined
    user.value = undefined
    Cookies.remove("jwt-token")
    router.push({ name: RouterKeys.HOME_PAGE })
    mainStore.setMessage({
      text: "Successful logout",
      color: "info",
    })
  }

  const login = async (userForm: UserForm) => {
    mainStore.globalLoading = true
    try {
      const res = await axios.post("/auth/login", userForm)
      const { token, text, color } = res.data
      const user = decodeJWT(token)
      if (user) {
        setUser(user)
        setToken(token)
        router.push({ name: RouterKeys.HOME_PAGE })
      }
      mainStore.setMessage({ text, color })
    } finally {
      mainStore.globalLoading = false
    }
  }

  const createUser = async (userForm: UserForm) => {
    mainStore.globalLoading = true
    try {
      const res = await axios.post("/auth/create", userForm)
      const { text, color } = res.data
      router.push({ name: RouterKeys.LOGIN_PAGE })
      mainStore.setMessage({ text, color })
    } finally {
      mainStore.globalLoading = false
    }
  }

  const autoLogin = () => {
    const cookieStr = document.cookie
    const cookies = Cookie.parse(cookieStr || "") || {}
    const token = cookies["jwt-token"]
    if (token) {
      if (isJWTValid(token)) {
        setToken(token)
        setUser(decodeJWT(token))
      } else {
        logout()
      }
    }
  }
  /* ==================== methods END ==================== */

  return {
    token,
    isAuth,
    user,

    setUser,
    setToken,
    setPermission,
    logout,
    autoLogin,
    createUser,
    login,
  }
})

function isJWTValid(token: string) {
  if (!token) {
    return false
  }
  const jwtData = decodeJWT(token)
  const expires = jwtData.exp || 0
  return new Date().getTime() / 1000 < expires
}

function decodeJWT(token: string) {
  return jwtDecode<any>(token) || {}
}
