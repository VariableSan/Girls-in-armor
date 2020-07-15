<template lang="pug">
	div
		v-toolbar(flat dark class='header' id='header')
			v-container
				div.header__content
					v-toolbar-title(
						v-if='currentRoute == "waifu-id"'
						@click='backToList'
						class='clickable'
					)
						v-icon(
							size='40px'
							class='back-icon'
						) mdi-arrow-left-circle-outline
					v-toolbar-title(v-else) Logo
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
		div(
			id='headerClone'
			v-show='currentRoute != "index"'
		)
			
</template>


<script>
export default {
	data: () => ({
		lastScroll: 0,
		scrollUp: 'scroll-up',
		scrollDown: 'scroll-down'
	}),

	computed: {
		getLinks() {
			return this.$store.state.linkStore.links
		},

		currentRoute() {
			return this.$route.name
		}
	},

	methods: {
		setDrawer() {
			this.$store.commit('drawerStore/setDrawer')
		},

		backToList() {
			this.$router.go(-1)
		},

		copyHeaderHeight() {
			const $header = document.querySelector('#header')
			const $headerClone = document.querySelector('#headerClone')

			const heightToClone = $header.offsetHeight + $header.style.paddingTop + $header.style.paddingBottom

			$headerClone.style.height = `${heightToClone}px`
		},

		collapsibleHeader() {
			const nav = document.querySelector('#header')
			const scrollUp = this.scrollUp
			const scrollDown = this.scrollDown

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
	},

	beforeUpdate() {
		document.querySelector('#header').classList.remove('scroll-down')
	},

	watch: {
		$route(to, from) {
			
		}
	}
}
</script>


<style lang="sass" scoped>
@import "~/assets/_smart-grid"
@import "~/assets/colors"

.header
	position: fixed
	top: 0
	left: 0
	width: 100%
	z-index: 7
	transition: top 0.5s cubic-bezier(.22,1,.77,1)
	&__link
		+md(display, none)
	&__content
		display: flex
		flex-wrap: wrap
		align-items: center
	
.burger-icon
	display: none
	+md(display, block)

.scroll-up
	top: 0

.scroll-down
	top: -100px

.back-icon
	transition: color .3s
	&:hover
		color: $color--primary
</style>