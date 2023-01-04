<script lang="ts" setup>
import { RouterKeys } from "@/router/router-keys"
import { Link } from "@/types/common"

const route = useRoute()

/* ==================== computeds START ==================== */
const isHomePage = computed(() => route.name === RouterKeys.HOME_PAGE)
/* ==================== computeds END ==================== */

/* ==================== refs START ==================== */
const links = ref<Link[]>([
  {
    title: "Home",
    route: RouterKeys.HOME_PAGE,
    icon: "mdi-home",
    exact: true,
  },
  {
    title: "Waifu list",
    route: RouterKeys.WAIFU_PAGE,
    icon: "mdi-format-list-bulleted",
    exact: true,
  },
  /* {
    title: "Register",
    route: "/auth/register",
    icon: "mdi-account-plus",
  }, */
])

const drawer = ref(false)
/* ==================== refs END ==================== */
</script>

<template>
  <v-app>
    <HeaderComponent
      :links="links"
      @set-drawer="drawer = $event"
    ></HeaderComponent>

    <v-navigation-drawer
      v-model="drawer"
      :disable-resize-watcher="true"
    ></v-navigation-drawer>

    <v-main :class="{ 'mt-16': !isHomePage }">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
