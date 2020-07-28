<template lang="pug">
	section.section.home__confrontation(data-aos="fade-up")
		v-container
			.section__describe
				h2.section__describe__headline Confrontation
				p.section__describe__subhead click on the image to get a description
				small.section__describe__additional to close description click on the image again
			.home__confrontation__block
				.home__confrontation__item.home__confrontation__item--left(ref='alter')
					.home__confrontation__image
						.home__confrontation__portrait(
							:style="'background-image: url(' + require('~/assets/images/confrontation/alter-saber.jpg') + ')'"
							@click="clickExpand('alter')"
						)
					.home__confrontation__description.home__confrontation__description--light
						h3.home__confrontation__title Alter Saber
						p.home__confrontation__subtitle Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				.home__confrontation__item.home__confrontation__item--right(ref='main')
					.home__confrontation__image
						.home__confrontation__portrait(
							:style="'background-image: url(' + require('~/assets/images/confrontation/saber.jpg') + ')'"
							@click="clickExpand('main')"
						)
					.home__confrontation__description
						h3.home__confrontation__title Saber
						p.home__confrontation__subtitle Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</template>

<script>
export default {
	methods: {
		clickExpand(refName) {
			const parentItem = this.$refs[refName]

			if (refName == 'alter') {
				parentItem.style.zIndex = '10'
				parentItem.classList.toggle('home__confrontation__item--clip-right')
				this.$refs.main.style.zIndex = '1'
			}
			else {
				parentItem.style.zIndex = '10'
				parentItem.classList.toggle('home__confrontation__item--clip-left')
				this.$refs.alter.style.zIndex = '1'
			}
			parentItem.classList.toggle('home__confrontation__item--clip')
		}
	}
}
</script>

<style lang="sass">
@import "~/assets/colors"
@import "~/assets/_smart-grid"

.home__confrontation
	&__block
		position: relative
		height: 80vh
		box-shadow: 0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)
	&__item
		position: absolute
		top: 0
		left: 0
		z-index: 1
		display: flex
		flex-wrap: wrap
		width: 100%
		height: 100%
		border-radius: 5px
		overflow: hidden
		transition: clip-path 0.4s ease-in-out
		&--left
			background-color: #121212
			clip-path: polygon(0 0, 50% 0, 50% 100%, 0% 100%)
		&--right
			flex-direction: row-reverse
			background-color: #E5ECF6
			color: $color--black
			clip-path: polygon(100% 0, 50% 0, 50% 100%, 100% 100%)
		&--clip
			.home__confrontation__portrait
				transform: scale(1.1)
		&--clip-right
			clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%)
		&--clip-left
			clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%)
	&__image
		flex-basis: 50%
		overflow: hidden
	&__portrait
		width: 100%
		height: 100%
		background-size: cover
		cursor: pointer
		transition: transform 0.3s ease-in-out
		&:hover
			transform: scale(1.1)
	&__description
		flex-basis: 50%
		padding: 30px
		&--light
			color: #fff
	&__title
		margin-bottom: 15px
		font-size: 24px
	&__subtitle
		font-size: 18px
</style>