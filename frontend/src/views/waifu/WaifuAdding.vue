<script setup lang="ts">
import { useMainStore } from "@/store"
import { useUserStore } from "@/store/user-store"
import { useWaifuStore } from "@/store/waifu-store"
import { ExtendedWaifu } from "@/types/common"
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
  imageFile: {
    required: helpers.withMessage("Image is required", required),
  },
  description: {
    maxLength: helpers.withMessage("Can't be more than 950", maxLength(950)),
  },
}
/* ==================== constants END ==================== */

/* ==================== reactives START ==================== */
const state = reactive({
  name: "",
  description: "",
  user: userStore.user?._id,
  imageFile: <File[]>[],
})
/* ==================== reactives END ==================== */

/* ==================== refs START ==================== */
const imageSrc = ref("")
/* ==================== refs END ==================== */

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
  if (loading) {
    return
  }

  if (!v$.value.$invalid) {
    const params: Partial<ExtendedWaifu> = {
      name: state.name,
      imageFile: state.imageFile,
      description: state.description,
      user: state.user,
    }
    if (state.imageFile?.length) {
      params.imageFile = state.imageFile
    }
    waifuStore.saveWaifu(params)
  } else {
    mainStore.setMessage({
      text: "Check that the fields are filled in correctly",
      color: "error",
    })
  }
}

const onFileChange = (files: File[]) => {
  const file = files[0]
  const fileExt = file.name.slice(file.name.lastIndexOf("."))

  if (fileExt == ".png" || fileExt == ".jpg" || fileExt == ".jpeg") {
    imageSrc.value = ""
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => {
      if (reader.result) {
        imageSrc.value = reader.result?.toString()
      }
    }
  } else {
    mainStore.setMessage({
      text: "Please choose the image format png, jpg or jpeg",
      color: "warning",
    })
  }
}
/* ==================== methods END ==================== */
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="6">
        <v-text-field
          v-model="state.name"
          autofocus
          label="Name"
          :error-messages="v$.name.$error ? v$.name.required.$message : ''"
          required
          @keyup.enter="!v$.$invalid && saveWaifu()"
        ></v-text-field>

        <v-file-input
          v-model="state.imageFile"
          label="Pick an image"
          :error-messages="
            v$.imageFile.$error ? v$.imageFile.required.$message : ''
          "
          accept="image/png, image/jpeg"
          prepend-icon="mdi-camera"
          required
          @update:model-value="onFileChange"
        ></v-file-input>

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
      </v-col>
      <v-col cols="12" lg="6">
        <v-sheet v-if="!imageSrc.length" class="px-3 pt-3 pb-3">
          <div class="flex flex-col items-center justify-center">
            <h3>Image preview, please select an image</h3>
          </div>
        </v-sheet>

        <v-card v-else min-height="200px">
          <v-img :src="imageSrc">
            <template #placeholder>
              <v-row>
                <v-progress-circular indeterminate></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
