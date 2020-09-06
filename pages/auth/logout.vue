<template lang="pug">
	
</template>

<script>
export default {
	mounted() {
		this.$store.dispatch('userStore/logout')

		this.$store.commit('setMessage', {
			text: 'You are successfully logged out',
			color: 'color--success'
		})

		this.$router.push('/')
	}
}
</script>