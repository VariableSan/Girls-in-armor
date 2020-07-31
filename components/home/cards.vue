<template lang="pug">
	section.home__character-cards
		v-container
			.section__describe
				h2.section__describe__headline Character cards
				p.section__describe__subhead hover the cursor over the image or quote
				small.section__describe__additional if you are using a smartphone, just click on an element (to hide an image or quote, click on any other element) 

			v-row
				v-col(
					cols='12' sm='6' md='6' lg='4'
					v-for='character in characters'
					:key='character.name'
				)
					v-card.home__character-cards__item(dark)
						.home__character-cards__image(
							:style='"background-image: url(" + require("~/assets/images/cards/" + character.image + ".jpg") + ")"'
						)
						v-card-title.home__character-cards__quote 
							h4.home__character-cards__title {{ character.name }} 
							q {{ character.quote }}
</template>

<script>
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

.home
	&__character-cards
		&__item
			position: relative
			overflow: hidden
			height: 400px
			border: 1px solid rgba(#fff, 0.5)
		&__image, &__quote
			position: absolute
			width: 100%
			height: 100%
			background-color: $color--black
			transition: clip-path .4s linear
		&__image
			background-size: cover
			background-position: center
			background-repeat: no-repeat
			clip-path: polygon(0 0, 100% 0, 100% 0, 0% 100%)
			&:hover
				clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%)
				& ~ div
					clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)
		&__quote
			flex-direction: column
			justify-content: center
			clip-path: polygon(0 100%, 100% 0, 100% 100%, 0% 100%)
			word-break: normal
			&:hover
				clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%)
		&__title
			margin-bottom: 15px
			border-bottom: 1px solid #fff
</style>
