<template lang="pug">
	div
		app-parallax
		app-confrontation
		app-cards
		.spacer
</template>

<script>
import AppParallax from '~/components/home/parallax'
import AppConfrontation from '~/components/home/confrontation'
import AppCards from '~/components/home/cards'

export default {
	components: {
		AppParallax,
		AppConfrontation,
		AppCards
	}
}
</script>

<style lang="sass" scoped>
.spacer
	min-height: 100vh
</style>