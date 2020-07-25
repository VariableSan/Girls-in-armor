<template lang="pug">
	div(v-resize='onResize')
		v-toolbar(flat dark class='header' ref='header' 
			:class='currentRoute == "index" ? "header--transparent": ""'
		)
			div(:class=' windowWidth ? "container" : "" ' class='header__wrapper')
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
					)
						v-icon(left) {{ link.icon }}
						| {{ link.title }}

					v-app-bar-nav-icon(
						class='burger-icon'
						@click='setDrawer'
					)

		div(
			ref='headerClone'
			v-show='currentRoute != "index"'
		)
			
</template>


<script>
export default {
	data: () => ({
		lastScroll: 0,
		scrollUp: 'scroll-up',
		scrollDown: 'scroll-down',
		windowWidth: 0
	}),

	computed: {
		getLinks() {
			return this.$store.state.linkStore.links
		},

		currentRoute() {
			return this.$route.name
		},

		header() {
			return this.$refs.header.$el
		},

		scrollBreakPoint: () => window.innerHeight / 2
	},

	methods: {
		onResize() {
			this.windowWidth = window.innerWidth > 768
		},
		
		setDrawer() {
			this.$store.commit('drawerStore/setDrawer')
		},

		backToList() {
			this.$router.go(-1)
		},

		copyHeaderHeight() {
			const $header = this.header
			const $headerClone = this.$refs.headerClone

			const heightToClone = $header.offsetHeight + $header.style.paddingTop + $header.style.paddingBottom

			$headerClone.style.height = `${heightToClone}px`
		},

		collapsibleHeader() {
			const nav = this.header
			const scrollUp = this.scrollUp
			const scrollDown = this.scrollDown
			const breakPoint = this.scrollBreakPoint

			window.addEventListener('scroll', () => {
				const currentScroll = window.pageYOffset

				if (currentScroll > breakPoint + 100) {
					if (
						currentScroll > this.lastScroll &&
						!nav.classList.contains(scrollDown)
					) {
						// down
						nav.classList.remove(scrollUp)
						nav.classList.add(scrollDown)
					}
					else if (
						currentScroll < this.lastScroll && 
						nav.classList.contains(scrollDown)
					) {
						// up
						nav.classList.remove(scrollDown)
						nav.classList.add(scrollUp)
					}
					
					this.lastScroll = currentScroll
				}
				else {
					nav.classList.remove(scrollUp)
				}
			})
		},

		transparentizeHeader() {
			if (this.$route.name == 'index') {
				window.addEventListener('scroll', () => {
					const currentScroll = window.pageYOffset
					const breakPoint = this.scrollBreakPoint
					const nav = this.$refs.header.$el

					currentScroll > breakPoint ?
						nav.classList.remove('header--transparent') :
						nav.classList.add('header--transparent')
				})
			}
		}
	},

	mounted() {
		this.onResize()
		this.copyHeaderHeight()
		this.collapsibleHeader()
		this.transparentizeHeader()
	},

	beforeUpdate() {
		this.header.classList.remove('scroll-down')
	},

	watch: {
		$route(to, from) {}
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
	z-index: 1000
	transition: top 0.8s cubic-bezier(.22,1,.77,1), background 0.5s ease-in-out
	&--transparent
		background-color: transparent !important
	&__link
		&:not(:nth-last-child(2))
			margin-right: 15px
		+md(display, none)
	&__wrapper
		width: 100%	
	&__content
		width: 100%
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