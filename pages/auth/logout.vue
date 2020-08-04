<template lang="pug">
	
</template>

<script>
export default {
	mounted() {
		this.$store.dispatch('userStore/logout')
	}
}
</script>