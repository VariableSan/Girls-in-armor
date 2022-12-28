import { axios } from "@/plugins/axios"
import { RouterKeys } from "@/router/router-keys"
import { User, UserForm } from "@/types/common"
import Cookie from "cookie"
import Cookies from "js-cookie"
import jwtDecode from "jwt-decode"
import { defineStore } from "pinia"
import { useMainStore } from "."

export const useUserStore = defineStore("user", () => {
  const router = useRouter()
  const mainStore = useMainStore()

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
  }

  const login = async (userForm: UserForm) => {
    try {
      const { token, user, text, color, permission } = await axios
        .post("/api/auth/login", userForm)
        .then(res => res.data)

      if (token && user) {
        setUser(user)
        setToken(token)
        setPermission(permission)
        router.push({ name: RouterKeys.HOME_PAGE })
      }

      mainStore.setMessage({ text, color })
    } catch (e: any) {
      mainStore.setMessage(e.response.data)
    }
  }

  const createUser = async (userForm: UserForm) => {
    try {
      const { text, color } = await axios
        .post("/api/auth/create", userForm)
        .then(res => res.data)

      router.push("/auth/login")
      mainStore.setMessage({ text, color })
    } catch (e: any) {
      mainStore.setMessage(e.response.data)
    }
  }

  const autoLogin = () => {
    const cookieStr = document.cookie
    const cookies = Cookie.parse(cookieStr || "") || {}
    const token = cookies["jwt-token"]
    if (isJWTValid(token)) {
      setToken(token)
      setUser(decodeJWT(token).userId)
      setPermission(decodeJWT(token).permission)
    } else {
      logout()
    }
  }
  /* ==================== methods END ==================== */

  return {
    token,
    permission,
    isAuth,

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
