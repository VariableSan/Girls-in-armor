export const state = () => ({
	token: null
})

export const getters = {
	getUser: (state) => state.token,

	isAuthorize: (state) => Boolean(state.token)
}

export const mutations = {
	setUser(state, payload) {
		state.token = payload
	}
}

export const actions = {
	async login({ commit }, userForm) {
		try {
			const { token } = await this.$axios.$post('/api/auth/login', userForm)

			commit('setUser', token)
		} 
		catch (e) {
			commit('setError', e, { root: true })
		}
	}
}