<template lang="pug">
div
  app-parallax
  app-confrontation
  app-cards
  app-slider
  app-footer
</template>

<script>
import AppParallax from '~/components/home/parallax'
import AppConfrontation from '~/components/home/confrontation'
import AppCards from '~/components/home/cards'
import AppSlider from '~/components/home/slider'
import AppFooter from '~/components/footer'

export default {
  components: {
    AppParallax,
    AppConfrontation,
    AppCards,
    AppSlider,
    AppFooter
  },

  mounted () {
    const { message } = this.$route.query

    if (message) {
      switch (message) {
      case 'already':
        this.$store.commit('setMessage', {
          text: 'You need to log out',
          color: 'color--warning'
        })
        break
      default:
        break
      }
    }
  },

  head () {
    return {
      title: 'Home page'
    }
  }
}
</script>
