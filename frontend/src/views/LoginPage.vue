<script lang="ts" setup>
import LoginBg from "@/assets/images/auth/login-bg.jpg"
import { useMainStore } from "@/store"
import { useThemeStore } from "@/store/theme-store"
import { useUserStore } from "@/store/user-store"
import { useVuelidate } from "@vuelidate/core"
import { helpers, maxLength, required } from "@vuelidate/validators"

const userStore = useUserStore()
const mainStore = useMainStore()
const themeStore = useThemeStore()

/* ==================== constants START ==================== */
const maxInputLength = 10
const rules = {
  login: {
    required: helpers.withMessage("This field cannot be empty", required),
    maxLength: helpers.withMessage(
      `Can't be more than ${maxInputLength}'`,
      maxLength(maxInputLength),
    ),
  },
  password: {
    required: helpers.withMessage("This field cannot be empty", required),
  },
}
/* ==================== constants END ==================== */

/* ==================== reactives START ==================== */
const state = reactive({
  login: "",
  password: "",
})
/* ==================== reactives END ==================== */

/* ==================== use START ==================== */
const v$ = useVuelidate(rules, state)
/* ==================== use END ==================== */

/* ==================== refs START ==================== */
const showPass = ref(false)
/* ==================== refs END ==================== */

/* ==================== methods START ==================== */
const onSubmit = () => {
  if (!v$.value.$invalid) {
    userStore.login({
      login: state.login,
      password: state.password,
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
  <section
    class="bg-cover bg-no-repeat bg-[center-top] flex h-100vh p-0 w-[100%] items-center justify-center -sm:bg-right"
    :style="{ backgroundImage: `url(${LoginBg})` }"
  >
    <v-container>
      <v-card
        class="mx-auto bg-light-400 bg-opacity-70 max-w-[30%] -lg:max-w-[60%] dark:bg-dark-400 dark:bg-opacity-70"
      >
        <v-toolbar color="primary" class="opacity-70">
          <v-toolbar-title>Login form</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="state.login"
              :counter="maxInputLength"
              :error-messages="
                v$.login.$error ? v$.login.$errors[0].$message.toString() : ''
              "
              autofocus
              label="Login"
              required="required"
              @blur="v$.login.$touch()"
              @keyup.enter="onSubmit"
            ></v-text-field>
            <v-text-field
              v-model="state.password"
              :append-icon="showPass ? `mdi-eye` : `mdi-eye-off`"
              :error-messages="
                v$.password.$error ? v$.password.required.$message : ''
              "
              :type="showPass ? `text` : `password`"
              label="Password"
              required="required"
              @blur="v$.password.$touch()"
              @click:append="showPass = !showPass"
              @keyup.enter="onSubmit"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions class="flex justify-between">
          <v-btn :disabled="v$.$invalid" @click="onSubmit">submit</v-btn>

          <v-btn @click="themeStore.changeTheme">
            <v-icon icon="mdi-theme-light-dark"></v-icon>
            <v-tooltip activator="parent"> change theme </v-tooltip>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </section>
</template>
