<template lang="pug">
v-footer.footer(dark padless)
  //- Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
  v-container(dark)
    v-row
      v-col(cols='12' sm='6')
        v-row
          v-col(cols='12' sm='6')
            p.footer__subtitle Here is my Github page:
            a.footer__link(
              href='https://github.com/VariableSan'
              target='_blank'
            )
              v-img.footer__github-link(
                src='https://avatars0.githubusercontent.com/u/46599257?s=460&u=50f65583bb489bcd6d322c85c5721577288b3c73&v=4'
              )
          v-col(cols='12' sm='6')
            p.footer__subtitle Afterwords:
            h3.footer__title Hello there! My name is Nursultan, I hope you liked the site with girls in armor

      v-col(cols='12' sm='6')
        v-row
          v-col(cols='6')
            p.footer__subtitle Links:
            a.footer__link(
              href='https://www.flaticon.com/authors/smashicons'
              target='_blank'
            ) Smashicons
            a.footer__link(
              href='https://wall.alphacoders.com/'
              target='_blank'
            ) Wallpapers
            a.footer__link(
              href='https://fategrandorder.fandom.com/wiki/Fate/Grand_Order_Wikia'
              target='_blank'
            ) Fate Wiki
          v-col(cols='6')
            p.footer__subtitle Other projects:
            a.footer__link(
              href='https://lone-social.tech/'
              target='_blank'
            ) Portfolio
            a.footer__link(
              href='https://judgementhc.github.io/Girls-in-armor/'
              target='_blank'
            ) Girls in armor v1
</template>

<style lang="sass" scoped>
@import '~/assets/_smart-grid'

.footer
  margin-top: 40px

  &__link
    display: block
    max-width: max-content
    color: #fff
    &:hover
      .footer__github-link
        scale: 1.1

  &__github-link
    max-width: 100px
    height: 100px
    border-radius: 50%
    transition: scale 0.1s linear

  &__title
    margin-bottom: 15px
    +md-block()
      margin-bottom: 0

  &__subtitle
    margin-bottom: 15px
</style>
