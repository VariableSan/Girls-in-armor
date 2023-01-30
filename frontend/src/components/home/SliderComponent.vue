<script lang="ts" setup>
import { useCharactersStore } from "@/store/characters-store"
import { useWindowSize } from "@vueuse/core"
import Parallax from "parallax-js"

const characterStore = useCharactersStore()
const { width } = useWindowSize()

/* ==================== reactives START ==================== */
const lightbox = reactive({
  visible: false,
  imgs: characterStore.characters.map(character => character.sliderImage),
  index: 0,
})
/* ==================== reactives END ==================== */

/* ==================== refs START ==================== */
const parallax = ref<Parallax[]>([])
const scene = ref<HTMLElement[]>([])
/* ==================== refs END ==================== */

/* ==================== methods START ==================== */
const onResize = () => {
  if (width.value > 1200) {
    enableParallax()
  } else {
    disableParallax()
  }
}

const onCharacterSelect = (index: number) => {
  lightbox.index = index
  lightbox.visible = true
  disableParallax()
}

const enableParallax = () => {
  parallax.value.forEach(element => {
    element.enable()
  })
}

const disableParallax = () => {
  parallax.value.forEach(element => {
    element.disable()
  })
}

const onLightboxClose = () => {
  enableParallax()
}
/* ==================== methods END ==================== */

/* ==================== hooks START ==================== */
onMounted(() => {
  scene.value.forEach(element => {
    const parallaxInstance = new Parallax(element)
    if (width.value < 1200) {
      parallaxInstance.disable()
    }
    parallax.value.push(parallaxInstance)
  })
})
/* ==================== hooks END ==================== */

/* ==================== watchers START ==================== */
watch(
  () => lightbox.visible,
  val => {
    if (!val) {
      onLightboxClose()
    }
  },
  {
    deep: true,
  },
)
/* ==================== watchers END ==================== */
</script>

<template>
  <section v-resize="onResize" class="section home__slider">
    <v-container>
      <div class="section__describe">
        <h2 class="section__describe__headline">Destiny</h2>
        <p class="section__describe__subhead">
          hover the cursor over the slide and move it to different points of the
          element
        </p>
        <small class="section__describe__additional"
          >click on the element to get more information</small
        >
      </div>
      <div class="home__slider__block">
        <div
          v-for="(character, index) in characterStore.characters"
          :key="character.name"
          class="home__slider__item"
          @click="onCharacterSelect(index)"
        >
          <div ref="scene" class="home__slider__inner" data-hover-only="true">
            <div
              class="home__slider__backdrop"
              :style="{
                backgroundImage: `url(${character.sliderImage})`,
                backgroundPositionX: character.backdropPosition.bgX,
                backgroundPositionY: character.backdropPosition.bgY,
              }"
              data-depth="0.21"
            ></div>
            <div
              class="home__slider__doll"
              :style="{ backgroundImage: `url(${character.dollImage})` }"
              data-calibrate-x="data-calibrate-x"
              data-depth="1"
            ></div>
          </div>
        </div>
      </div>
    </v-container>
  </section>

  <vue-easy-lightbox
    :visible="lightbox.visible"
    :imgs="lightbox.imgs"
    :index="lightbox.index"
    @hide="lightbox.visible = false"
  >
  </vue-easy-lightbox>
</template>

<style lang="scss" scoped>
.home__slider {
  &__block {
    display: flex;
    @screen -md {
      flex-direction: column;
      height: 150vh;
    }
    @screen -sm {
      height: 100vh;
    }
  }
  &__item {
    flex-basis: calc(100% / 6);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 600px;
    transition: flex-basis 1s ease-in-out;
    overflow: hidden;
    cursor: pointer;
    &:not(:last-child) {
      border-right: 3px solid #fff;
      @screen -lg {
        border-right: none;
        border-bottom: 3px solid #fff;
      }
    }
    &:hover {
      flex-basis: 100%;
      .home__slider__backdrop {
        filter: blur(2px);
      }
      .home__slider__doll {
        opacity: 1;
      }
    }
  }
  &__inner {
    position: relative;
    width: 100%;
    height: 100%;
  }
  &__backdrop,
  &__doll {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    background-repeat: no-repeat;
    background-position: center;
  }
  &__backdrop {
    @apply bg-black;
    scale: 1.1;
    background-size: cover;
    transition: filter 0.5s linear;
  }
  &__doll {
    scale: 0.9;
    background-size: contain;
    opacity: 0;
    transition: opacity 0.7s linear;
  }
}
</style>
