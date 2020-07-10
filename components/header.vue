<template lang="pug">
	v-toolbar(flat dark)
		v-toolbar-title Logo
		v-spacer
		v-btn(
			class='header__link'
			depressed
			v-for="(link, index) in getLinks"
			:key="index"
			:to='link.url'
		) {{ link.title }}

		v-app-bar-nav-icon(
			class='burger-icon'
			@click='setDrawer'
		)
			
</template>


<script>
export default {
	computed: {
		getLinks() {
			return this.$store.getters.getLinks
		}
	},

	methods: {
		setDrawer() {
			this.$store.commit('setDrawer')
		}
	}
}
</script>


<style lang="sass" scoped>
@import "~/assets/_smart-grid"

.header
	&__link
		+md(display, none)
	
.burger-icon
	display: none
	+md(display, block)
</style>