<script lang="ts" setup>
import { RouterKeys } from "@/router/router-keys"
import { useMainStore } from "@/store"
import { useThemeStore } from "@/store/theme-store"
import { useUserStore } from "@/store/user-store"
import { Link } from "@/types/common"
import swal from "sweetalert2"

const route = useRoute()
const userStore = useUserStore()
const themeStore = useThemeStore()
const mainStore = useMainStore()
const router = useRouter()
const { locale, availableLocales } = useI18n()

/* ==================== computeds START ==================== */
const isHomePage = computed(() => route.name === RouterKeys.HOME_PAGE)
const showLocale = computed(() => import.meta.env.VITE_SHOW_LOCALE === "true")
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

/* ==================== methods START ==================== */
const logout = async () => {
  const userConfirm = await swal.fire({
    title: "Do you want to log out?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log out",
    scrollbarPadding: false,
  })
  if (!userConfirm.value) {
    return
  }

  userStore.logout()
  mainStore.setMessage({
    text: "You are successfully logged out",
    color: "success",
  })
  router.push({ name: RouterKeys.HOME_PAGE })
}

const changeLocale = () => {
  const index = availableLocales.findIndex(el => el === locale.value)
  locale.value =
    availableLocales[index + 1 < availableLocales.length ? index + 1 : 0]
}
/* ==================== methods END ==================== */
</script>

<template>
  <v-app>
    <HeaderComponent
      :links="links"
      :show-locale="showLocale"
      :is-home-page="isHomePage"
      @set-drawer="drawer = $event"
      @logout="logout"
      @change-locale="changeLocale"
    ></HeaderComponent>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      :disable-resize-watcher="true"
    >
      <v-list density="compact">
        <v-list-item
          v-for="(link, index) in links"
          :key="index"
          link
          density="comfortable"
          exact
          :to="{ name: link.route }"
        >
          <template #prepend>
            <v-icon :icon="link.icon"></v-icon>
          </template>

          <v-list-item-title> {{ link.title }} </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="userStore.user?.permission"
          link
          density="comfortable"
          :to="{ name: RouterKeys.MODERATE_PAGE }"
        >
          <template #prepend>
            <v-icon icon="mdi-microsoft-access"></v-icon>
          </template>
          <v-list-item-title> Moderate </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="userStore.isAuth"
          link
          density="comfortable"
          :to="{ name: RouterKeys.WAIFU_ADDING }"
        >
          <template #prepend>
            <v-icon icon="mdi-plus"></v-icon>
          </template>
          <v-list-item-title> Add waifu </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="!userStore.isAuth"
          link
          density="comfortable"
          :to="{ name: RouterKeys.LOGIN_PAGE }"
        >
          <template #prepend>
            <v-icon icon="mdi-login"></v-icon>
          </template>
          <v-list-item-title> Login </v-list-item-title>
        </v-list-item>

        <v-list-item v-else link density="comfortable" @click="logout">
          <template #prepend>
            <v-icon icon="mdi-logout"></v-icon>
          </template>
          <v-list-item-title> Logout </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="showLocale"
          link
          density="comfortable"
          @click="changeLocale"
        >
          <template #prepend>
            <v-icon icon="mdi-translate"></v-icon>
          </template>
          <v-list-item-title> Change locale </v-list-item-title>
        </v-list-item>

        <v-list-item link density="comfortable" @click="themeStore.changeTheme">
          <template #prepend>
            <v-icon icon="mdi-theme-light-dark"></v-icon>
          </template>
          <v-list-item-title> Change theme </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main :class="{ 'mt-16': !isHomePage }">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
