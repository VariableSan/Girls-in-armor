<template lang='pug'>
	section(class='section')
		v-container
			v-card(dark class='waifu-id__card' outlined elevation='6')
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
						v-card-text(class='waifu-id__description') {{ waifu.description }}
</template>

<script>
export default {
	async asyncData({ $axios, params }) {
		const waifu = await $axios.$get(`/api/waifu/${params.id}`)
		return { waifu }
	}
}
</script>

<style lang='sass'>
@import '~/assets/_smart-grid'

.waifu-id
	&__card
		padding: 18px 30px
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
		font-size: 1.1rem
		+sm(font-size, 1rem)

</style>