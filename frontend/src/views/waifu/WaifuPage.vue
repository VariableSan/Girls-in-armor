<script setup lang="ts">
import { RouterKeys } from "@/router/router-keys"
import { useMainStore } from "@/store"
import { useUserStore } from "@/store/user"
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
/* ==================== computeds END ==================== */

/* ==================== methods START ==================== */
const getWaifus = () => {
  waifuStore.getWaifuListFromServer()
}

const removeCardById = (id: string, data: string) => {
  if (data === user.value?.login || user.value?.permission) {
    waifuStore.removeWaifu(id)
  }
}
/* ==================== methods END ==================== */

/* ==================== hooks START ==================== */
onMounted(() => {
  const { message } = route.query
  if (waifuStore.waifuList.length < 1) {
    getWaifus()
  }
  if (message) {
    switch (message) {
      case "permission":
        mainStore.setMessage({
          text: "You do not have administrator access rights",
          color: "warning",
        })
        break
    }
  }
})
/* ==================== hooks END ==================== */
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

    <WaifuCards :waifus="waifus" :route-name="RouterKeys.WAIFU_DETAIL" class="mb-5">
      <template #actions="{ waifu }">
        <v-btn
          v-if="waifu.user === user?._id || user?.permission"
          color="error"
          @click="removeCardById(waifu._id, waifu.user)"
        >
          Remove
        </v-btn>
      </template>
    </WaifuCards>

    <v-pagination
      v-model="pagination"
      :length="waifuStore.totalPages"
      :total-visible="12"
    ></v-pagination>
  </v-container>
</template>
