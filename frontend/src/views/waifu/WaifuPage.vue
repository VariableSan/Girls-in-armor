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

const backToModerate = (id: string) => {
  waifuStore.backToModerate(id)
}
/* ==================== methods END ==================== */

/* ==================== hooks START ==================== */
onMounted(() => {
  if (
    (route.name === RouterKeys.MODERATE_PAGE && waifuStore.mode === "waifu") ||
    (route.name === RouterKeys.WAIFU_PAGE && waifuStore.mode === "moderate")
  ) {
    waifuStore.clearWaifuData()
  }
  if (waifuStore.waifuList.length === 0) {
    getWaifus()
  }
})
/* ==================== hooks END ==================== */

/* ==================== watchers START ==================== */
watch(route, () => {
  const routeList = [RouterKeys.WAIFU_PAGE, RouterKeys.MODERATE_PAGE]
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
      :waifus="waifus"
      :route-name="route.meta.toDetailRoute"
      class="mb-5"
    >
      <template #actions="{ waifu }">
        <v-btn
          v-if="moderateMode"
          color="success"
          variant="outlined"
          size="small"
          @click="acceptCardById(waifu._id)"
        >
          Accept
        </v-btn>

        <template v-if="waifu.user === user?._id || user?.permission">
          <v-btn
            v-if="!moderateMode"
            color="warning"
            variant="outlined"
            size="small"
            @click="backToModerate(waifu._id)"
          >
            Return to moderation
          </v-btn>

          <v-btn
            color="error"
            variant="outlined"
            size="small"
            @click="removeCardById(waifu._id, waifu.user)"
          >
            {{ moderateMode ? "Reject" : "Remove" }}
          </v-btn>
        </template>
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

<style lang="scss" scoped>
.v-card-actions {
  .v-btn {
    @apply text-xs;
    text-transform: none;
  }
}
</style>
