<template lang="pug">
	section.section.home__confrontation
		v-container
			.section__describe
				h2.section__describe__headline Confrontation
				p.section__describe__subhead click on the image to get a description
				small.section__describe__additional to close description click on the {{ windowSize.width > breakPoint ? "image again" : "text" }}
			.home__confrontation__block

				.home__confrontation__item.home__confrontation__item--left(ref='alter')
					.home__confrontation__image
						.home__confrontation__portrait(
							:style="'background-image: url(' + require('~/assets/images/confrontation/alter-saber.jpg') + ')'"
							@click="clickExpand({refName: 'alter', descName: 'alterDescription'})"
						)
					.home__confrontation__description.home__confrontation__description--dark.color--light(@click='decreaseMobile("alterDescription")' ref='alterDescription')
						h3.home__confrontation__title Alter Saber
						p.home__confrontation__subtitle Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
						
						
				.home__confrontation__item.home__confrontation__item--right(ref='main')
					.home__confrontation__image
						.home__confrontation__portrait(
							:style="'background-image: url(' + require('~/assets/images/confrontation/saber.jpg') + ')'"
							@click="clickExpand({refName: 'main', descName: 'mainDescription'})"
						)
					.home__confrontation__description.home__confrontation__description--light(@click='decreaseMobile("mainDescription")' ref='mainDescription')
						h3.home__confrontation__title Saber
						p.home__confrontation__subtitle Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</template>

<script>
export default {
	data: () => ({
		windowSize: {
			width: 0
		},
		breakPoint: 576
	}),
	
	methods: {
		clickExpand(params) {
			const { refName, descName } = params

			if (this.windowSize.width > this.breakPoint) {
				this.expandDesktop(refName)
			}
			else {
				this.expandMobile(descName)
			}
		},

		expandDesktop(refName) {
			const parentItem = this.$refs[refName]

			if (refName == 'alter') {
				parentItem.style.zIndex = '10'
				parentItem.classList.toggle('home__confrontation__item--clip-right')
				this.$refs.main.classList.remove('home__confrontation__item--clip-left')
				this.$refs.main.style.zIndex = '1'
			}
			else {
				parentItem.style.zIndex = '10'
				parentItem.classList.toggle('home__confrontation__item--clip-left')
				this.$refs.alter.classList.remove('home__confrontation__item--clip-right')
				this.$refs.alter.style.zIndex = '1'
			}
			parentItem.classList.toggle('home__confrontation__item--clip')
		},

		expandMobile(descName) {
			this.$refs[descName].classList.add('home__confrontation__description--show')
		},

		decreaseMobile(descName) {
			if (this.windowSize.width < this.breakPoint) {
				this.$refs[descName].classList.remove('home__confrontation__description--show')
			}
		},

		onResize() {
			window.addEventListener('resize', () => {
				this.windowSize = {
					width: window.innerWidth
				}
			})
		}
	},

	mounted() {
		this.onResize()
	}
}
</script>

<style lang="sass">
@import "~/assets/colors"
@import "~/assets/_smart-grid"

$color--alter: #121212
$color--main: #E5ECF6

.home__confrontation
	&__block
		position: relative
		display: flex
		flex-direction: column
		min-height: 80vh
		box-shadow: 0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)
		+sm-block()
			box-shadow: none
			
	&__item
		position: absolute
		top: 0
		left: 0
		z-index: 1
		display: flex
		width: 100%
		height: 100%
		border-radius: 5px
		overflow: hidden
		transition: clip-path 0.5s ease-in-out
		+sm-block()
			position: relative
			flex-direction: column
			height: 350px
			margin-bottom: 30px

		&--left
			background-color: $color--alter
			clip-path: polygon(0 0, 50% 0, 50% 100%, 0% 100%)
			+sm-block()
				clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%)
		&--right
			flex-direction: row-reverse
			background-color: $color--main
			color: $color--black
			clip-path: polygon(100% 0, 50% 0, 50% 100%, 100% 100%)
			+sm-block()
				flex-direction: inherit
				clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%)
		&--clip
			.home__confrontation__portrait
				transform: scale(1.1)
		&--clip-right
			clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%)
		&--clip-left
			clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%)
			
	&__image
		width: 50%
		height: 100%
		overflow: hidden
		+sm-block()
			width: 100%
			
	&__portrait
		width: 100%
		height: 100%
		background-size: cover
		cursor: pointer
		transition: transform 0.3s ease-in-out
		&:hover
			transform: scale(1.1)
			+sm(transform, scale(1))
			
	&__description
		width: 50%
		padding: 30px
		+sm-block()
			position: absolute
			top: 100%
			left: 0
			width: 100%
			height: 100%
			opacity: 0
			transition: all 0.6s ease-in
		&--show
			top: 0
			opacity: 1
		&--dark
			background-color: rgba($color--alter, 0.8)
		&--light
			background-color: rgba($color--main, 0.8)
			
	&__title
		margin-bottom: 15px
		font-size: 24px
		+sm(font-size, 20px)

	&__subtitle
		font-size: 18px
		+sm(font-size, 16px)
</style>