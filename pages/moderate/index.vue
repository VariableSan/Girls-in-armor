<template lang="pug">
	v-container
		v-row
			v-col
				div.list__buttons
					v-btn.white--text(
						:loading='fetchLoading'
						:disabled='fetchLoading'
						color='color--primary'
						@click='getModerates'
						dark
					) 
						| Reload
						v-icon(right dark) mdi-download-circle
					

		v-divider(dark)
	
		v-row
			v-col(
				cols='12'
				sm='6'
				md='4'
				lg='3'
				v-for='(waifu, index) in moderates' 
				:key='index'
			)
				v-hover(v-slot:default='{ hover }')
					v-card.list__card(dark)
						nuxt-link(link :to='"/moderate/" + waifu._id')
							v-img.white--text.align-end(height='350px' :src='waifu.imgUrl')
						v-card-title 
							h4.list__text--ellipsis {{waifu.name}}
						v-card-text
							p.list__text--ellipsis {{waifu.description}}
						v-card-actions
							v-btn(
								color="color--primary"
								@click.prevent="publicShow({id: waifu._id, imgUrl: waifu.imgUrl, name: waifu.name, description: waifu.description, user: waifu.user})" 
							) Accept
								

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
	head: () => ({
		title: 'Moderate list'
	}),

	middleware: ['moderate.middle'],

	mounted() {
		if (this.$store.getters['moderate.store/moderates'].length < 1) {
			this.getModerates()
		}
	},
		
	computed: {
		pagination: {
			get() { 
				return this.$store.getters['moderate.store/pagination']
			},
			set(state, payload) {
				if (state !== this.$store.getters['moderate.store/pagination']) {
					this.$store.commit('moderate.store/setPagination', state)
				}
			}
		},

		paginationLength() {
			return this.$store.getters['moderate.store/moderatesLength']
		},

		fetchLoading() {
			return this.$store.getters['loadingStore/getFetchLoading']
		},

		moderates() {
			return this.$store.getters['moderate.store/moderates']
		}
	},
	
	methods: {
		getModerates() {
			this.$store.dispatch('moderate.store/getModerates')
		},

		async publicShow(waifuInfo) {
			const message = await this.$axios.$post('/api/moderate/add', waifuInfo)
			this.$store('setMessage', message)

			this.getModerates()
		}
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