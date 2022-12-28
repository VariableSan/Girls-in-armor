<script setup lang="ts">
import { RouterKeys } from "@/router/router-keys"
</script>

<template>
  <router-link
    :to="{ name: RouterKeys.WAIFU_DETAIL, params: { id: 10 } }"
  ></router-link>
</template>
