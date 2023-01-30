import { Character } from "@/types/common"
import { defineStore } from "pinia"
import jeanne from "~/assets/images/cards/jeanne.jpg"
import mordred from "~/assets/images/cards/mordred.jpg"
import nagao from "~/assets/images/cards/nagao.jpg"
import okita from "~/assets/images/cards/okita.jpg"
import scathach from "~/assets/images/cards/scathach.jpg"
import tomoe from "~/assets/images/cards/tomoe.jpg"
import jeanneDoll from "~/assets/images/slider/jeanne-doll.png"
import jeanneSlider from "~/assets/images/slider/jeanne-slider.jpg"
import mordredDoll from "~/assets/images/slider/mordred-doll.png"
import mordredSlider from "~/assets/images/slider/mordred-slider.jpg"
import nagaoDoll from "~/assets/images/slider/nagao-doll.png"
import nagaoSlider from "~/assets/images/slider/nagao-slider.jpg"
import okitaDoll from "~/assets/images/slider/okita-doll.png"
import okitaSlider from "~/assets/images/slider/okita-slider.jpg"
import scathachDoll from "~/assets/images/slider/scathach-doll.png"
import scathachSlider from "~/assets/images/slider/scathach-slider.jpg"
import tomoeDoll from "~/assets/images/slider/tomoe-doll.png"
import tomoeSlider from "~/assets/images/slider/tomoe-slider.jpg"

export const useCharactersStore = defineStore("characters", () => {
  const characters = ref<Character[]>([
    {
      name: "Mordred",
      quote:
        "I’ll do whatever I want, when I want and that’s that. But I’ll own up to my actions",
      image: mordred,
      backdropPosition: {
        bgX: "60%",
        bgY: "0",
      },
      sliderImage: mordredSlider,
      dollImage: mordredDoll,
    },
    {
      name: "Okita Souji",
      quote:
        "Engulfed in a warm light that narrowly lies ahead, I did not want to do something like looking up at the skies",
      image: okita,
      backdropPosition: {
        bgX: "50%",
        bgY: "0",
      },
      sliderImage: okitaSlider,
      dollImage: okitaDoll,
    },
    {
      name: "Jeanne d'Arc",
      quote: "Your life to come is bound to make you smile",
      image: jeanne,
      backdropPosition: {
        bgX: "65%",
        bgY: "0",
      },
      sliderImage: jeanneSlider,
      dollImage: jeanneDoll,
    },
    {
      name: "Scathach",
      quote:
        'In the end, this body was wet with the blood of many victims, and became immortal. The territory under my rule, the "Land of Shadows", was ultimately forced out to the Outside of the World, and I ended up being promoted into an existence no different than that of a Divine Spirit',
      image: scathach,
      backdropPosition: {
        bgX: "56%",
        bgY: "0",
      },
      sliderImage: scathachSlider,
      dollImage: scathachDoll,
    },
    {
      name: "Nagao Kagetora",
      quote:
        "Fortune to the heavens, Armour upon my chest, Feats from my steps",
      image: nagao,
      backdropPosition: {
        bgX: "60%",
        bgY: "0",
      },
      sliderImage: nagaoSlider,
      dollImage: nagaoDoll,
    },
    {
      name: "Tomoe Gozen",
      quote:
        "For you to take me at every opportunity. If I am being useful, I am happy. I will strive to do my best",
      image: tomoe,
      backdropPosition: {
        bgX: "70%",
        bgY: "20px",
      },
      sliderImage: tomoeSlider,
      dollImage: tomoeDoll,
    },
  ])

  return {
    characters,
  }
})
