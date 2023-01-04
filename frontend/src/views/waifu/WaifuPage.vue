<script setup lang="ts">
import { RouterKeys } from "@/router/router-keys"
import { useMainStore } from "@/store"
import { useUserStore } from "@/store/user-store"
import { useWaifuStore } from "@/store/waifu-store"
import { storeToRefs } from "pinia"

const mainStore = useMainStore()
const waifuStore = useWaifuStore()
const { user } = storeToRefs(useUserStore())
const route = useRoute()

/* ==================== computeds START ==================== */
const waifus = computed(() => waifuStore.waifuList)
const pagination = computed({
  get() {
    return waifuStore.pagination
  },
  set(payload) {
    if (payload !== waifuStore.pagination) {
      waifuStore.setPagination(payload)
      getWaifus()
    }
  },
})
const moderateMode = computed(
  () => route.meta.moderateMode && user.value?.permission,
)
/* ==================== computeds END ==================== */

/* ==================== methods START ==================== */
const getWaifus = () => {
  if (moderateMode.value) {
    waifuStore.getModerateListFromServer()
  } else {
    waifuStore.getWaifuListFromServer()
  }
}

const removeCardById = (id: string, waifuUser: string) => {
  if (moderateMode.value) {
    return waifuStore.rejectWaifu(id)
  }
  if (waifuUser === user.value?.login || user.value?.permission) {
    waifuStore.removeWaifu(id)
  }
}

const acceptCardById = (id: string) => {
  waifuStore.acceptWaifu(id)
}
/* ==================== methods END ==================== */

/* ==================== hooks START ==================== */
onMounted(() => {
  waifuStore.clearWaifuData()
  getWaifus()
})
/* ==================== hooks END ==================== */

/* ==================== watchers START ==================== */
watch(route, () => {
  const routeList = [RouterKeys.WAIFU_PAGE, RouterKeys.WAIFU_MODERATE]
  if (routeList.includes(route.name as RouterKeys)) {
    waifuStore.clearWaifuData()
    getWaifus()
  }
})
/* ==================== watchers END ==================== */
</script>

<template>
  <v-container>
    <div class="flex mb-5 justify-end">
      <v-btn
        :loading="mainStore.globalLoading"
        color="primary"
        @click="getWaifus"
      >
        Update list
        <v-icon right="right">mdi-download-circle</v-icon>
      </v-btn>
    </div>

    <v-divider class="mb-5"></v-divider>

    <WaifuCards
      :loading="mainStore.globalLoading"
      :waifus="waifus"
      :route-name="RouterKeys.WAIFU_DETAIL"
      class="mb-5"
    >
      <template #actions="{ waifu }">
        <v-btn
          v-if="waifu.user === user?._id || user?.permission"
          color="error"
          @click="removeCardById(waifu._id, waifu.user)"
        >
          {{ moderateMode ? "Reject" : "Remove" }}
        </v-btn>

        <v-btn
          v-if="moderateMode"
          color="success"
          @click="acceptCardById(waifu._id)"
        >
          Accept
        </v-btn>
      </template>
    </WaifuCards>

    <v-pagination
      v-if="waifuStore.waifuList.length > 0"
      v-model="pagination"
      :length="waifuStore.totalPages"
      :total-visible="12"
    ></v-pagination>

    <div v-else-if="!mainStore.globalLoading" class="flex justify-center">
      <h2 class="text-2xl">The list is empty</h2>
    </div>
  </v-container>
</template>
