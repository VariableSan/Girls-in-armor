<template lang="pug">
	v-navigation-drawer(
		v-model='drawer'
		app
		temporary
		dark
		class='drawer__main'
	)
		v-list(dense nav)
			v-list-item(
				v-for="(link, index) in getLinks"
				:key="index"
				:to='link.url'
				link
			)
				v-list-item-icon.drawer__icon
					v-icon {{ link.icon }}
				v-list-item-content
					v-list-item-title {{ link.title }}
</template>

<script>
export default {
	computed: {
		drawer: {
			get() { return this.$store.state.drawerStore.drawer },
			set(state) {
				if (state !== this.$store.state.drawerStore.drawer) {
					this.$store.commit('drawerStore/setDrawer')
				}
			}
		},
		
		getLinks() {
			return this.$store.state.linkStore.links
		}
	}
}
</script>


<style lang="sass" scoped>
.drawer
	&__icon
		margin-right: 30px
	&__main
		z-index: 1000
</style>