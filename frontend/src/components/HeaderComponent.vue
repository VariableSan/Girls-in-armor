<script setup lang="ts">
import { RouterKeys } from "@/router/router-keys"
import { useMainStore } from "@/store"
import { useThemeStore } from "@/store/theme"
import { useUserStore } from "@/store/user"
import { Link } from "@/types/common"
import { PropType } from "vue"

const route = useRoute()
const themeStore = useThemeStore()
const { locale, availableLocales } = useI18n()
const userStore = useUserStore()
const mainStore = useMainStore()
const router = useRouter()

/* ==================== defines START ==================== */
defineProps({
  links: {
    type: Array as PropType<Link[]>,
    default: () => [],
  },
})
const emit = defineEmits(["setDrawer"])
/* ==================== defines END ==================== */

/* ==================== refs START ==================== */
const isMobile = ref(false)
/* ==================== refs END ==================== */

/* ==================== computeds START ==================== */
const routeMeta = computed(() => route.meta.backToListRoute as RouterKeys)
/* ==================== computeds END ==================== */

/* ==================== methods START ==================== */
const onResize = () => {
  isMobile.value = window.innerWidth < 768
}

const changeLocale = () => {
  const index = availableLocales.findIndex(el => el === locale.value)
  locale.value =
    availableLocales[index + 1 < availableLocales.length ? index + 1 : 0]
}

const setDrawer = () => {
  emit("setDrawer", true)
}

const logout = () => {
  userStore.logout()
  mainStore.setMessage({
    text: "You are successfully logged out",
    color: "success",
  })
  router.push({
    name: RouterKeys.HOME_PAGE,
  })
}
/* ==================== methods END ==================== */
</script>

<template>
  <v-toolbar v-resize="onResize" flat>
    <v-container class="w-100 d-flex items-center">
      <div class="flex items-center">
        <router-link
          v-if="routeMeta"
          :to="{ name: routeMeta }"
          class="mr-4 transition-colors duration-200 hover:text-gray-400"
        >
          <v-icon size="35px" icon="mdi-arrow-left-circle-outline"></v-icon>
        </router-link>

        <router-link to="/" class="logo"> Girls in Armor </router-link>
      </div>

      <v-spacer></v-spacer>

      <div class="links">
        <v-btn size="small" @click="changeLocale">
          <v-icon icon="mdi-translate"></v-icon>
          <v-tooltip activator="parent"> change locale </v-tooltip>
        </v-btn>

        <v-btn size="small" @click="themeStore.changeTheme">
          <v-icon icon="mdi-theme-light-dark"></v-icon>
          <v-tooltip activator="parent"> change theme </v-tooltip>
        </v-btn>

        <v-btn @click="logout">
          <v-icon icon="mdi-logout" class="mr-2"></v-icon>
          Logout
        </v-btn>

        <v-btn
          v-for="(link, index) in links"
          :key="index"
          :to="{ name: link.route }"
          :exact="link.route === RouterKeys.HOME_PAGE"
        >
          <v-icon :icon="link.icon" class="mr-2"></v-icon>
          {{ link.title }}
        </v-btn>
      </div>

      <v-app-bar-nav-icon
        class="hidden -md:block"
        size="small"
        @click="setDrawer"
      ></v-app-bar-nav-icon>
    </v-container>
  </v-toolbar>
</template>

<style lang="scss" scoped>
.links {
  .v-btn {
    padding: 0 5px;
    font-size: 14px;
    text-transform: none;
    &:not(:last-child) {
      margin-right: 8px;
    }
  }
}

.logo {
  @apply text-lg relative no-underline focus:outline-none;

  &:hover {
    &::after {
      width: 100%;
    }
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0;
    height: 2px;
    margin: 0 auto;
    background-color: #fff;
    transition: all 0.3s ease-in-out;
  }
}
</style>
