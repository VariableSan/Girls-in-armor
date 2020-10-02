<template lang="pug">
div
  v-row
    v-col(
      cols="12",
      sm="6",
      md="4",
      lg="3",
      v-for="(waifu, index) in waifus",
      :key="index"
    )
      v-hover(v-slot:default="{ hover }")
        v-card.list__card.list-card(dark)
          nuxt-link(:to="`/${routeName}/${waifu._id}`")
            v-img.white--text.align-end(height="350px", :src="waifu.imgUrl")
          .list-card__info
            .list-card__text
              v-card-title
                h4.list__text--ellipsis {{ waifu.name }}
              v-card-text
                p.list__text--ellipsis {{ waifu.description }}
            v-card-actions
              slot(name="actions" tag="div" :waifu="waifu")
</template>

<style lang="sass" scoped>
.list
  &__text--ellipsis
    overflow: hidden
    text-overflow: ellipsis
    display: -webkit-box
    -webkit-line-clamp: 1
    -webkit-box-orient: vertical

  &__card
    height: 100%
    overflow: hidden
    transition: box-shadow .2s ease-in-out
    &:hover
      box-shadow: 0 9px 11px -5px rgba(0,0,0,.2),0 18px 28px 2px rgba(0,0,0,.14),0 7px 34px 6px rgba(0,0,0,.12)

.list-card
  display: flex
  flex-direction: column
  justify-content: space-between

  &__info
    display: flex
    flex-direction: column
    justify-content: space-between
    height: 100%
</style>

<script>
export default {
  props: {
    waifus: {
      type: Array,
      default: () => []
    },
    routeName: {
      type: String,
      default: ''
    }
  }
}
</script>
