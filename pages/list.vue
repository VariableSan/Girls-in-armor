<template lang="pug">
	v-container
		v-btn(@click='getWaifus') Get all waifus

		v-list-item-content
			v-list-item-title(v-for='(waifu, index) in waifus' :key='index') {{ waifu.name }}
</template>

<script>
export default {
	computed: {
		waifus() {
			return this.$store.getters.getWaifuList
		}
	},
	
	methods: {
		getWaifus() {
			this.$store.dispatch('getWaifuListFromServer')
		}
	}
}
</script>

<style lang="sass" scoped>
</style>