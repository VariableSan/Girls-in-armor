<template lang="pug">
	v-container
		v-row
			v-col(cols='12' sm='6' md='4' lg='3' v-for='(waifu, index) in waifus' :key='index')
				v-card.mx-auto(dark :to='"/waifu/" + waifu._id')
					v-img.white--text.align-end(height='350px' :src='waifu.imgUrl')
					v-card-title {{waifu.name}}
					v-card-text.text--primary.primary
						p {{waifu.description}}

		template(v-if='paginationLength > 1')
			v-pagination(
				dark
				v-model='pagination'
				:length='paginationLength'
				:total-visible='7'
				:class='this.$vuetify.theme.dark ? "pagination--dark" : ""'
			)
</template>

<script>
export default {
	async asyncData({ $axios }) {
		const allWaifusCount = await $axios.$get('/api/list/waifuslength')
		const paginationLength = Math.floor(allWaifusCount / 15)

		return { paginationLength }
	},
	
	computed: {
		waifus() {
			return this.$store.state.waifuStore.waifuList
		},

		pagination: {
			get() { return this.$store.state.waifuStore.pagination },
			set(state, payload) {
				if (state !== this.$store.state.waifuStore.pagination) {
					this.$store.commit('waifuStore/setPagination', state)
				}
			}
		}
	},
	
	methods: {
		getWaifus() {
			this.$store.dispatch('waifuStore/getWaifuListFromServer')
		}
	},

	mounted() {
		this.getWaifus()
	}
}
</script>

<style lang="sass" scoped>
</style>