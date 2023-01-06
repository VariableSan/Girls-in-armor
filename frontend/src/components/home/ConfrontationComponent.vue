<script lang="ts" setup>
import AlterSaber from "~/assets/images/confrontation/alter-saber.jpg"
import MainSaber from "~/assets/images/confrontation/saber.jpg"

type ConfType = "alter" | "main"
type DescType = "alterDescription" | "mainDescription"

/* ==================== refs START ==================== */
const windowSize = ref({
  width: 0,
})
const breakPoint = ref(576)

const alter = ref()
const main = ref()
const alterDescription = ref()
const mainDescription = ref()

/* ==================== refs END ==================== */

/* ==================== methods START ==================== */

const clickExpand = (params: { refName: any; descName: any }) => {
  const { refName, descName } = params

  if (windowSize.value.width > breakPoint.value) {
    expandDesktop(refName)
  } else {
    expandMobile(descName)
  }
}

const expandDesktop = (refName: ConfType) => {
  const $alter = alter.value
  const $main = main.value
  if (refName === "alter") {
    $alter.style.zIndex = "10"
    $alter.classList.toggle("home__confrontation__item--clip-right")
    $main.classList.remove("home__confrontation__item--clip-left")
    $main.style.zIndex = "1"
    $alter.classList.toggle("home__confrontation__item--clip")
  } else {
    $main.style.zIndex = "10"
    $main.classList.toggle("home__confrontation__item--clip-left")
    $alter.classList.remove("home__confrontation__item--clip-right")
    $alter.style.zIndex = "1"
    $main.classList.toggle("home__confrontation__item--clip")
  }
}

const expandMobile = (descName: DescType) => {
  const $alter = alterDescription.value
  const $main = mainDescription.value
  if (descName === "alterDescription") {
    $alter.classList.add("home__confrontation__description--show")
  } else {
    $main.classList.add("home__confrontation__description--show")
  }
}

const decreaseMobile = (descName: DescType) => {
  if (windowSize.value.width < breakPoint.value) {
    const $alter = alterDescription.value
    const $main = mainDescription.value
    if (descName === "alterDescription") {
      $alter.classList.remove("home__confrontation__description--show")
    } else {
      $main.classList.remove("home__confrontation__description--show")
    }
  }
}

const calculateWindowSize = () => {
  windowSize.value = {
    width: window.innerWidth,
  }
}
/* ==================== methods END ==================== */

/* ==================== hooks START ==================== */
onMounted(() => {
  calculateWindowSize()
  window.addEventListener("resize", calculateWindowSize)
})

onBeforeUnmount(() => {
  window.removeEventListener("resize", calculateWindowSize)
})
/* ==================== hooks END ==================== */
</script>

<template>
  <section class="section home__confrontation">
    <v-container>
      <div class="section__describe">
        <h2 class="section__describe__headline">Confrontation</h2>
        <p class="section__describe__subhead">
          click on the image to get a description
        </p>
        <small class="section__describe__additional">
          to close description click on the
          {{ windowSize.width > breakPoint ? "image again" : "text" }}
        </small>
      </div>
      <div class="home__confrontation__block">
        <div
          ref="alter"
          class="home__confrontation__item home__confrontation__item--left"
        >
          <div class="home__confrontation__image">
            <div
              class="home__confrontation__portrait"
              :style="{ backgroundImage: `url(${AlterSaber})` }"
              @click="
                clickExpand({ refName: 'alter', descName: 'alterDescription' })
              "
            ></div>
          </div>
          <div
            ref="alterDescription"
            class="text-white home__confrontation__description home__confrontation__description--dark"
            @click="decreaseMobile('alterDescription')"
          >
            <h3 class="home__confrontation__title">Alter Saber</h3>
            <p class="home__confrontation__subtitle">
              If you do evil out of a hatred for evil, that rage and hate will
              merely birth new conflict
            </p>
          </div>
        </div>
        <div
          ref="main"
          class="home__confrontation__item home__confrontation__item--right"
        >
          <div class="home__confrontation__image">
            <div
              class="home__confrontation__portrait"
              :style="{ backgroundImage: `url(${MainSaber})` }"
              @click="
                clickExpand({ refName: 'main', descName: 'mainDescription' })
              "
            ></div>
          </div>
          <div
            ref="mainDescription"
            class="home__confrontation__description home__confrontation__description--light"
            @click="decreaseMobile('mainDescription')"
          >
            <h3 class="home__confrontation__title">Saber</h3>
            <p class="text-dark-700 home__confrontation__subtitle">
              Of what worth is a king who fails to protect the powerless
            </p>
          </div>
        </div>
      </div>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
$color--alter: #121212;
$color--main: #e5ecf6;

.home__confrontation {
  &__block {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 80vh;
    box-shadow: 0 9px 11px -5px rgba(0, 0, 0, 0.2),
      0 18px 28px 2px rgba(0, 0, 0, 0.14), 0 7px 34px 6px rgba(0, 0, 0, 0.12);
    @screen -sm {
      box-shadow: none;
    }
  }
  &__item {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    overflow: hidden;
    transition: clip-path 0.5s ease-in-out;
    @screen -sm {
      position: relative;
      flex-direction: column;
      height: 350px;
      margin-bottom: 30px;
    }
    &--left {
      background-color: $color--alter;
      clip-path: polygon(0 0, 50% 0, 50% 100%, 0% 100%);
      @screen -sm {
        clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
      }
    }
    &--right {
      @apply flex-row-reverse text-black;
      background-color: $color--main;
      clip-path: polygon(100% 0, 50% 0, 50% 100%, 100% 100%);
      @screen -sm {
        flex-direction: inherit;
        clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%);
      }
    }
    &--clip {
      .home__confrontation__portrait {
        transform: scale(1.1);
      }
    }
    &--clip-right {
      clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
    }
    &--clip-left {
      clip-path: polygon(100% 0, 0 0, 0 100%, 100% 100%);
    }
  }
  &__image {
    width: 50%;
    height: 100%;
    overflow: hidden;
    @screen -sm {
      width: 100%;
    }
  }
  &__portrait {
    width: 100%;
    height: 100%;
    background-size: cover;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    &:hover {
      transform: scale(1.1);
      @screen -sm {
        transform: scale(1);
      }
    }
  }
  &__description {
    width: 50%;
    padding: 30px;
    @screen -sm {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: all 0.6s ease-in;
    }
    &--show {
      top: 0;
      opacity: 1;
    }
    &--dark {
      background-color: rgba($color--alter, 0.8);
    }
    &--light {
      background-color: rgba($color--main, 0.8);
    }
  }
  &__title {
    margin-bottom: 15px;
    font-size: 24px;
    @screen -sm {
      font-size: 20px;
    }
  }
  &__subtitle {
    font-size: 18px;
    @screen -sm {
      font-size: 16px;
    }
  }
}
</style>
