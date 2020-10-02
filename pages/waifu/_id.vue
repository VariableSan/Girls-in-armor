<template lang='pug'>
section.section
  WaifuMore(:waifu="waifu")
    template(v-slot:actions)
      v-btn(
        @click="removeWaifuById(waifu.user)",
        color="color--deeporange",
        v-if="waifu.user._id === user || permission"
      ) remove
</template>

<script>
import WaifuMore from '@/components/waifu/WaifuMore'

export default {
  components: {
    WaifuMore
  },

  async asyncData ({ $axios, params }) {
    try {
      const waifu = await $axios.$get(`/api/waifu/${params.id}`)
      return { waifu }
    } catch (e) {
      // eslint-disable-next-line nuxt/no-this-in-fetch-data
      this.$store.commit('setMessage', e.response.data)
    }
  },

  computed: {
    user () {
      return this.$store.getters['userStore/getUser']
    },

    permission () {
      return this.$store.getters['userStore/getPermission']
    }
  },

  methods: {
    removeWaifuById (user) {
      if (user._id === this.user || this.permission) {
        this.$store.dispatch('waifuStore/removeWaifu', {
          id: this.$route.params.id,
          routeLink: '/list'
        })
      } else {
        this.$store.commit('setMessage', {
          text: 'You are not the owner of this post',
          color: 'color--warning'
        })
      }
    }
  },

  head () {
    return {
      title: this.waifu.name
    }
  }
}
</script>
