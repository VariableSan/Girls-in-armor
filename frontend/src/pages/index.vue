<template>
  <div>
    <app-parallax></app-parallax>
    <app-confrontation></app-confrontation>
    <app-cards></app-cards>
    <app-slider></app-slider>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppParallax from "~/components/home/parallax"
import AppConfrontation from "~/components/home/confrontation"
import AppCards from "~/components/home/cards"
import AppSlider from "~/components/home/slider"
import AppFooter from "~/components/footer"

export default {
  components: {
    AppParallax,
    AppConfrontation,
    AppCards,
    AppSlider,
    AppFooter,
  },

  head() {
    return {
      title: "Home page",
    }
  },

  mounted() {
    const { message } = this.$route.query

    if (message) {
      switch (message) {
        case "already":
          this.$store.commit("setMessage", {
            text: "You need to log out",
            color: "color--warning",
          })
          break
        default:
          break
      }
    }
  },
}
</script>
