<script setup lang="ts">
import { RouterKeys } from "@/router/router-keys"
import { useThemeStore } from "@/store/theme-store"
import { useUserStore } from "@/store/user-store"
import { Link } from "@/types/common"
import { useWindowScroll, useWindowSize } from "@vueuse/core"
import { PropType } from "vue"
import Logo from "~/static/shield-and-sword.svg?url"

const route = useRoute()
const themeStore = useThemeStore()
const userStore = useUserStore()
const { y: currentScrollY } = useWindowScroll()
const { height } = useWindowSize()

/* ==================== defines START ==================== */
const props = defineProps({
  links: {
    type: Array as PropType<Link[]>,
    default: () => [],
  },
  showLocale: {
    type: Boolean,
    default: false,
  },
  isHomePage: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(["setDrawer", "logout", "changeLocale"])
/* ==================== defines END ==================== */

/* ==================== computeds START ==================== */
const backToListRoute = computed(() => route.meta.backToListRoute as RouterKeys)
const scrollBreakPoint = computed(
  () => /* window.innerHeight / 2 */ height.value / 2,
)
/* ==================== computeds END ==================== */

/* ==================== refs START ==================== */
const lastScroll = ref(0)
// const scrollUp = ref("scroll-up")
const headerRef = ref<HTMLElement>()
/* ==================== refs END ==================== */

/* ==================== methods START ==================== */
const setDrawer = () => {
  emit("setDrawer", true)
}

const collapsibleHeader = () => {
  if (!props.isHomePage) {
    return
  }
  const nav = headerRef.value
  const scrollDownClass = "scroll-down"
  const breakPoint = scrollBreakPoint.value
  const innerLastScroll = lastScroll.value

  if (currentScrollY.value > breakPoint - 100) {
    if (
      currentScrollY.value > innerLastScroll &&
      !nav?.classList.contains(scrollDownClass)
    ) {
      // down
      nav?.classList.add(scrollDownClass)
    } else if (
      currentScrollY.value < innerLastScroll &&
      nav?.classList.contains(scrollDownClass)
    ) {
      // up
      nav?.classList.remove(scrollDownClass)
    }

    lastScroll.value = currentScrollY.value
  } else {
    nav?.classList.remove(scrollDownClass)
  }
}
/* ==================== methods END ==================== */

/* ==================== hooks START ==================== */
onMounted(() => {
  window.addEventListener("scroll", collapsibleHeader)
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", collapsibleHeader)
})
/* ==================== hooks END ==================== */
</script>

<template>
  <nav
    ref="headerRef"
    class="header"
    :class="{
      'home-page-header': isHomePage,
      'home-page-header--transparent':
        isHomePage && currentScrollY < scrollBreakPoint,
    }"
  >
    <v-toolbar flat>
      <v-container class="d-flex items-center">
        <div class="flex items-center">
          <router-link
            v-if="backToListRoute"
            :to="{ name: backToListRoute }"
            class="mr-4 transition-colors duration-200 hover:text-gray-400"
          >
            <v-icon size="35px" icon="mdi-arrow-left-circle-outline"></v-icon>
          </router-link>
          <router-link to="/" class="logo">
            <img :src="Logo" class="mr-2 w-8" />
            Girls in Armor
          </router-link>
        </div>
        <v-spacer></v-spacer>
        <div class="links hidden md:block">
          <v-btn
            v-for="(link, index) in links"
            :key="index"
            :to="{ name: link.route }"
            :exact="link.exact"
          >
            <v-icon :icon="link.icon" class="mr-2"></v-icon>
            {{ link.title }}
          </v-btn>
          <v-btn
            v-if="userStore.user?.permission"
            :to="{ name: RouterKeys.MODERATE_PAGE }"
          >
            <v-icon icon="mdi-microsoft-access" class="mr-2"></v-icon>
            Moderate
          </v-btn>
          <v-btn
            v-if="userStore.isAuth"
            :to="{ name: RouterKeys.WAIFU_ADDING }"
          >
            <v-icon icon="mdi-plus" class="mr-2"></v-icon>
            Add waifu
          </v-btn>
          <template v-if="!userStore.isAuth">
            <v-btn :to="{ name: RouterKeys.LOGIN_PAGE }">
              <v-icon icon="mdi-login" class="mr-2"></v-icon>
              Login
            </v-btn>
            <v-btn :to="{ name: RouterKeys.REGISTER_PAGE }">
              <v-icon icon="mdi-account-plus" class="mr-2"></v-icon>
              Register
            </v-btn>
          </template>
          <v-btn v-else @click="$emit('logout')">
            <v-icon icon="mdi-logout" class="mr-2"></v-icon>
            Logout
          </v-btn>
          <v-btn v-if="showLocale" size="small" @click="$emit('changeLocale')">
            <v-icon icon="mdi-translate"></v-icon>
            <v-tooltip activator="parent"> change locale </v-tooltip>
          </v-btn>
          <v-btn size="small" @click="themeStore.changeTheme">
            <v-icon icon="mdi-theme-light-dark"></v-icon>
            <v-tooltip activator="parent"> change theme </v-tooltip>
          </v-btn>
        </div>
        <v-app-bar-nav-icon
          class="burger-btn"
          size="small"
          @click="setDrawer"
        ></v-app-bar-nav-icon>
      </v-container>
    </v-toolbar>
  </nav>
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
  @apply flex text-lg relative no-underline items-center focus:outline-none;

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

.burger-btn {
  @screen md {
    display: none;
  }
}

.header {
  @apply top-0 left-0 w-[100%] z-100 fixed;
}

.home-page-header {
  @apply transition-all duration-200;

  .v-toolbar {
    @apply transition duration-200;
  }

  &--transparent {
    .v-toolbar {
      @apply bg-transparent text-white;
    }
  }
}

.scroll-down {
  @apply top-[-100px];
}
</style>
