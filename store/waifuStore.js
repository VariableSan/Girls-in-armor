export const state = () => ({
	waifuList: [],
	pagination: 1,
	waifusLength: 0
})

export const getters = {
	getWaifuList(state) {
		return state.waifuList
	},

	getPagination(state) {
		return state.pagination
	},

	getWaifusLength(state) {
		return state.waifusLength
	}
}

export const mutations = {
	setWaifuList(state, payload) {
		state.waifuList = payload
	},

	setPagination(state, payload) {
		state.pagination = payload
	},

	setWaifuLength(state, payload) {
		state.waifusLength = Math.floor(payload / 15)
	}
}

export const actions = {
	async getWaifuListFromServer({ commit }, paginationId) {
		try {
			commit('loadingStore/setFetchLoading', true, {root: true})
			const waifus = await this.$axios.$get('/api/list')
			
			commit('setWaifuList', waifus)
		} 
		catch (e) {
			console.error(e)
		}
		finally {
			commit('loadingStore/setFetchLoading', false, {root: true})

		}
	},

	async getWaifuLengthFromServer({ commit }) {
		try {
			commit('loadingStore/setFetchLoading', true, {root: true})
			const length = await this.$axios.$get('/api/list/waifusLength')

			commit('setWaifuLength', length)
		}
		catch (e) {
			console.error(e)
		}
		finally {
			commit('loadingStore/setFetchLoading', false, {root: true})
		}
	},

	async saveWaifu({ commit }, character) {
		try {
			commit('loadingStore/setLoading', true, { root: true })

			const message = await this.$axios.$post('/api/add', character)

			commit('setMessage', message, { root: true })
			
			this.$router.push('/list?added=true')
		}
		catch (error) {
			console.error(error)
		}
		finally {
			commit('loadingStore/setLoading', false, { root: true })
		}
	}
}