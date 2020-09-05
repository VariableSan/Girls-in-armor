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

	setWaifusLength(state, length) {
		state.waifusLength = length
	}
}

export const actions = {
	async getWaifuListFromServer({ commit, state }) {
		try {
			commit('loadingStore/setFetchLoading', true, {root: true})
			const waifus = await this.$axios.$post('/api/list', {
				page: state.pagination,
				limit: 12
			})
			
			commit('setWaifuList', waifus.docs)
			commit('setWaifusLength', waifus.totalPages)
		} 
		catch (e) {
			console.error(e.response)
		
			this.$store.commit('setMessage', e.response.data)
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
			
			this.$router.push('/list')
		}
		catch (e) {
			console.error(e.response)

			this.$store.commit('setMessage', e.response.data)
		}
		finally {
			commit('loadingStore/setLoading', false, { root: true })
		}
	}
}