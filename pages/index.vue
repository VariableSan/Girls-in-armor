<template lang="pug">
	div
		div.home__hero
			v-img(
				src='https://sun9-30.userapi.com/c858328/v858328957/1d3b46/KsvD4IOFKU4.jpg'
			)

		v-container
			div.some-class
				h1 huemue
</template>

<script>
export default {
	asyncData: async ({$axios}) => ({
	}),

	mounted() {
	}	
}
</script>

<style lang="sass" scoped>
.home
	&__hero
		min-height: 120vh

.some-class
	min-height: 200vh
	color: #fff
</style>