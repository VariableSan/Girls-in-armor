<template lang="pug">
	v-container
		v-btn(@click='getWaifus') Получить всех вайфу

		v-list(  )
			v-list-item(v-for='(waifu, index) in waifus' :key='index')
				v-item {{ waifu.name }}
				
			
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