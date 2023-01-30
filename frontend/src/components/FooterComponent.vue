<template>
  <v-footer class="footer" padless>
    <v-container>
      <v-row>
        <v-col cols="12" sm="6">
          <v-row>
            <v-col cols="12" sm="6">
              <p class="footer__subtitle">Here is my Github page:</p>
              <a
                class="footer__link"
                href="https://github.com/VariableSan"
                target="_blank"
              >
                <v-img
                  class="rounded-full h-24 transition-all ease-linear w-24 hover:(transform scale-110) "
                  src="https://avatars.githubusercontent.com/u/46599257?v=4"
                ></v-img>
              </a>
            </v-col>
            <v-col cols="12" sm="6">
              <p class="footer__subtitle">Afterwords:</p>
              <h3 class="footer__title">
                Hello there! My name is Nursultan, I hope you liked the site
                with girls in armor
              </h3>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6">
          <v-row>
            <v-col cols="6">
              <p class="footer__subtitle">Links:</p>
              <a
                class="footer__link"
                href="https://www.flaticon.com/authors/smashicons"
                target="_blank"
              >
                Smashicons
              </a>
              <a
                class="footer__link"
                href="https://wall.alphacoders.com/"
                target="_blank"
              >
                Wallpapers
              </a>
              <a
                class="footer__link"
                href="https://fategrandorder.fandom.com/wiki/Fate/Grand_Order_Wikia"
                target="_blank"
              >
                Fate Wiki
              </a>
            </v-col>
            <v-col cols="6">
              <p class="footer__subtitle">Other projects:</p>
              <a
                class="footer__link"
                href="https://lone-social.tech/"
                target="_blank"
              >
                Portfolio
              </a>
              <a
                class="footer__link"
                href="https://judgementhc.github.io/Girls-in-armor/"
                target="_blank"
              >
                Girls in armor v1
              </a>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style lang="scss" scoped>
.footer {
  margin-top: 40px;
  &__link {
    display: block;
    max-width: max-content;
    &:hover {
      .footer__github-link {
        scale: 1.1;
      }
    }
  }
  &__title {
    margin-bottom: 15px;
    @screen -md {
      margin-bottom: 0;
    }
  }
  &__subtitle {
    margin-bottom: 15px;
  }
}
</style>
