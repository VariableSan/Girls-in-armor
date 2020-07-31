<template lang="pug">
	section.section.home__slider
		v-container(  )
			.section__describe
				h2.section__describe__headline Destiny
				p.section__describe__subhead
				small.section__describe__additional
				
		.home__slider__block
			.home__slider__item(
				v-for='character in characters'
				:key='character.name'
			)
					//- :style=' "background-image: url(" + require("~/assets/images/slider/" + character.image + "-slider.jpg") + ")" '
					.home__slider__doll(:style=' "background-image: url(" + require("~/assets/images/slider/" + character.image + "-doll.png") + ")" ')
			
</template>

<script>
// import Parallax from '~/node_modules/parallax-js/dist/parallax.min.js'

export default {
	computed: {
		characters() {
			return this.$store.getters['characters/getCharacters']
		}
	}
}
</script>

<style lang="sass" scoped>
@import "~/assets/_smart-grid"
@import "~/assets/colors"

.home__slider
	&__block
		display: flex
	&__item
		flex-basis: calc(100% / 6)
		display: flex
		justify-content: center
		align-items: center
		height: 500px
		transition: flex-basis 0.6s ease-in-out
		&:not(:last-child)
			border-right: 3px solid #fff
		&:hover
			flex-basis: 100%
	&__doll
		width: 100%
		height: 100%
		background-position: center
		background-size: contain
		
</style>
