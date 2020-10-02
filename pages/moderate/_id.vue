<template lang='pug'>
section.section
  WaifuMore(:waifu="waifu")
    template(v-slot:actions)
      v-btn.moderate__btn(
        color="color--primary",
        @click="publicShow({ id: waifu._id, imgUrl: waifu.imgUrl, name: waifu.name, description: waifu.description, user: waifu.user })"
      ) Accept

      v-btn.waifu-id__action(color="color--deeporange", @click="rejectPost") Reject
</template>

<style lang="sass" scoped>
.moderate
  &__btn
    &:not(:last-child)
      margin-right: 10px
</style>

<script>
import WaifuMore from '@/components/waifu/WaifuMore'

export default {
  components: {
    WaifuMore
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
