import { createUser } from "~/server/controllers/auth.controller"

export const state = () => ({
	token: null,
	user: null
})

export const getters = {
	getUser: (state) => state.user,

	isAuth: (state) => Boolean(state.user),

	getToken: (state) => state.token
}

export const mutations = {
	setUser(state, payload) {
		state.user = payload
	},

	setToken(state, token) {
		this.$axios.setToken(token, 'Bearer')
		state.token = token
	},

	logout(state) {
		this.$axios.setToken(false)
		state.token = null
	}
}

export const actions = {
	async login({ commit }, userForm) {
		try {
			const { token, user } = await this.$axios.$post('/api/auth/login', userForm)

			commit('setUser', user)
			commit('setToken', token)
		} 
		catch ({ message }) {
			commit('setError', message, { root: true })
		}
	},

	async createUser({ commit }, userForm) {
		try {
			const { message } = await this.$axios.$post('/api/auth/create', userForm)
			
			commit('setMessage', message, { root: true })

			this.$router.push('/login')
		} 
		catch (e) {
			commit('setError', e, { root: true })
		}
	}
}