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
			const waifus = await this.$axios.$get('/api/list')
			
			commit('setWaifuList', waifus)
		} 
		catch (e) {
			commit('setError', e, { root: true })
		}
	},

	async getWaifuLengthFromServer({ commit }) {
		commit('loadingStore/setFetchLoading', true, {root: true})
		try {
			const length = await this.$axios.$get('/api/list/waifusLength')

			commit('setWaifuLength', length)
		}
		catch (e) {
			console.error(e)
		}
		finally {
			commit('loadingStore/setFetchLoading', false, {root: true})
		}
	}
}