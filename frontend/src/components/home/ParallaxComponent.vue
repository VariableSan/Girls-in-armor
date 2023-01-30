<script lang="ts" setup>
import Clouds from "@/assets/images/clouds2-min.png"
import Jeanne from "@/assets/images/Jeanne darc-min.png"
import Moon from "@/assets/images/moon-min.png"
import Road from "@/assets/images/road-min.png"
import MobileBg from "@/assets/images/mobile-bg.jpg"
import Sky from "@/assets/images/sky-min.png"
import { useWindowSize } from "@vueuse/core"

const { width } = useWindowSize()

/* ==================== refs START ==================== */
const moon = ref<HTMLElement[]>()
const clouds = ref<HTMLElement[]>()
const sky = ref<HTMLElement[]>()
/* ==================== refs END ==================== */

/* ==================== constants START ==================== */
const images = <Record<string, string>[]>[
  {
    src: Clouds,
    className: "clouds",
  },
  {
    src: Jeanne,
    className: "jeanne",
  },
  {
    src: Moon,
    className: "moon",
  },
  {
    src: Road,
    className: "road",
  },
  {
    src: Sky,
    bg: true,
    className: "sky",
  },
]
/* ==================== constants END ==================== */

/* ==================== methods START ==================== */
const parallax = () => {
  const animated = [moon.value, clouds.value, sky.value]
  const scrollValue = window.scrollY
  const windowHeight = window.innerHeight

  if (scrollValue > windowHeight) {
    animated.forEach(el => {
      let element: HTMLElement
      if (el && el[0]) {
        element = el[0]
      } else {
        return
      }
      if (element?.style) {
        element.style.animationPlayState = "paused"
      }
    })
  } else {
    animated.forEach(el => {
      let element: HTMLElement
      if (el && el[0]) {
        element = el[0]
      } else return
      if (element?.style) {
        element.style.animationPlayState = "running"
      }
    })
  }
}

const getClasses = (image: Record<string, string>) => ({
  "home__image--bg": image.bg,
  "home__image--el": !image.bg,
  ["home__" + image.className]: true,
})
/* ==================== methods END ==================== */

/* ==================== hooks START ==================== */
onMounted(() => {
  if (width.value > 1200) {
    window.addEventListener("scroll", parallax)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener("scroll", parallax)
})
/* ==================== hooks END ==================== */
</script>

<template>
  <section class="home__hero">
    <img
      v-for="(image, index) in images"
      :key="index"
      :ref="image.className"
      class="home__image"
      :class="getClasses(image)"
      :src="image.src"
    />
    <v-img class="home__mobile-image" :src="MobileBg"></v-img>
  </section>
</template>

<style lang="scss" scoped>
@keyframes sky {
  0% {
    top: -5px;
  }
  100% {
    top: -100px;
  }
}
@keyframes clouds {
  0% {
    left: -10%;
  }
  100% {
    left: 10%;
  }
}
@keyframes moon {
  0% {
    top: -90px;
  }
  100% {
    top: 0;
  }
}

.home {
  &__hero {
    @apply relative overflow-hidden;
    @screen xl {
      @apply min-h-[100vh];
    }
    @screen -xl {
      @apply min-h-[90vh];
    }
    @screen -lg {
      @apply min-h-[70vh];
    }
    @screen -md {
      @apply min-h-[50vh];
    }
    @screen -sm {
      @apply min-h-none;
    }
    &:before {
      @apply h-[25%] bottom-0 left-0 w-[100%] z-50 content-[''] absolute;
      background: linear-gradient(to top, #000, transparent);
    }
  }
  &__image {
    @apply top-0 left-0 w-[100%] absolute;
    @screen -sm {
      @apply hidden;
    }
    &--bg {
      @apply z-0;
    }
    &--el {
      @apply z-1;
    }
  }
  &__sky {
    @apply top-[-5px] w-[100%];
    @screen xl {
      animation: sky 15s ease-in-out alternate infinite;
    }
  }
  &__clouds {
    top: -30%;
    z-index: 20;
    left: -10%;
    width: 100%;
    transform: scale(1.2);
    @screen -xl {
      top: 0;
      left: 0;
      transform: scale(1);
    }
    @screen xl {
      animation: clouds 10s ease-in-out alternate infinite;
    }
  }
  &__road {
    @apply top-0 left-0;
    z-index: 30;
    transform: scale(1.05);
  }
  &__moon {
    top: -90px;
    z-index: 10;
    @screen -xl {
      top: 0;
    }
    @screen xl {
      animation: moon 10s ease-in-out alternate infinite;
    }
  }
  &__jeanne {
    z-index: 40;
  }
  &__mobile-image {
    @apply hidden;
    @screen -sm {
      @apply block;
    }
  }
}
</style>
