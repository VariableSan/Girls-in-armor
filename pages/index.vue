<template lang="pug">
	div
		app-parallax
		app-confrontation
		.spacer
</template>

<script>
import AppParallax from '~/components/home/parallax'
import AppConfrontation from '~/components/home/confrontation'

export default {
	components: {
		AppParallax,
		AppConfrontation
	}
}
</script>

<style lang="sass" scoped>
.spacer
	min-height: 100vh
</style>