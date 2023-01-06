<script setup lang="ts">
import { RouterKeys } from "@/router/router-keys"
import { useMainStore } from "@/store"
import { useAxiosStore } from "@/store/axios-store"
import { useUserStore } from "@/store/user-store"
import { useWaifuStore } from "@/store/waifu-store"
import { User, Waifu } from "@/types/common"
import { storeToRefs } from "pinia"

const route = useRoute()
const mainStore = useMainStore()
const axiosStore = useAxiosStore()
const { user } = storeToRefs(useUserStore())
const waifuStore = useWaifuStore()

/* ==================== defines START ==================== */
const props = defineProps({
  id: {
    type: String,
    default: "",
  },
})
/* ==================== defines END ==================== */

/* ==================== reactives START ==================== */
const lightbox = reactive({
  visible: false,
  imgs: <string[]>[],
  index: 0,
})
/* ==================== reactives END ==================== */

/* ==================== refs START ==================== */
const waifu = ref<Waifu>({
  _id: "",
  imgUrl: "",
  name: "",
  description: "",
  user: {
    login: "",
    _id: "",
    permission: false,
    email: "",
  },
  date: "",
})
/* ==================== refs END ==================== */

/* ==================== computeds START ==================== */
const date = computed(() => {
  if (waifu.value.date) {
    const date = new Date(waifu.value.date)

    const day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate()
    const month =
      date.getMonth() + 1 > 9
        ? date.getMonth() + 1
        : "0" + (date.getMonth() + 1)
    const year = date.getFullYear()

    return `${day}-${month}-${year}`
  }
})
const waifuUser = computed(() => waifu.value.user as User)
const moderateMode = computed(
  () => route.meta.moderateMode && user.value?.permission,
)
/* ==================== computeds END ==================== */

/* ==================== methods START ==================== */
const getData = async () => {
  mainStore.globalLoading = true
  try {
    const res = await axiosStore.get(
      `/${route.meta.moderateMode ? "moderate" : "waifu"}/${props.id}`,
    )
    waifu.value = res.data
    lightbox.imgs = []
    lightbox.imgs.push(waifu.value.imgUrl)
  } finally {
    mainStore.globalLoading = false
  }
}

const onDelete = () => {
  if (route.meta.moderateMode) {
    waifuStore.rejectWaifu(props.id, RouterKeys.MODERATE_PAGE)
  } else {
    waifuStore.removeWaifu(props.id, RouterKeys.WAIFU_PAGE)
  }
}

const onAccept = () => {
  waifuStore.acceptWaifu(props.id, RouterKeys.MODERATE_PAGE)
}
/* ==================== methods END ==================== */

/* ==================== hooks START ==================== */
onMounted(() => {
  getData()
})
/* ==================== hooks END ==================== */
</script>

<template>
  <vue-easy-lightbox
    :visible="lightbox.visible"
    :imgs="lightbox.imgs"
    :index="lightbox.index"
    @hide="lightbox.visible = false"
  >
  </vue-easy-lightbox>

  <v-container>
    <v-card
      elevation="10"
      class="min-h-96 py-6 px-7 relative overflow-hidden -sm:min-h-36 -sm:py-3 -sm:px-0"
      loader-height="4"
      outlined="outlined"
    >
      <v-row>
        <v-col cols="12" lg="6" md="6">
          <div class="overflow-hidden">
            <a class="waifu-id__fancy">
              <v-img
                class="rounded-sm"
                :src="waifu.imgUrl"
                :lazy-src="waifu.imgUrl"
                @click.prevent="lightbox.visible = true"
              ></v-img
            ></a>
          </div>
        </v-col>
        <v-col cols="12" lg="6" md="6">
          <div class="flex flex-col h-[100%] justify-between">
            <div class="waifu-id__text">
              <v-card-title class="font-bold text-2xl -sm:text-xl">
                {{ waifu.name }}
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="text-lg whitespace-pre-line -sm:text-lg">
                {{ waifu.description }}
              </v-card-text>
            </div>
            <v-card-actions>
              <v-btn
                v-if="moderateMode"
                color="success"
                variant="outlined"
                @click="onAccept"
              >
                Accept
              </v-btn>
              <v-btn
                v-if="waifuUser._id === user?._id || user?.permission"
                variant="outlined"
                color="error"
                @click="onDelete"
              >
                {{ moderateMode ? "Reject" : "Remove" }}
              </v-btn>

              <small
                class="flex text-sm right-2 bottom-2 absolute -md:mt-6 -md:mb-5 -md:static"
              >
                <p class="mr-3">Author: {{ waifuUser.login }}</p>
                <p class="waifu-id__date">Date: {{ date }}</p>
              </small>
            </v-card-actions>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<style lang="scss" scoped>
.waifu-id {
  &__fancy {
    cursor: zoom-in;
  }
}

.v-card-actions {
  @screen -md {
    @apply flex-col-reverse items-start;
  }
}
</style>
