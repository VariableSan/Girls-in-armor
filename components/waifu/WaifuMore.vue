<template lang='pug'>
div
  CoolLightBox(
    :items="[waifu.imgUrl]",
    :index="index",
    @close="index = null",
    :fullscreen="true"
  )

  v-container
    v-card.waifu-id__card(dark, loader-height="4", outlined)
      v-row
        v-col(cols="12", md="6", lg="6")
          div
            a.waifu-id__fancy
              v-img(
                dark,
                :src="waifu.imgUrl",
                max-height="500",
                @click.prevent="index = 0"
              )
        v-col(cols="12", md="6", lg="6")
          div.waifu-id__info
            .waifu-id__text
              v-card-title.waifu-id__title {{ waifu.name }}
              v-divider
              v-card-text.waifu-id__description(v-text="waifu.description")
            v-card-actions
              div
                slot(name="actions")

                .waifu-id__details
                  p.waifu-id__author Author: {{ waifu.user.login }}
                  p.waifu-id__date Date: {{ date }}
</template>

<script>
import CoolLightBox from 'vue-cool-lightbox'
import 'vue-cool-lightbox/dist/vue-cool-lightbox.min.css'

export default {
  components: {
    CoolLightBox
  },

  props: {
    waifu: {
      type: Object,
      default: () => ({})
    }
  },

  data: () => ({
    index: null
  }),

  computed: {
    date () {
      const date = new Date(this.waifu.date)

      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      const month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : '0' + (date.getMonth() + 1)
      const year = date.getFullYear()

      return `${day}-${month}-${year}`
    }
  }
}
</script>

<style lang='sass' scoped>
.waifu-id
  &__card
    position: relative
    padding: 18px 30px
    box-shadow: 0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)
    overflow: hidden
    +sm-block()
      padding: 0px 10px

  &__fancy
    cursor: zoom-in

  &__info
    display: flex
    flex-direction: column
    justify-content: space-between
    height: 100%

  &__title
    font-size: 1.3rem
    font-weight: 700
    +sm(font-size, 1.2rem)

  &__description
    white-space: pre-line
    font-size: 1.1rem
    +sm(font-size, 1rem)

  &__details
    position: absolute
    bottom: 15px
    right: 15px
    display: flex
    +md-block()
      position: static
      margin-top: 1.5rem

  &__author
    margin-right: 10px
</style>
