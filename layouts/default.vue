<template lang="pug">
   div(:class='theme ? "default-template--dark" : "default-template--light"')
      main-header
      main-drawer
      v-main
         nuxt
      main-snackbar
</template>

<script>
import header from '@/components/header'
import drawer from '@/components/drawer'
import snackbar from '@/components/snackbar'


export default {
   components: {
      mainHeader: header,
      mainDrawer: drawer,
      mainSnackbar: snackbar
   },

   computed: {
      theme() {
         return this.$vuetify.theme.dark
      },

      getRoute() {
         return this.$route.name
      }
   }
}
</script>

<style>

</style>
