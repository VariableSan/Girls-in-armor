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
							:style='"background-image: url(" + require("~/assets/images/cards/" + character.image) + ")"'
						)
						v-card-title.home__character-cards__quote 
							h4.home__character-cards__title {{ character.name }} 
							q {{ character.quote }}
</template>

<script>
export default {
	data: () => ({
		characters: [
			{
				name: 'Mordred',
				quote: 'I’ll do whatever I want, when I want and that’s that. But I’ll own up to my actions',
				image: 'mordred.jpg'
			},
			{
				name: 'Okita Souji',
				quote: 'Engulfed in a warm light that narrowly lies ahead, I did not want to do something like looking up at the skies',
				image: 'okita.jpg'
			},
			{
				name: "Jeanne d'Arc",
				quote: 'Your life to come is bound to make you smile',
				image: 'jeanne.jpg'
			},
			{
				name: 'Scathach',
				quote: 'In the end, this body was wet with the blood of many victims, and became immortal. The territory under my rule, the "Land of Shadows", was ultimately forced out to the Outside of the World, and I ended up being promoted into an existence no different than that of a Divine Spirit',
				image: 'scathach.jpg'
			},
			{
				name: 'Nagao Kagetora',
				quote: 'Fortune to the heavens, Armour upon my chest, Feats from my steps!',
				image: 'nagao.jpg'
			},
			{
				name: 'Tomoe Gozen',
				quote: 'For you to take me at every opportunity. If I am being useful, I am happy. I will strive to do my best',
				image: 'tomoe.jpg'
			}
		]
	})
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
