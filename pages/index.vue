<template lang="pug">
	div
		app-parallax
		app-confrontation
		.spacer
</template>

<script>
import AppParallax from '~/components/home/parallax'
import AppConfrontation from '~/components/home/confrontation'

import '~/node_modules/aos/dist/aos.css'
const AOS = require('~/node_modules/aos/dist/aos.js')

export default {
	components: {
		AppParallax,
		AppConfrontation
	},

	mounted() {
		AOS.init()
	}
}
</script>

<style lang="sass" scoped>
.spacer
	min-height: 100vh
</style>