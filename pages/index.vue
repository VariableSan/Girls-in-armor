<template lang="pug">
	div
		app-parallax
		app-confrontation
		app-cards
		app-slider
		.spacer
</template>

<script>
import AppParallax from '~/components/home/parallax'
import AppConfrontation from '~/components/home/confrontation'
import AppCards from '~/components/home/cards'
import AppSlider from '~/components/home/slider'

export default {
	components: {
		AppParallax,
		AppConfrontation,
		AppCards,
		AppSlider
	}
}
</script>

<style lang="sass" scoped>
.spacer
	min-height: 100vh
</style>