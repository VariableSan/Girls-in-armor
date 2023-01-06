<script lang="ts" setup>
import { RouterKeys } from "@/router/router-keys"
import { Waifu } from "@/types/common"
import { PropType } from "vue"

defineProps({
  waifus: {
    type: Array as PropType<Waifu[]>,
    default: () => [],
  },
  routeName: {
    type: String as PropType<RouterKeys>,
    default: "",
  },
})
</script>

<template>
  <v-row>
    <v-col
      v-for="(waifu, index) in waifus"
      :key="index"
      cols="12"
      lg="3"
      md="4"
      sm="6"
    >
      <v-card class="card">
        <router-link :to="{ name: routeName, params: { id: waifu._id } }">
          <v-img
            class="white--text align-end"
            cover
            :src="waifu.imgUrl"
            :lazy-src="waifu.imgUrl"
            height="350px"
          ></v-img>
        </router-link>
        <div class="flex flex-col h-[100%] justify-between">
          <v-card-title>
            <h4 class="text--ellipsis">{{ waifu.name }}</h4>
          </v-card-title>
          <v-card-text>
            <p class="text--ellipsis">{{ waifu.description }}</p>
          </v-card-text>
          <v-card-actions>
            <slot :waifu="waifu" name="actions" tag="div"></slot>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="scss" scoped>
.text {
  &--ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}

.card {
  @apply flex flex-col h-[100%] transition-shadow ease-in-out duration-200 justify-between overflow-hidden;
  &:hover {
    box-shadow: 0 9px 11px -5px rgba(0, 0, 0, 0.2),
      0 18px 28px 2px rgba(0, 0, 0, 0.14), 0 7px 34px 6px rgba(0, 0, 0, 0.12);
  }
}
</style>
