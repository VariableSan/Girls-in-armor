<template lang="pug">
v-container
  v-row
    v-col
      .list__buttons
        v-btn.white--text(
          :disabled='fetchLoading'
          :loading='fetchLoading'
          @click='getWaifus'
          color='color--primary'
          dark
        ) Update
          v-icon(dark right) mdi-download-circle

  v-divider(dark)

  WaifuCards(:waifus='waifus' route-name='waifu')
    template(v-slot:actions='{ waifu }')
      v-btn(
        @click='removeCardById(waifu._id, waifu.user)'
        color='color--deeporange'
        v-if='waifu.user === user || permission'
      ) Remove

  template(v-if='paginationLength > 1')
    v-pagination(
      :class='this.$vuetify.theme.dark ? "pagination--dark" : ""'
      :length='paginationLength'
      :total-visible='7'
      dark
      v-model='pagination'
    )
</template>

<script>
import WaifuCards from '@/components/waifu/WaifuCards'

export default {
  components: {
    WaifuCards
  },

  computed: {
    waifus() {
      return this.$store.getters['waifuStore/getWaifuList']
    },

    pagination: {
      get() {
        return this.$store.getters['waifuStore/getPagination']
      },
      set(state, payload) {
        if (state !== this.$store.getters['waifuStore/getPagination']) {
          this.$store.commit('waifuStore/setPagination', state)
          this.getWaifus()
        }
      }
    },

    paginationLength() {
      return this.$store.getters['waifuStore/getWaifusLength']
    },

    fetchLoading() {
      return this.$store.getters['loadingStore/getFetchLoading']
    },

    user() {
      return this.$store.getters['userStore/getUser']
    },

    permission() {
      return this.$store.getters['userStore/getPermission']
    }
  },

  watch: {
    paginationLength() {}
  },

  mounted() {
    const { message } = this.$route.query

    if (this.$store.getters['waifuStore/getWaifuList'].length < 1) {
      this.getWaifus()
    }

    if (message) {
      switch (message) {
        case 'permission':
          this.$store.commit('setMessage', {
            text: 'You do not have administrator access rights',
            color: 'color--warning'
          })
          break
      }
    }
  },

  methods: {
    getWaifus() {
      this.$store.dispatch('waifuStore/getWaifuListFromServer')
    },

    removeCardById(id, user) {
      if (this.user === user || this.permission) {
        this.$store.dispatch('waifuStore/removeWaifu', { id })
      }
    }
  },
  head() {
    return {
      title: 'List'
    }
  }
}
</script>

<style lang="sass" scoped>
.list
  &__buttons
    display: flex
    justify-content: flex-end
    +md(justify-content, flex-start)
</style>
