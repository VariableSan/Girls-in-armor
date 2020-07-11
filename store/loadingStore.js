export const state = () => ({
	loading: false
})

export const mutations = {
	setLoading(state, status) {
		state.loading = status
	}
}
