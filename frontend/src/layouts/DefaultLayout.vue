<script lang="ts" setup>
import { RouterKeys } from "@/router/router-keys"
import { useUserStore } from "@/store/user"
import { Link } from "@/types/common"

const userStore = useUserStore()

/* ==================== refs START ==================== */
const links = ref<Link[]>([
  {
    title: "Home",
    route: RouterKeys.HOME_PAGE,
    icon: "mdi-home",
    permission: ["all"],
  },
  {
    title: "Waifu list",
    route: RouterKeys.WAIFU_PAGE,
    icon: "mdi-format-list-bulleted",
    permission: ["all"],
  },
  /* {
    title: "Add waifu",
    route: "/add",
    icon: "mdi-plus",
    permission: ["authRequire"],
  },
  {
    title: "Moderate",
    route: "/moderate",
    icon: "mdi-microsoft-access",
    permission: ["adminOnly"],
  }, */
  {
    title: "Login",
    route: RouterKeys.LOGIN_PAGE,
    icon: "mdi-login",
    permission: ["onlyNoAuth"],
  },
  /* {
    title: "Register",
    route: "/auth/register",
    icon: "mdi-account-plus",
    permission: ["onlyNoAuth"],
  }, */
])

const drawer = ref(false)
/* ==================== refs END ==================== */

/* ==================== hooks START ==================== */
onMounted(() => {
  userStore.autoLogin()
})
/* ==================== hooks END ==================== */
</script>

<template>
  <v-app>
    <HeaderComponent
      :links="links"
      @set-drawer="drawer = $event"
    ></HeaderComponent>

    <v-navigation-drawer v-model="drawer"></v-navigation-drawer>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
