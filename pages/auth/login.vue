<template lang="pug">
	section.section.login__section
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
						)

					v-card-actions
						v-btn(
							@click='onSubmit'
							:disabled='$v.$invalid'
						) submit
				
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, email, sameAs } from 'vuelidate/lib/validators'

export default {
	head() {
		return {
			title: 'Login'
		}
	},

	middleware: ['login.middle'],

	mixins: [validationMixin],

	validations: {
		login: { required },
		password: { required }
	},

	data: () => ({
		login: '',
		password: '',
		showPass: false
	}),

	computed: {
		loginErrors () {
        const errors = []
        if (!this.$v.login.$dirty) return errors
        !this.$v.login.required && errors.push('Login is required.')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('Password is required')
        return errors
      }
	},

	methods: {
		async onSubmit () {
			if (!this.$v.$invalid) {
				const { login, password } = this
				
				this.$store.dispatch('userStore/login', {
					login, password
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
	
	mounted() {
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
	}
}
</script>
