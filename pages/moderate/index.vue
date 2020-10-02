<template lang="pug">
v-container
  v-row
    v-col
      .list__buttons
        v-btn.white--text(
          :loading="fetchLoading",
          :disabled="fetchLoading",
          color="color--primary",
          @click="getModerates",
          dark
        )
          | Reload
          v-icon(right, dark) mdi-download-circle

  v-divider(dark)

  WaifuCards(:waifus="moderates" route-name="moderate")
    template(v-slot:actions)
      v-btn(
        color="color--primary",
        @click="publicShow({ id: waifu._id, imgUrl: waifu.imgUrl, name: waifu.name, description: waifu.description, user: waifu.user })"
      ) Accept

      v-spacer

      v-btn(color="color--deeporange", @click="rejectPost(waifu._id)") Reject

  template(v-if="paginationLength > 1")
    v-pagination(
      dark,
      v-model="pagination",
      :length="paginationLength",
      :total-visible="7",
      :class="this.$vuetify.theme.dark ? 'pagination--dark' : ''"
    )
</template>

<script>
import WaifuCards from '@/components/waifu/WaifuCards'

export default {
  components: {
    WaifuCards
  },

  computed: {
    pagination: {
      get () {
        return this.$store.getters['moderate.store/pagination']
      },
      set (state, payload) {
        if (state !== this.$store.getters['moderate.store/pagination']) {
          this.$store.commit('moderate.store/setPagination', state)
          this.getModerates()
        }
      }
    },

    paginationLength () {
      return this.$store.getters['moderate.store/moderatesLength']
    },

    fetchLoading () {
      return this.$store.getters['loadingStore/getFetchLoading']
    },

    moderates () {
      return this.$store.getters['moderate.store/moderates']
    }
  },

  mounted () {
    const { message } = this.$route.query

    if (this.$store.getters['moderate.store/moderates'].length < 1) {
      this.getModerates()
    }

    if (message) {
      switch (message) {
      case 'moderated':
        this.getModerates()
        break
      }
    }
  },

  methods: {
    getModerates () {
      this.$store.dispatch('moderate.store/getModerates')
    },

    async publicShow (waifuInfo) {
      const message = await this.$axios.$post('/api/moderate/add', waifuInfo)
      this.$store.commit('setMessage', message)

      this.getModerates()
    },

    async rejectPost (id) {
      const message = await this.$axios.$delete('/api/moderate/remove', {
        data: {
          id
        }
      })

      this.$store.commit('setMessage', message)

      this.getModerates()
    }
  },
  head: () => ({
    title: 'Moderate list'
  }),

  middleware: ['moderate.middle']
}
</script>

<style lang="sass" scoped>
@import "~/assets/colors"
@import "~/assets/_smart-grid"

.list
  &__buttons
    display: flex
    justify-content: flex-end
    +md(justify-content, flex-start)

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
</style>
