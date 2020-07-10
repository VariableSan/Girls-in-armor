export default {
	state: {
		waifuList: []
	},

	getters: {
		getWaifuList(state) {
			return state.waifuList
		}
	},

	mutations: {
		setWaifuList(state, payload) {
			state.waifuList = payload
		}
	},

	actions: {
		async getWaifuListFromServer({ commit }, paginationId) {
			try {
				this.$axios.$get('/api/list')
				.then(response => {
					commit('setWaifuList', response)
				})
				.catch(error => console.log(error))
			} catch (error) {
				console.log(error)
			}
		}
	}
}