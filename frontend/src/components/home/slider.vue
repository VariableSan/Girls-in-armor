<template lang="pug">
section.section.home__slider(v-resize='onResize')
  v-container
    .section__describe
      h2.section__describe__headline Destiny
      p.section__describe__subhead hover the cursor over the slide and move it to different points of the element
      small.section__describe__additional click on the element to get more information

    .home__slider__block
      .home__slider__item(
        :key='character.name'
        v-for='character in characters'
      )
        .home__slider__inner(data-hover-only='true' ref='scene')
          .home__slider__backdrop(
            :style='"background-image: url(" + require("~/assets/images/slider/" + character.image + "-slider.jpg") + ");" + "background-position: " + character.backdropPosition.bgX'
            data-depth='0.21'
          )
          .home__slider__doll(
            :style='"background-image: url(" + require("~/assets/images/slider/" + character.image + "-doll.png") + ")"'
            data-calibrate-x
            data-depth='1'
          )
</template>

<script>
import Parallax from 'parallax-js'

export default {
  data: () => ({
    parallax: []
  }),

  computed: {
    characters() {
      return this.$store.getters['characters/getCharacters']
    }
  },

  mounted() {
    const scene = this.$refs.scene

    scene.forEach((element, index) => {
      const parallaxInstance = new Parallax(element)

      if (window.innerWidth < 1200) {
        parallaxInstance.disable()
      }

      this.parallax.push(parallaxInstance)
    })
  },

  methods: {
    onResize() {
      if (window.innerWidth > 1200) {
        this.parallax.forEach(element => {
          element.enable()
        })
      } else {
        this.parallax.forEach(element => {
          element.disable()
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~/assets/_smart-grid"
@import "~/assets/colors"

.home__slider
  &__block
    display: flex
    +md-block()
      flex-direction: column
      height: 150vh
    +sm-block()
      height: 100vh
  &__item
    flex-basis: calc(100% / 6)
    display: flex
    justify-content: center
    align-items: center
    height: 600px
    transition: flex-basis 1s ease-in-out
    overflow: hidden
    cursor: pointer
    &:not(:last-child)
      border-right: 3px solid #fff
      +lg-block()
        border-right: none
        border-bottom: 3px solid #fff
    &:hover
      flex-basis: 100%
      .home__slider__backdrop
        filter: blur(2px)
      .home__slider__doll
        opacity: 1
  &__inner
    position: relative
    width: 100%
    height: 100%
  &__backdrop, &__doll
    position: absolute
    top: 0
    left: 0
    rigth: 0
    bottom: 0
    width: 100%
    height: 100%
    margin: auto
    background-repeat: no-repeat
    background-position: center
  &__backdrop
    scale: 1.1
    background-size: cover
    background-color: $color--black
    transition: filter .5s linear
  &__doll
    scale: .9
    background-size: contain
    opacity: 0
    transition: opacity 0.7s linear
</style>
