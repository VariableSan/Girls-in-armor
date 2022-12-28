<script lang="ts" setup>
import { useUserStore } from "@/store/user"
import { Link } from "@/types/common"

const userStore = useUserStore()

/* ==================== refs START ==================== */
const links = ref<Link[]>([
  {
    title: "Home",
    url: "/",
    icon: "mdi-home",
    permission: ["all"],
  },
  {
    title: "Waifu list",
    url: "/list",
    icon: "mdi-format-list-bulleted",
    permission: ["all"],
  },
  {
    title: "Add waifu",
    url: "/add",
    icon: "mdi-plus",
    permission: ["authRequire"],
  },
  {
    title: "Moderate",
    url: "/moderate",
    icon: "mdi-microsoft-access",
    permission: ["adminOnly"],
  },
  {
    title: "Logout",
    url: "/auth/logout",
    icon: "mdi-logout",
    permission: ["authRequire"],
  },
  {
    title: "Login",
    url: "/auth/login",
    icon: "mdi-login",
    permission: ["onlyNoAuth"],
  },
  {
    title: "Register",
    url: "/auth/register",
    icon: "mdi-account-plus",
    permission: ["onlyNoAuth"],
  },
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
