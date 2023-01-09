<script lang="ts" setup>
import { useCharactersStore } from "@/store/characters-store"

const charactersStore = useCharactersStore()

const characters = computed(() => {
  return charactersStore.characters
})

const onClick = (event: MouseEvent, elType: "image" | "quote") => {
  const target = event.currentTarget as HTMLElement
  let elClass = ""
  if (elType === "image") {
    elClass = "home__character-cards__image--active"
  } else {
    elClass = "home__character-cards__quote--active"
  }
  !target.classList.contains(elClass)
    ? target.classList.add(elClass)
    : target.classList.remove(elClass)
}
</script>

<template>
  <section class="section home__character-cards">
    <v-container>
      <div class="section__describe">
        <h2 class="section__describe__headline">Character cards</h2>
        <p class="section__describe__subhead">
          click on an element (to hide an image or quote, click on any other
          element)
        </p>
      </div>
      <v-row>
        <v-col
          v-for="character in characters"
          :key="character.name"
          cols="12"
          lg="4"
          md="6"
          sm="6"
        >
          <v-card
            class="border border-solid border-black flex border-opacity-50 h-[400px] absolute overflow-hidden justify-center items-center dark:border-white"
          >
            <div
              class="home__character-cards__image"
              :style="{ backgroundImage: `url(${character.image})` }"
              @click="onClick($event, 'image')"
            ></div>
            <v-card-title
              class="home__character-cards__quote"
              @click="onClick($event, 'quote')"
            >
              <h4 class="home__character-cards__title">
                {{ character.name }}
              </h4>
              <q>{{ character.quote }}</q>
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<style lang="scss" scoped>
.home {
  &__character-cards {
    &__image,
    &__quote {
      @apply bg-white cursor-pointer h-[100%] w-[100%] absolute dark:bg-black;
      transition: clip-path 0.4s linear;
    }
    &__image {
      @apply bg-cover bg-center bg-no-repeat;
      clip-path: polygon(0 0, 100% 0, 100% 0, 0% 100%);
      &--active {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        & ~ div {
          clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0% 100%);
        }
      }
    }
    &__quote {
      @apply flex flex-col justify-center whitespace-normal;
      clip-path: polygon(0 100%, 100% 0, 100% 100%, 0% 100%);
      word-break: normal;
      &--active {
        clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
      }
    }
    &__title {
      @apply border-b border-solid border-black mb-4 dark:border-white;
    }
  }
}
</style>
