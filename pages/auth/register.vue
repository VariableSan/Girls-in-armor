<template lang="pug">
	section.section.register__section(
		:style='"background-image: url(" + require("~/assets/images/auth/register-bg.jpg") + ")"'
	)
		v-container
			v-card.register__card(dark)
				v-toolbar(color='color--primary')
					v-toolbar-title Register form
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
							v-model='email'
							:error-messages='emailErrors'
							label='E-mail'
							required
							@blur='$v.email.$touch()'
							@keyup.enter='onSubmit'
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

						v-text-field(
							v-model='passwordConfirm'
							:type="showConfPass ? 'text' : 'password'"
							:append-icon="showConfPass ? 'mdi-eye' : 'mdi-eye-off'"
							@click:append="showConfPass = !showConfPass"
							:error-messages='passwordConfirmErrors'
							label='Confirm password'
							required
							@blur='$v.passwordConfirm.$touch()'
							@keyup.enter='onSubmit'
						)

					v-card-actions
						v-btn(
							@click='onSubmit'
							:disabled='$v.$invalid'
						) submit
				
</template>

<style lang="sass" scoped>
.register
	&__section
		display: flex
		align-items: center
		justify-content: center
		min-height: 100vh
		padding-top: 0
		background-size: cover
		background-repeat: no-repeat
</style>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
	head() {
		return {
			title: 'Register'
		}
	},

	middleware: ['login.middle'],

	mixins: [validationMixin],

	validations: {
		login: { required, maxLength: maxLength(10) },
		email: { required, email },
		password: { required, minLength: minLength(6) },
		passwordConfirm: { required, sameAs: sameAs('password') }
	},

	data: () => ({
		login: '',
		email: '',
		password: '',
		passwordConfirm: '',
		showPass: false,
		showConfPass: false
	}),

	computed: {
		loginErrors () {
        const errors = []
        if (!this.$v.login.$dirty) return errors
        !this.$v.login.maxLength && errors.push('Login must be at most 10 characters long')
        !this.$v.login.required && errors.push('Login is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Password must be at least 6 characters long')
        !this.$v.password.required && errors.push('Password is required')
        return errors
      },
      passwordConfirmErrors () {
        const errors = []
        if (!this.$v.passwordConfirm.$dirty) return errors
        !this.$v.passwordConfirm.sameAs && errors.push('The entered password does not match')
        !this.$v.passwordConfirm.required && errors.push('Confirm password')
        return errors
      },
	},

	methods: {
		async onSubmit () {
			if (!this.$v.$invalid) {
				const { email, login, password } = this
				
				const { text, color } = this.$store.dispatch('userStore/createUser', {
					email, login, password
				})
			}
			else {
				this.$store.commit('setMessage', {
					text: 'Check that the fields are filled in correctly',
					color: 'color--error'
				})
			}
		}
	},
	
	mounted() {}
}
</script>
