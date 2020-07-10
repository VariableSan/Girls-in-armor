<template lang="pug">
   div
      main-header
      main-drawer
      v-main
         nuxt
      main-footer
</template>

<script>
import header from '@/components/header'
import footer from '@/components/footer'
import drawer from '@/components/drawer'


export default {
   components: {
      mainHeader: header,
      mainFooter: footer,
      mainDrawer: drawer
   }
}
</script>

<style>

</style>
