<template lang="pug">
  section.home__hero
    img(
      v-for='image in images'
      :src='require("~/assets/images/" + image.src)'
      class='home__image'
      :class='getClasses(image)'
      :ref='image.className'
    )
    v-img( :src='require("~/assets/images/mobile-bg.jpg")' class="home__mobile-image"  )

</template>

<script>
export default {
  data: () => ({
    images: [
      {
        src: 'clouds2-min.png',
        className: 'clouds'
      },
      {
        src: 'Jeanne d\'Arc-min.png',
        className: 'jeanne'
      },
      {
        src: 'moon-min.png',
        className: 'moon'
      },
      {
        src: 'road-min.png',
        className: 'road'
      },
      {
        src: 'sky-min.png',
        bg: true,
        className: 'sky'
      }
    ]
  }),

  mounted () {
    if (window.innerWidth > 1200) {
      this.parallax()
    }
  },

  methods: {
    parallax () {
      const moon = this.$refs.moon[0]
      const clouds = this.$refs.clouds[0]
      const sky = this.$refs.sky[0]

      const animated = [moon, clouds, sky]

      window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY
        const windowHeight = window.innerHeight

        if (scrollValue > windowHeight) {
          animated.forEach((el) => {
            el.style.animationPlayState = 'paused'
          })
        } else {
          animated.forEach((el) => {
            el.style.animationPlayState = 'running'
          })
        }
      })
    },

    getClasses: image => ({
      'home__image--bg': image.bg,
      'home__image--el': !image.bg,
      ['home__' + image.className]: true
    })
  }
}
</script>

<style lang="sass">
@import "~/assets/keyframes"

.home
  &__hero
    position: relative
    overflow: hidden
    @media (min-width: $break_xl)
      min-height: 120vh
    +xl-block()
      min-height: 90vh
    +lg-block()
      min-height: 70vh
    +md-block()
      min-height: 50vh
    +sm-block()
      min-height: none

    &:before
      content: ''
      position: absolute
      bottom: 0
      left: 0
      z-index: 50
      width: 100%
      height: 25%
      background: linear-gradient(to top, $color--black, transparent)
  &__image
    position: absolute
    top: 0
    left: 0
    +sm-block()
      display: none
    &--bg
      z-index: 0
    &--el
      z-index: 1
  &__sky
    top: -5px
    width: 100%
    @media (min-width: $break_xl)
      animation: sky 15s ease-in-out alternate infinite
  &__clouds
    top: -30%
    z-index: 20
    left: -10%
    width: 100%
    transform: scale(1.2)
    +xl-block()
      top: 0
      left: 0
      transform: scale(1)
    @media (min-width: $break_xl)
      animation: clouds 10s ease-in-out alternate infinite

  &__road
    top: 0
    left: -1px
    z-index: 30
  &__moon
    top: -90px
    z-index: 10
    +xl-block()
      top: 0
    @media (min-width: $break_xl)
      animation: moon 10s ease-in-out alternate infinite
  &__jeanne
    z-index: 40

  &__mobile-image
    display: none
    +sm-block()
      display: block
</style>
