<script setup lang="ts"></script>

<template>
  <div class="home-page">
    <ParallaxComponent></ParallaxComponent>
    <ConfrontationComponent></ConfrontationComponent>
    <CardsComponent></CardsComponent>
    <SliderComponent></SliderComponent>
    <FooterComponent></FooterComponent>
  </div>
</template>

<style lang="scss">
.home-page {
  .section {
    @apply pt-16 -sm:pt-8 -md:pt-10;
  }

  .section__describe {
    @apply flex flex-col text-center mb-8 justify-center;
    &__headline {
      @apply mb-4 text-4xl relative -sm:text-2xl;

      &:after,
      &:before {
        @apply bg-dark-700 dark:bg-white;
        content: "";
        position: absolute;
        top: 50%;
        width: 30px;
        height: 3px;
      }
      &:after {
        right: 0;
      }
      &:before {
        left: 0;
      }
    }
    &__subhead {
      @apply text-xl opacity-50 -sm:text-lg;
    }
    &__additional {
      @apply mt-1 opacity-30;
    }
  }
}
</style>
