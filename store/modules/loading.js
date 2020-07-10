export default {
	state: {
		loading: false
	},

	getters: {
		getLoading(state) {
			return state.loading
		}
	},

	mutations: {
		setLoading(state, status) {
			state.loading = status
		}
	}
}