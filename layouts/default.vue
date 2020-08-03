<template lang="pug">
   div(:class='theme ? "default-template--dark" : "default-template--light"')
      main-header
      main-drawer
      v-main
         nuxt
      main-snackbar
      main-footer
</template>

<script>
import header from '@/components/header'
import footer from '@/components/footer'
import drawer from '@/components/drawer'
import snackbar from '@/components/snackbar'


export default {
   components: {
      mainHeader: header,
      mainFooter: footer,
      mainDrawer: drawer,
      mainSnackbar: snackbar
   },

   computed: {
      theme() {
         return this.$vuetify.theme.dark
      }
   }
}
</script>

<style>

</style>
