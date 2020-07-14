<template lang="pug">
   div(:class='theme ? "default-template--dark" : "default-template--light"')
      main-header
      main-drawer
      v-main
         nuxt
      main-footer
</template>

<script>
import header from '@/components/waifu-page-header'
import footer from '@/components/footer'
import drawer from '@/components/drawer'


export default {
   components: {
      mainHeader: header,
      mainFooter: footer,
      mainDrawer: drawer
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
