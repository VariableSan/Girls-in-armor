<template lang="pug">
v-navigation-drawer.drawer__main(app dark temporary v-model='drawer')
  v-list(dense nav)
    v-list-item(
      :key='index'
      :to='link.url'
      link
      v-for='(link, index) in getLinks'
    )
      v-list-item-icon.drawer__icon
        v-icon {{ link.icon }}
      v-list-item-content
        v-list-item-title {{ link.title }}
</template>

<script>
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawerStore.drawer
      },
      set(state) {
        if (state !== this.$store.state.drawerStore.drawer) {
          this.$store.commit('drawerStore/setDrawer')
        }
      }
    },

    getLinks() {
      if (this.user) {
        if (this.permission) {
          return this.$store.getters['linkStore/getLinks'].filter(
            link => !link.onlyNoAuth
          )
        }

        return this.$store.getters['linkStore/getLinks'].filter(
          link => !link.onlyNoAuth && !link.onlyAdmin
        )
      } else {
        return this.$store.getters['linkStore/getLinks'].filter(
          link => !link.authRequire && !link.onlyAdmin
        )
      }
    },

    user() {
      return this.$store.getters['userStore/getUser']
    },

    permission() {
      return this.$store.getters['userStore/getPermission']
    }
  }
}
</script>

<style lang="sass" scoped>
.drawer
  &__icon
    margin-right: 30px
  &__main
    z-index: 1000
</style>
