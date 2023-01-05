<script lang="ts" setup>
import { useMainStore } from "@/store"
import { useThemeStore } from "@/store/theme-store"
import { useUserStore } from "@/store/user-store"
import useVuelidate from "@vuelidate/core"
import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
  sameAs,
} from "@vuelidate/validators"
import RegisterBg from "~/assets/images/auth/register-bg.jpg"

const userStore = useUserStore()
const mainStore = useMainStore()
const themeStore = useThemeStore()

/* ==================== reactives START ==================== */
const state = reactive({
  login: "",
  email: "",
  password: "",
  passwordConfirm: "",
})
/* ==================== reactives END ==================== */

/* ==================== computeds START ==================== */
const rules = computed(() => ({
  login: {
    required: helpers.withMessage("This field cannot be empty", required),
    maxLength: maxLength(10),
  },
  email: {
    required: helpers.withMessage("This field cannot be empty", required),
    email,
  },
  password: {
    required: helpers.withMessage("This field cannot be empty", required),
    minLength: minLength(6),
  },
  passwordConfirm: {
    required: helpers.withMessage("This field cannot be empty", required),
    sameAs: sameAs(state.password),
  },
}))
/* ==================== computeds END ==================== */

/* ==================== refs START ==================== */
const showPass = ref(false)
const showConfPass = ref(false)
/* ==================== refs END ==================== */

/* ==================== use START ==================== */
const v$ = useVuelidate(rules, state)
/* ==================== use END ==================== */

/* ==================== methods START ==================== */
const onSubmit = () => {
  if (!v$.value.$invalid) {
    userStore.createUser({
      email: state.email,
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
    :style="{ backgroundImage: `url(${RegisterBg})` }"
  >
    <v-container>
      <v-card
        class="mx-auto bg-light-400 bg-opacity-70 max-w-[30%] -lg:max-w-[60%] dark:bg-dark-400 dark:bg-opacity-70"
      >
        <v-toolbar color="primary" class="opacity-70">
          <v-toolbar-title>Register form</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="state.login"
              :counter="10"
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
              v-model="state.email"
              :error-messages="
                v$.email.$error ? v$.email.$errors[0].$message.toString() : ''
              "
              label="E-mail"
              required="required"
              @blur="v$.email.$touch()"
              @keyup.enter="onSubmit"
            ></v-text-field>
            <v-text-field
              v-model="state.password"
              :append-icon="showPass ? `mdi-eye` : `mdi-eye-off`"
              :error-messages="
                v$.password.$error
                  ? v$.password.$errors[0].$message.toString()
                  : ''
              "
              :type="showPass ? `text` : `password`"
              label="Password"
              required="required"
              @blur="v$.password.$touch()"
              @click:append="showPass = !showPass"
              @keyup.enter="onSubmit"
            ></v-text-field>
            <v-text-field
              v-model="state.passwordConfirm"
              :append-icon="showConfPass ? `mdi-eye` : `mdi-eye-off`"
              :error-messages="
                v$.passwordConfirm.$error
                  ? v$.passwordConfirm.$errors[0].$message.toString()
                  : ''
              "
              :type="showConfPass ? `text` : `password`"
              label="Confirm password"
              required="required"
              @blur="v$.passwordConfirm.$touch()"
              @click:append="showConfPass = !showConfPass"
              @keyup.enter="onSubmit"
            ></v-text-field>
          </v-form>

          <v-card-actions class="flex justify-between">
            <v-btn :disabled="v$.$invalid" @click="onSubmit">submit</v-btn>

            <v-btn @click="themeStore.changeTheme">
              <v-icon icon="mdi-theme-light-dark"></v-icon>
              <v-tooltip activator="parent"> change theme </v-tooltip>
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-container>
  </section>
</template>
