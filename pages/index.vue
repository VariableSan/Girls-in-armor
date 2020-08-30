<template lang="pug">
	div
		app-parallax
		app-confrontation
		app-cards
		app-slider
		app-footer
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
		AppSlider,
		AppFooter
	},

	head() {
		return {
			title: 'Home page'
		}
	},

	mounted() {
		const { login } = this.$route.query

		if (login) {
			this.$store.commit('setMessage', {
				text: 'You need to login first',
				color: 'color--warning'
			})
		}
	}
}
</script>
