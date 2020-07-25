<template lang="pug">
	div
		-
			var IMAGES = [
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

		section.home__hero
			each image in IMAGES
				img(
					src=`~/assets/images/${image.src}`
					class=`
						home__image
						${image.bg ? 'home__image--bg' : 'home__image--el'}
						home__${image.className}
					`
					ref=`${image.className}`
				)
			
		v-container
			div.some-class
				h1 huemue
</template>

<script>
export default {
	methods: {
		parallax() {
			const moon = this.$refs.moon
			const clouds = this.$refs.clouds
			const sky = this.$refs.sky
			const road = this.$refs.road

			const initialMoonPosition = moon.y
			const initialCloudsPosition = clouds.x
			const initialSkyPosition = sky.y
			const initialRoadPosition = road.y

			const relativeSpeed = 1
			
			window.addEventListener('scroll', () => {
				let scrollValue = window.scrollY
				let scrollSpeed = scrollValue * relativeSpeed
				
				if (scrollValue < window.innerHeight) {
					moon.style.top = `${initialMoonPosition + scrollSpeed / 4}px`
					clouds.style.left = `${initialCloudsPosition + scrollSpeed / 3}px`
					sky.style.top = `${initialSkyPosition - scrollSpeed / 6}px`
				}
			})
		}
	},
	
	mounted() {
		this.parallax()
	}
}
</script>

<style lang="sass" scoped>
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
	&__clouds
		top: -200px
		left: -10%
		z-index: 20
		scale: 1.2
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

.some-class
	min-height: 200vh
	color: #fff
</style>