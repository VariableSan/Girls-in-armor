<template lang="pug">
	v-container
		h4(dark) This is login page
</template>

<script>
export default {
	head() {
		return {
			title: 'Login'
		}
	},

	mounted() {
		const { message } = this.$route.query

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
</script>
