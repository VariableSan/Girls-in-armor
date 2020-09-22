<template lang='pug'>
  section(class='section')
    CoolLightBox(:items='[waifu.imgUrl]' :index='index' @close='index = null' :fullscreen='true')

    v-container
      v-card(dark loader-height="4" class='waifu-id__card' outlined)
        v-row
          v-col(cols='12' md='6' lg='6')
            a(class='waifu-id__fancy')
              v-img(
                dark
                :src='waifu.imgUrl'
                max-height='500'
                @click.prevent='index = 0'
              )
          v-col(cols='12' md='6' lg='6')
            .waifu-id__info
              .waifu-id__text
                v-card-title(class='waifu-id__title') {{ waifu.name }}
                v-divider
                v-card-text(class='waifu-id__description' v-text='waifu.description')

              v-card-actions
                v-btn(
                  class="waifu-id__action"
                  color="color--primary"
                  @click="publicShow({id: waifu._id, imgUrl: waifu.imgUrl, name: waifu.name, description: waifu.description, user: waifu.user})"
                ) Accept

                v-btn(
                  class="waifu-id__action"
                  color="color--deeporange"
                  @click="rejectPost"
                ) Reject

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

  async asyncData ({ $axios, params }) {
    try {
      const waifu = await $axios.$get(`/api/moderate/${params.id}`)
      return { waifu }
    } catch (e) {
      // eslint-disable-next-line nuxt/no-this-in-fetch-data
      this.$store.commit('setMessage', e.response.data)
    }
  },

  data: () => ({
    index: null
  }),

  computed: {
    date () {
      const date = new Date(this.waifu.date)

      const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
      const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
      const year = date.getFullYear()

      return `${day}-${month}-${year}`
    }
  },

  methods: {
    async publicShow (waifuInfo) {
      const message = await this.$axios.$post('/api/moderate/add', waifuInfo)
      this.$store.commit('setMessage', message)
      this.$router.push('/moderate?message=moderated')
    },

    async rejectPost () {
      const message = await this.$axios.$delete('/api/moderate/remove', {
        data: {
          id: this.$route.params.id
        }
      })
      this.$store.commit('setMessage', message)
      this.$router.push('/moderate?message=moderated')
    }
  },

  head () {
    return {
      title: this.waifu.name
    }
  }
}
</script>

<style lang='sass' scoped>
@import '~/assets/_smart-grid'

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

  &__author
    margin-right: 10px

  &__action
    &:not(:last-child)
      margin-right: 10px
</style>
