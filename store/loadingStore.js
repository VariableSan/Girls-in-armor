export const state = () => ({
  loading: false,
  fetchLoading: false
})

export const getters = {
  getLoading (state) {
    return state.loading
  },

  getFetchLoading (state) {
    return state.fetchLoading
  }
}

export const mutations = {
  setLoading (state, status) {
    state.loading = status
  },

  setFetchLoading (state, status) {
    state.fetchLoading = status
  }
}
