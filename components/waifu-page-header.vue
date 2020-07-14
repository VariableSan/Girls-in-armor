<template lang="pug">
	div
		v-toolbar(flat dark class='header' id='header')
			v-container
				div.header__content
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
		div(id='headerClone')
			
</template>


<script>
export default {
	data: () => ({
		lastScroll: 0
	}),

	computed: {
		getLinks() {
			return this.$store.state.linkStore.links
		}
	},

	methods: {
		setDrawer() {
			this.$store.commit('drawerStore/setDrawer')
		},

		copyHeaderHeight() {
			const $header = document.querySelector('#header')
			const $headerClone = document.querySelector('#headerClone')

			$headerClone.style.height = `${$header.offsetHeight}px`
		},

		collapsibleHeader() {
			const nav = document.querySelector('#header')
			const scrollUp = 'scroll-up'
			const scrollDown = 'scroll-down'

			window.addEventListener('scroll', () => {
				const currentScroll = window.pageYOffset

				if (currentScroll == 0) {
					nav.classList.remove(scrollUp)
					return
				}

				if (currentScroll > this.lastScroll && !nav.classList.contains(scrollDown)) {
					// down
					nav.classList.remove(scrollUp)
					nav.classList.add(scrollDown)
				}
				else if (currentScroll < this.lastScroll && nav.classList.contains(scrollDown)) {
					// up
					nav.classList.remove(scrollDown)
					nav.classList.add(scrollUp)
				}
				
				this.lastScroll = currentScroll
			})
		}
	},

	mounted() {
		this.copyHeaderHeight()
		this.collapsibleHeader()
	}
}
</script>


<style lang="sass" scoped>
@import "~/assets/_smart-grid"

.header
	position: fixed
	top: 0
	left: 0
	width: 100%
	z-index: 1000
	transition: top 0.5s cubic-bezier(.22,1,.77,1)
	&__link
		+md(display, none)
	&__content
		display: flex
		flex-wrap: wrap
	
.burger-icon
	display: none
	+md(display, block)

.scroll-up
	top: 0

.scroll-down
	top: -100px
</style>