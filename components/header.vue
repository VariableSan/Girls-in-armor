<template lang="pug">
div(v-resize='onResize')
  v-toolbar.header(
    :class='isTransparent ? "header--transparent" : ""'
    dark
    flat
    ref='mainHeader'
  )
    .header__wrapper(:class='windowWidth ? "container" : ""')
      .header__content
        v-toolbar-title.clickable(
          @click='backToList'
          v-if='currentRoute == "waifu-id" || currentRoute == "moderate-id"'
        )
          v-icon.back-icon(size='40px') mdi-arrow-left-circle-outline

        v-toolbar-title(v-else)
          nuxt-link.header__logo(to='/') Girls in Armor
        v-spacer
        v-btn.header__link(
          :key='index'
          :to='link.url'
          depressed
          v-for='(link, index) in getLinks'
        )
          v-icon(left) {{ link.icon }}
          | {{ link.title }}

        v-app-bar-nav-icon.burger-icon(@click='setDrawer')

  div(ref='headerClone' v-show='!isTransparent')
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
    getLinks () {
      if (this.user) {
        if (this.permission) {
          return this.$store.getters['linkStore/getLinks'].filter(
            link => !link.onlyNoAuth
          )
        }

        return this.$store.getters['linkStore/getLinks'].filter(
          link => !link.onlyNoAuth && !link.onlyAdmin
        )
      } else {
        return this.$store.getters['linkStore/getLinks'].filter(
          link => !link.authRequire && !link.onlyAdmin
        )
      }
    },

    currentRoute () {
      return this.$route.name
    },

    mainHeader () {
      return this.$refs.mainHeader.$el
    },

    user () {
      return this.$store.getters['userStore/getUser']
    },

    permission () {
      return this.$store.getters['userStore/getPermission']
    },

    scrollBreakPoint: () => window.innerHeight / 2,

    isTransparent () {
      const allowRoutes = ['index', 'auth-register', 'auth-login']

      return allowRoutes.some(route => route === this.currentRoute)
    }
  },

  watch: {
    $route (to, from) {}
  },

  mounted () {
    this.onResize()
    this.copyHeaderHeight()

    window.addEventListener('scroll', () => {
      this.transparentizeHeader()
      this.collapsibleHeader()
    })
  },

  methods: {
    onResize () {
      this.windowWidth = window.innerWidth > 768
    },

    setDrawer () {
      this.$store.commit('drawerStore/setDrawer')
    },

    backToList () {
      this.$router.go(-1)
    },

    copyHeaderHeight () {
      const $header = this.mainHeader
      const $headerClone = this.$refs.headerClone

      const heightToClone =
        $header.offsetHeight +
        $header.style.paddingTop +
        $header.style.paddingBottom

      $headerClone.style.height = `${heightToClone}px`
    },

    collapsibleHeader () {
      const nav = this.mainHeader
      const scrollDown = this.scrollDown
      const breakPoint = this.scrollBreakPoint

      const currentScroll = window.scrollY

      if (currentScroll > breakPoint - 100) {
        if (
          currentScroll > this.lastScroll &&
          !nav.classList.contains(scrollDown)
        ) {
          // down
          nav.classList.add(scrollDown)
        } else if (
          currentScroll < this.lastScroll &&
          nav.classList.contains(scrollDown)
        ) {
          // up
          nav.classList.remove(scrollDown)
        }

        this.lastScroll = currentScroll
      } else {
        nav.classList.remove(scrollDown)
      }
    },

    transparentizeHeader () {
      const breakPoint = this.scrollBreakPoint
      const nav = this.mainHeader

      if (this.$route.name === 'index') {
        const currentScroll = window.scrollY

        currentScroll > breakPoint
          ? nav.classList.remove('header--transparent')
          : nav.classList.add('header--transparent')
      } else {
        nav.classList.remove('header--transparent')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.header
  position: fixed
  top: 0
  left: 0
  width: 100%
  z-index: 1000
  transition: top 0.8s cubic-bezier(.22,1,.77,1), background 0.5s ease-in-out
  &--transparent
    background-color: transparent !important
  &__logo
    position: relative
    color: #fff
    text-decoration: none
    &:hover
      &::after
        width: 100%
    &:focus
      outline: none
    &::after
      content: ''
      position: absolute
      bottom: 0
      left: 0
      right: 0
      width: 0
      height: 2px
      margin: 0 auto
      background-color: #fff
      transition: all 0.3s ease-in-out
  &__link
    &:not(:nth-last-child(2))
      margin-right: 15px
      +lg(display, none)
  &__wrapper
    width: 100%
  &__content
    width: 100%
    display: flex
    flex-wrap: wrap
    align-items: center

.burger-icon
  display: none
  +lg(display, block)

.scroll-down
  top: -100px

.back-icon
  transition: color .3s
  &:hover
    color: $color--primary
</style>
