<template lang="pug">
	v-container
		v-row
			v-col
				div.list__buttons
					v-btn.white--text(
						:loading='fetchLoading'
						:disabled='fetchLoading'
						color='color--primary'
						@click='getWaifus'
						dark
					) Fetch data from server
				
						v-icon(right dark) mdi-download-circle
					

		v-divider(dark)
	
		v-row
			v-col(cols='12' sm='6' md='4' lg='3' v-for='(waifu, index) in waifus' :key='index')
				v-hover(v-slot:default='{ hover }')
					v-card.list__card(dark link :to='"/waifu/" + waifu._id')
						v-img.white--text.align-end(height='350px' :src='waifu.imgUrl')
						v-card-title 
							h4.list__text--ellipsis {{waifu.name}}
						v-card-text
							p.list__text--ellipsis {{waifu.description}}

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
	head() {
		return {
			title: 'List'
		}
	},
	
	computed: {
		waifus() {
			return this.$store.getters['waifuStore/getWaifuList']
		},

		pagination: {
			get() {
				return this.$store.getters['waifuStore/getPagination'] 
			},
			set(state, payload) {
				if (state !== this.$store.getters['waifuStore/getPagination']) {
					this.$store.commit('waifuStore/setPagination', state)
				}
			}
		},

		paginationLength() {
			return this.$store.getters['waifuStore/getWaifusLength']
		},

		fetchLoading() {
			return this.$store.getters['loadingStore/getFetchLoading']
		}
	},
	
	methods: {
		getWaifus() {
			this.$store.dispatch('waifuStore/getWaifuListFromServer')
		}
	},

	mounted() {
		const { added, permission } = this.$route.query
		
		this.$store.getters['waifuStore/getWaifuList'].length < 1 ?
			this.getWaifus() :
			null

		if (permission) {
			this.$store.commit('setMessage', {
				text: 'You do not have administrator access rights',
				color: 'color--warning'
			})
		}
	},

	watch: {
		paginationLength() {}
	}
}
</script>

<style lang="sass" scoped>
@import "~/assets/colors"
@import "~/assets/_smart-grid"

.list
	&__buttons
		display: flex
		justify-content: flex-end
		+md(justify-content, flex-start)

	&__text--ellipsis
		overflow: hidden
		text-overflow: ellipsis
		display: -webkit-box
		-webkit-line-clamp: 1
		-webkit-box-orient: vertical

	&__card
		height: 100%
		transition: box-shadow .2s ease-in-out
		&:hover
			box-shadow: 0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)

</style>