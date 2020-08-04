<template lang='pug'>
	section(class='section')
		v-container
			v-card(dark loader-height="4" class='waifu-id__card' outlined)
				v-row
					v-col(cols='12' md='6' lg='6')
						a(data-fancybox :href='waifu.imgUrl' class='waifu-id__fancy')
							v-img(
								dark
								:src='waifu.imgUrl'
								max-height='500'
							)
					v-col(cols='12' md='6' lg='6')
						v-card-title(class='waifu-id__title') {{ waifu.name }}
						v-divider
						v-card-text(class='waifu-id__description' v-text='waifu.description') 
						.waifu-id__author
							p Author: {{ waifu.user.login }}
</template>

<script>
export default {
	head() {
		return {
			title: this.waifu.name
		}
	},
	
	async asyncData({ $axios, params }) {
		try {
			const waifu = await $axios.$get(`/api/waifu/${params.id}`)
			return { waifu }
		} 
		catch (e) {
			console.error(e)	
		}
	}
}
</script>

<style lang='sass'>
@import '~/assets/_smart-grid'

.waifu-id
	&__card
		position: relative
		padding: 18px 30px
		box-shadow: 0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)
		overflow: hidden
		+sm-block()
			padding: 0px 10px

	&__fancy
		cursor: zoom-in

	&__title
		font-size: 1.3rem
		font-weight: 700
		+sm(font-size, 1.2rem)
	
	&__description
		white-space: pre
		font-size: 1.1rem
		+sm(font-size, 1rem)

	&__author
		position: absolute
		bottom: 15px
		right: 15px
</style>