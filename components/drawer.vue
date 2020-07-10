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
import { mapGetters } from 'vuex'

export default {
	computed: {
		drawer: {
			get() { return this.$store.getters.getDrawer },
			set(state) {
				if (state !== this.$store.getters.getDrawer) {
					this.$store.commit('setDrawer')
				}
			}
		},
		
		getLinks() {
			return this.$store.getters.getLinks
		}
	}
}
</script>