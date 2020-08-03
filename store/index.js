export const state = () => ({
	message: ''
})

export const getters = {
	getMessage: (state) => state.message
}

export const mutations = {
	setMessage(state, message) {
		state.message = message
	}
}