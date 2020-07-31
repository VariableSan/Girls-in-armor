<template lang="pug">
	div
		app-parallax
		app-confrontation
		app-cards
		app-slider
</template>

<script>
import AppParallax from '~/components/home/parallax'
import AppConfrontation from '~/components/home/confrontation'
import AppCards from '~/components/home/cards'
import AppSlider from '~/components/home/slider'
import AppFooter from '~/components/footer'

export default {
	components: {
		AppParallax,
		AppConfrontation,
		AppCards,
		AppSlider
	},

	head() {
		return {
			title: 'Home page'
		}
	}
}
</script>
