<script setup lang="ts">
import { useMainStore } from "./store"
import { useAxiosStore } from "./store/axios-store"

useAxiosStore()
const mainStore = useMainStore()
</script>

<template>
  <router-view></router-view>

  <v-snackbar
    v-model="mainStore.snackbar"
    closable
    timeout="3000"
    :color="mainStore.message?.color"
  >
    {{ mainStore.message?.text }}

    <template #actions>
      <v-btn variant="text" @click="mainStore.snackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>

  <v-overlay
    :model-value="mainStore.globalLoading"
    class="flex justify-center align-center"
  >
    <v-progress-circular
      indeterminate
      color="primary"
      size="150"
    ></v-progress-circular>
  </v-overlay>
</template>
