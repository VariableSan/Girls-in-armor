export const state = () => ({
  drawer: false
})

export const mutations = {
  setDrawer (state) {
    state.drawer = !state.drawer
  }
}
