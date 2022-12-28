<template lang="pug">
.text-center.ma-2
  v-snackbar(:color='message.color' top v-model='snackbar') {{ message.text }}
    template(v-slot:action='{ attrs }')
      v-btn(@click='snackbar = false' text v-bind='attrs') Close
</template>

<script>
export default {
  data: () => ({
    snackbar: false
  }),

  computed: {
    message() {
      return this.$store.getters['getMessage']
    }
  },

  watch: {
    message: {
      handler() {
        this.snackbar = true
      }
    }
  }
}
</script>
