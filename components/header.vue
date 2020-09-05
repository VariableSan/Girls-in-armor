<template lang="pug">
	div(v-resize='onResize')
		v-toolbar(flat dark class='header' ref='mainHeader' 
			:class='isTransparent ? "header--transparent": ""'
		)
			div(:class=' windowWidth ? "container" : "" ' class='header__wrapper')
				div.header__content
					v-toolbar-title(
						v-if='currentRoute == "waifu-id" || currentRoute == "moderate-id"'
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
			v-show='!isTransparent'
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
			if (this.user) {
				
				if (this.permission) {
					return this.$store.getters['linkStore/getLinks']
						.filter(link => !link.onlyNoAuth)
				}
				
				return this.$store.getters['linkStore/getLinks']
					.filter(link => !link.onlyNoAuth && !link.onlyAdmin)
			}
			else {
				return this.$store.getters['linkStore/getLinks']
					.filter(link => !link.authRequire && !link.onlyAdmin)
			}
		},

		currentRoute() {
			return this.$route.name
		},

		mainHeader() {
			return this.$refs.mainHeader.$el
		},

		user() {
			return this.$store.getters['userStore/getUser']
		},

		permission() {
			return this.$store.getters['userStore/getPermission']
		},

		scrollBreakPoint: () => window.innerHeight / 2,

		isTransparent() {
			const allowRoutes = ['index', 'auth-register', 'auth-login']

			return allowRoutes.some(route => route == this.currentRoute)
		}
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
			const $header = this.mainHeader
			const $headerClone = this.$refs.headerClone

			const heightToClone = $header.offsetHeight + $header.style.paddingTop + $header.style.paddingBottom

			$headerClone.style.height = `${heightToClone}px`
		},

		collapsibleHeader() {
			const nav = this.mainHeader
			const scrollUp = this.scrollUp
			const scrollDown = this.scrollDown
			const breakPoint = this.scrollBreakPoint

			const currentScroll = window.scrollY
			
			if (currentScroll > breakPoint - 100) {
				if (
					currentScroll > this.lastScroll && !nav.classList.contains(scrollDown)
				) {
					// down
					nav.classList.add(scrollDown)
				}
				else if (
					currentScroll < this.lastScroll && nav.classList.contains(scrollDown)
				) {
					// up
					nav.classList.remove(scrollDown)
				}
				
				this.lastScroll = currentScroll
			}
			else {
				nav.classList.remove(scrollDown)
			}
		},

		transparentizeHeader() {
			const breakPoint = this.scrollBreakPoint
			const nav = this.mainHeader
			
			if (this.$route.name == 'index') {
				const currentScroll = window.scrollY

				currentScroll > breakPoint ?
					nav.classList.remove('header--transparent') :
					nav.classList.add('header--transparent')
			}
			else {
				nav.classList.remove('header--transparent')
			}
		}
	},

	mounted() {
		this.onResize()
		this.copyHeaderHeight()

		window.addEventListener('scroll', () => {
			this.transparentizeHeader()
			this.collapsibleHeader()
		})
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

.scroll-down
	top: -100px

.back-icon
	transition: color .3s
	&:hover
		color: $color--primary
</style>