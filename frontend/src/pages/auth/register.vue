<template lang="pug">
section.section.register__section(
  :style='"background-image: url(" + require("~/assets/images/auth/register-bg.jpg") + ")"'
  ref='registerSection'
)
  v-container
    v-card.register__card(dark)
      v-toolbar(color='color--primary')
        v-toolbar-title Register form
      v-card-text
        v-form
          v-text-field(
            :counter='10'
            :error-messages='loginErrors'
            @blur='$v.login.$touch()'
            @keyup.enter='onSubmit'
            autofocus
            label='Login'
            required
            v-model='login'
          )

          v-text-field(
            :error-messages='emailErrors'
            @blur='$v.email.$touch()'
            @keyup.enter='onSubmit'
            label='E-mail'
            required
            v-model='email'
          )

          v-text-field(
            :append-icon='showPass ? "mdi-eye" : "mdi-eye-off"'
            :error-messages='passwordErrors'
            :type='showPass ? "text" : "password"'
            @blur='$v.password.$touch()'
            @click:append='showPass = !showPass'
            @keyup.enter='onSubmit'
            label='Password'
            required
            v-model='password'
          )

          v-text-field(
            :append-icon='showConfPass ? "mdi-eye" : "mdi-eye-off"'
            :error-messages='passwordConfirmErrors'
            :type='showConfPass ? "text" : "password"'
            @blur='$v.passwordConfirm.$touch()'
            @click:append='showConfPass = !showConfPass'
            @keyup.enter='onSubmit'
            label='Confirm password'
            required
            v-model='passwordConfirm'
          )

        v-card-actions
          v-btn(:disabled='$v.$invalid' @click='onSubmit') submit
</template>

<style lang="sass" scoped>
.register
  &__section
    display: flex
    align-items: center
    justify-content: center
    padding-top: 0
    background-size: cover
    background-repeat: no-repeat
    +lg-block()
      background-position-x: 80%
</style>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  maxLength,
  minLength,
  email,
  sameAs
} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],
  data: () => ({
    login: '',
    email: '',
    password: '',
    passwordConfirm: '',
    showPass: false,
    showConfPass: false
  }),

  computed: {
    loginErrors() {
      const errors = []
      if (!this.$v.login.$dirty) {
        return errors
      }
      !this.$v.login.maxLength &&
        errors.push('Login must be at most 10 characters long')
      !this.$v.login.required && errors.push('Login is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) {
        return errors
      }
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) {
        return errors
      }
      !this.$v.password.minLength &&
        errors.push('Password must be at least 6 characters long')
      !this.$v.password.required && errors.push('Password is required')
      return errors
    },
    passwordConfirmErrors() {
      const errors = []
      if (!this.$v.passwordConfirm.$dirty) {
        return errors
      }
      !this.$v.passwordConfirm.sameAs &&
        errors.push('The entered password does not match')
      !this.$v.passwordConfirm.required && errors.push('Confirm password')
      return errors
    }
  },

  mounted() {
    const $registerSection = this.$refs.registerSection

    $registerSection.style.height = `${window.innerHeight}px`
  },

  methods: {
    onSubmit() {
      if (!this.$v.$invalid) {
        const { email, login, password } = this

        const { text, color } = this.$store.dispatch('userStore/createUser', {
          email,
          login,
          password
        })

        this.$store.commit('setMessage', { text, color })
      } else {
        this.$store.commit('setMessage', {
          text: 'Check that the fields are filled in correctly',
          color: 'color--error'
        })
      }
    }
  },
  head() {
    return {
      title: 'Register'
    }
  },

  middleware: ['login.middle'],

  validations: {
    login: { required, maxLength: maxLength(10) },
    email: { required, email },
    password: { required, minLength: minLength(6) },
    passwordConfirm: { required, sameAs: sameAs('password') }
  }
}
</script>
