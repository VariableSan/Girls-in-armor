<template lang="pug">
  section.section.login__section(
    ref="loginSection"
    :style='"background-image: url(" + require("~/assets/images/auth/login-bg.jpg") + ")"'
  )
    v-container
      v-card.register__card(dark)
        v-toolbar(color='color--primary')
          v-toolbar-title Login form
        v-card-text
          v-form
            v-text-field(
              v-model='login'
              :error-messages='loginErrors'
              :counter='10'
              label='Login'
              required
              @blur='$v.login.$touch()'
              @keyup.enter='onSubmit'
              autofocus
            )

            v-text-field(
              v-model='password'
              :type="showPass ? 'text' : 'password'"
              :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPass = !showPass"
              :error-messages='passwordErrors'
              label='Password'
              required
              @blur='$v.password.$touch()'
              @keyup.enter='onSubmit'
            )

        v-card-actions
            v-btn(
              @click='onSubmit'
              :disabled='$v.$invalid'
            ) submit

</template>

<style lang="sass" scoped>
.login
  &__section
    display: flex
    align-items: center
    justify-content: center
    padding-top: 0
    background-size: cover
    background-position: center top
    background-repeat: no-repeat
    +sm-block
      background-position-x: 70%
</style>

<script>
import { validationMixin } from 'vuelidate'
// eslint-disable-next-line no-unused-vars
import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators'

export default {

  mixins: [validationMixin],

  data: () => ({
    login: '',
    password: '',
    showPass: false
  }),

  computed: {
    loginErrors () {
      const errors = []
      if (!this.$v.login.$dirty) { return errors }
      !this.$v.login.required && errors.push('Login is required.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) { return errors }
      !this.$v.password.required && errors.push('Password is required')
      return errors
    }
  },

  mounted () {
    const { message } = this.$route.query

    if (message) {
      switch (message) {
      case 'login':
        this.$store.commit('setMessage', {
          text: 'Please log in first',
          color: 'color--warning'
        })
        break
      case 'logout':
        this.$store.commit('setMessage', {
          text: 'You have successfully logged out',
          color: 'color--success'
        })
        break
      case 'session':
        this.$store.commit('setMessage', {
          text: 'Session time has expired, log in again',
          color: 'color--info'
        })
        break
      }
    }

    const $loginSection = this.$refs.loginSection

    $loginSection.style.height = `${window.innerHeight}px`
  },

  methods: {
    onSubmit () {
      if (!this.$v.$invalid) {
        const { login, password } = this

        this.$store.dispatch('userStore/login', {
          login, password
        })
      } else {
        this.$store.commit('setMessage', {
          text: 'Check that the fields are filled in correctly',
          color: 'color--error'
        })
      }
    }
  },
  head () {
    return {
      title: 'Login'
    }
  },

  middleware: ['login.middle'],

  validations: {
    login: { required },
    password: { required }
  }
}
</script>
