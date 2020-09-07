<template lang="pug">
	section.home__hero
		img(
			v-for='image in images'
			:src='require("~/assets/images/" + image.src)'
			class='home__image'
			:class='getClasses(image)'
			:ref='image.className'
		)
</template>

<script>
export default {
	data: () => ({
		images: [
			{
				src: 'clouds2-min.png',
				className: 'clouds'
			},
			{
				src: 'Jeanne d\'Arc-min.png',
				className: 'jeanne'
			},
			{
				src: 'moon-min.png',
				className: 'moon'
			},
			{
				src: 'road-min.png',
				className: 'road'
			},
			{
				src: 'sky-min.png',
				bg: true,
				className: 'sky'
			}
		] 
	}),

	methods: {
		parallax() {
			const moon = this.$refs.moon[0]
			const clouds = this.$refs.clouds[0]
			const sky = this.$refs.sky[0]
			const road = this.$refs.road[0]

			const initialMoonPosition = moon.y
			const initialCloudsPosition = clouds.x
			const initialSkyPosition = sky.y
			const initialRoadPosition = road.y

			const relativeSpeed = 1
			
			window.addEventListener('scroll', () => {
				let scrollValue = window.scrollY >= 0 ? window.scrollY : 0
				let scrollSpeed = scrollValue * relativeSpeed
				
				if (scrollValue < window.innerHeight) {
					moon.style.top = `${initialMoonPosition + scrollSpeed / 4}px`
					clouds.style.left = `${initialCloudsPosition + scrollSpeed / 3}px`
					sky.style.top = `${initialSkyPosition - scrollSpeed / 6}px`
				}
			})
		},

		getClasses: (image) => ({
			"home__image--bg": image.bg,
			"home__image--el": !image.bg,
			["home__" + image.className]: true
		})
	},
	
	mounted() {
		if (window.innerWidth > 1200) {
			this.parallax()
		}
	}
}
</script>

<style lang="sass">
	
@import "~/assets/colors"
@import "~/assets/_smart-grid"

.home
	&__hero
		position: relative
		min-height: 120vh
		overflow: hidden
		&:before
			content: ''
			position: absolute
			bottom: 0
			left: 0
			z-index: 50
			width: 100%
			height: 25%
			background: linear-gradient(to top, $color--black, transparent)
	&__image
		position: absolute
		top: 0
		left: 0
		&--bg
			z-index: 0
		&--el
			z-index: 1
	&__sky
		top: -5px
		width: 100%
	&__clouds
		top: -30%
		z-index: 20
		left: -10%
		width: 100%
		transform: scale(1.2)
		+xl-block()
			top: 0

	&__road
		top: 0
		left: -1px
		z-index: 30
	&__moon
		top: -90px
		z-index: 10
		+xl-block()
			top: 0
	&__jeanne
		z-index: 40
</style>