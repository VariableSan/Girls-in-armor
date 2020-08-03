export const state = () => ({
	error: null
})

export const getters = {
	getError: (state) => state.error
}

export const mutations = {
	setError(state, { message }) {
		state.error = message
	}
}