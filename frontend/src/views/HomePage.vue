<script setup lang="ts">
import { useUserStore } from "@/store/user"

const userStore = useUserStore()
</script>

<template>
  <v-container class="py-8">
    <pre>{{ userStore.user }}</pre>
  </v-container>
</template>
