<script lang="ts" setup>
import { RouterKeys } from "@/router/router-keys"

const router = useRouter()

/* ==================== constants START ==================== */
const redirectTime = 5
let timeout: NodeJS.Timeout
let interval: NodeJS.Timer
/* ==================== constants END ==================== */

/* ==================== refs START ==================== */
const progress = ref(0)
/* ==================== refs END ==================== */

onMounted(() => {
  timeout = setTimeout(() => {
    router.push({ name: RouterKeys.HOME_PAGE })
  }, redirectTime * 1000)
  interval = setInterval(() => {
    progress.value += 25
  }, 1000)
})

onBeforeUnmount(() => {
  clearTimeout(timeout)
  clearInterval(interval)
})
</script>

<template>
  <v-container class="flex flex-col h-[100vh] justify-center items-center">
    <h1 class="font-bold mr-4 mb-2 text-3xl">Something went wrong</h1>
    <h2 class="font-normal mb-4">
      After {{ redirectTime }} seconds, you will be automatically redirected to
      the main page
    </h2>

    <v-icon class="mb-4" size="35px" icon="mdi-emoticon-sad-outline"></v-icon>

    <v-progress-linear
      class="progress-linear"
      :model-value="progress"
    ></v-progress-linear>

    <router-link
      :to="{ name: RouterKeys.HOME_PAGE }"
      class="mr-4 transition-colors duration-200 hover:text-gray-400"
    >
      <v-icon size="35px" icon="mdi-arrow-left-circle-outline"></v-icon>
      Go back
    </router-link>
  </v-container>
</template>

<style lang="scss" scoped>
.progress-linear {
  @apply top-0 left-0 w-[100%] absolute;
}
</style>
