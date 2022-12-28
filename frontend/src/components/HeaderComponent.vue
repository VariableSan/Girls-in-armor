<script setup lang="ts">
import { Link } from "@/types/common"
import { PropType } from "vue"
import { useThemeStore } from "@/store/theme"

const { meta } = useRoute()
const themeStore = useThemeStore()
const { locale, availableLocales } = useI18n()

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
/* ==================== methods END ==================== */
</script>

<template>
  <v-toolbar v-resize="onResize" flat>
    <v-container class="d-flex w-100 align-center">
      <v-toolbar-title>
        <router-link v-if="meta.backToListRoute" :to="meta.backToListRoute">
          <v-icon size="35px" icon="mdi-arrow-left-circle-outline"></v-icon>
        </router-link>

        <router-link to="/" class="logo"> Girls in Armor </router-link>
      </v-toolbar-title>

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

        <v-btn v-for="(link, index) in links" :key="index" :to="link.url">
          <v-icon :icon="link.icon" class="mr-2"></v-icon>
          {{ link.title }}
        </v-btn>
      </div>

      <v-app-bar-nav-icon size="small" @click="setDrawer"></v-app-bar-nav-icon>
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
  position: relative;
  text-decoration: none;
  &:hover {
    &::after {
      width: 100%;
    }
  }
  &:focus {
    outline: none;
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
