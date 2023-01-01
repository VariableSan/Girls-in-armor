<script setup lang="ts">
import { RouterKeys } from "@/router/router-keys"
</script>

<template>
  <div class="relative">
    <v-toolbar class="login-header">
      <v-container>
        <router-link
          :to="{ name: RouterKeys.HOME_PAGE }"
          class="mr-4 transition-colors duration-200 hover:text-gray-400"
        >
          <v-icon size="35px" icon="mdi-arrow-left-circle-outline"></v-icon>
        </router-link>
      </v-container>
    </v-toolbar>

    <router-view></router-view>
  </div>
</template>

<style lang="scss">
.login-header {
  @apply bg-transparent top-0 left-0 w-[100%] absolute;
}
</style>
