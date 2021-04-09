<template lang="pug">
v-menu(offset-y open-on-hover top)
  template(v-slot:activator="{ on, attrs }")
    v-btn(color="primary" dark v-bind="attrs" v-on="on")
      .language-drop__icon
        v-icon mdi-translate
      | {{ selectedItem }}

  v-list(dense)
    v-list-item-group(color="primary" v-model="selectedItemT")
      v-list-item(:key="i" v-for="(item, i) in items")
        v-list-item-content
          v-list-item-title(v-text="item")
</template>

<script>
export default {
  data () {
    return {
      items: ['en', 'ru'],

      selectedItem: this.$i18n.defaultLocale
    }
  },

  computed: {
    selectedItemT: {
      get () {
        return this.selectedItem
      },

      set (value) {
        this.$i18n.setLocale(this.items[value])
        this.selectedItem = this.items[value]
      }
    }
  }
}
</script>

<style lang="scss">
.language-drop {
  &__icon {
    margin-right: 5px;
  }
}
</style>
