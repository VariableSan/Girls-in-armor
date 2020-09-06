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
					) Update
				
						v-icon(right dark) mdi-download-circle
					

		v-divider(dark)
	
		v-row
			v-col(cols='12' sm='6' md='4' lg='3' v-for='(waifu, index) in waifus' :key='index')
				v-hover(v-slot:default='{ hover }')
					v-card.list__card.list-card(dark)
						nuxt-link(:to='"/waifu/" + waifu._id')
							v-img.white--text.align-end(height='350px' :src='waifu.imgUrl')
						.list-card__info
							.list-card__text
								v-card-title 
									h4.list__text--ellipsis {{waifu.name}}
								v-card-text
									p.list__text--ellipsis {{waifu.description}}
							v-card-actions
								v-btn(
									@click="removeCardById(waifu._id, waifu.user)" 
									color="color--deeporange"
									v-if="waifu.user == user" 
								) Remove
								

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
					this.getWaifus()
				}
			}
		},

		paginationLength() {
			return this.$store.getters['waifuStore/getWaifusLength']
		},

		fetchLoading() {
			return this.$store.getters['loadingStore/getFetchLoading']
		},

		user() {
			return this.$store.getters['userStore/getUser']
		}
	},
	
	methods: {
		getWaifus() {
			this.$store.dispatch('waifuStore/getWaifuListFromServer')
		},

		async removeCardById(id, user) {
			if (this.user == user) {
				this.$store.dispatch('waifuStore/removeWaifu', id)
			}
		}
	},

	mounted() {
		const { message } = this.$route.query
		
		this.$store.getters['waifuStore/getWaifuList'].length < 1 ?
			this.getWaifus() :
			null

		if (message) {
			switch (message) {
				case 'permission':
					this.$store.commit('setMessage', {
						text: 'You do not have administrator access rights',
						color: 'color--warning'
					})			
					break;
			}
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
		overflow: hidden
		transition: box-shadow .2s ease-in-out
		&:hover
			box-shadow: 0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)

.list-card
	display: flex
	flex-direction: column
	justify-content: space-between
	
	&__info
		display: flex
		flex-direction: column
		justify-content: space-between
		height: 100%
</style>