<template lang="pug">
	v-navigation-drawer(v-model='drawer' absolute temporary dark)
		v-list(dense)
			v-list-item(
				v-for="(link, index) in getLinks"
				:key="index"
				:to='link.url'
			)
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