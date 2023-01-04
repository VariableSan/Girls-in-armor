<script setup lang="ts">
import { useMainStore } from "@/store"
import { useUserStore } from "@/store/user-store"
import { useWaifuStore } from "@/store/waifu-store"
import useVuelidate from "@vuelidate/core"
import { helpers, maxLength, required } from "@vuelidate/validators"

const mainStore = useMainStore()
const userStore = useUserStore()
const waifuStore = useWaifuStore()

/* ==================== constants START ==================== */
const rules = {
  name: {
    required: helpers.withMessage("Name is required", required),
  },
  imgUrl: {
    required: helpers.withMessage("Image url is required", required),
  },
  description: {
    maxLength: helpers.withMessage("Can't be more than 950", maxLength(950)),
  },
}
/* ==================== constants END ==================== */

/* ==================== reactives START ==================== */
const state = reactive({
  name: "",
  imgUrl: "",
  description: "",
  user: userStore.user?._id,
})
/* ==================== reactives END ==================== */

/* ==================== use START ==================== */
const v$ = useVuelidate(rules, state)
/* ==================== use END ==================== */

/* ==================== computeds START ==================== */
const loading = computed(() => {
  return mainStore.globalLoading
})
/* ==================== computeds END ==================== */

/* ==================== methods START ==================== */
const saveWaifu = () => {
  if (!v$.value.$invalid) {
    waifuStore.saveWaifu({
      name: state.name,
      imgUrl: state.imgUrl,
      description: state.description,
      user: state.user,
    })
  } else {
    mainStore.setMessage({
      text: "Check that the fields are filled in correctly",
      color: "error",
    })
  }
}
/* ==================== methods END ==================== */
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <v-form>
          <v-text-field
            v-model="state.name"
            autofocus
            label="Name"
            :error-messages="v$.name.$error ? v$.name.required.$message : ''"
            required
            @keyup.enter="saveWaifu"
          ></v-text-field>

          <v-text-field
            v-model="state.imgUrl"
            label="Image URL"
            :error-messages="
              v$.imgUrl.$error ? v$.imgUrl.required.$message : ''
            "
            required
            @keyup.enter="saveWaifu"
          ></v-text-field>

          <v-textarea
            v-model="state.description"
            auto-grow
            counter="950"
            dense="dense"
            label="Description"
            row-height="20"
            rows="2"
            :error-messages="
              v$.description.$error ? v$.description.maxLength.$message : ''
            "
          ></v-textarea>

          <v-btn :disabled="v$.$invalid || loading" @click="saveWaifu">
            Add waifu
          </v-btn>
        </v-form>
      </v-col>
      <v-col cols="12" lg="6">
        <v-sheet v-if="state.imgUrl.length < 1" class="px-3 pt-3 pb-3">
          <div class="flex flex-col items-center justify-center">
            <h3>Image preview, please enter the url</h3>
          </div>
        </v-sheet>

        <v-card v-else min-height="200px">
          <v-img :lazy-src="state.imgUrl" :src="state.imgUrl">
            <template #placeholder>
              <v-row>
                <v-progress-circular
                  color="#fff"
                  indeterminate
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
