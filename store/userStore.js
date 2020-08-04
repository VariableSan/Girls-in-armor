import Cookie from 'cookie'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

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
		Cookies.set('jwt-token', token)
	},

	logout(state) {
		this.$axios.setToken(false)
		state.token = null
		state.user = null
		Cookies.remove('jwt-token')
	}
}

export const actions = {
	async login({ commit }, userForm) {
		try {
			const { token, user, text, color } = await this.$axios.$post('/api/auth/login', userForm)

			if (token && user) {
				commit('setUser', user)
				commit('setToken', token)

				this.$router.push('/')
			}

			commit('setMessage', {
				text,
				color
			}, { root: true })
		} 
		catch (e) {
			console.error(error)
		}
	},

	async createUser({ commit }, userForm) {
		try {
			const { text, color } = await this.$axios.$post('/api/auth/create', userForm)

			commit('setMessage', { text, color }, { root: true })
		} 
		catch (e) {
			console.error(e)
		}
	},

	logout({ commit }) {
		commit('logout')
		commit('setMessage', {
			text: 'You are successfully logged out',
			color: 'color--success'
		}, { root: true })

		this.$router.push('/auth/login')
	},

	autoLogin({ commit, dispatch }) {
		const cookieStr = process.browser ?
			document.cookie :
			this.app.context.req.headers.cookie

		const cookies = Cookie.parse(cookieStr || '') || {}
		const token = cookies['jwt-token']

		if (isJWTValid(token)) {
			commit('setToken', token)
			commit('setUser', decodeJWT(token).userId)
		}
		else {
			dispatch('logout')
		}
	}
}

function isJWTValid(token) {
	if (!token) {
		return false
	}

	const jwtData = decodeJWT(token)
	const expires = jwtData.exp || 0

	return (new Date().getTime() / 1000) < expires
}

function decodeJWT(token) {
	return jwtDecode(token) || {}
}
