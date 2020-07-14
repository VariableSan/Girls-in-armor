export const state = () => ({
	waifuList: [],
	pagination: 1
})

export const mutations = {
	setWaifuList(state, payload) {
		state.waifuList = payload
	},

	setPagination(state, payload) {
		state.pagination = payload
	}
}

export const actions = {
	async getWaifuListFromServer({ commit }, paginationId) {
		try {
			this.$axios.$get('/api/list')
			.then(response => {
				commit('setWaifuList', response)
			})
			.catch(error => console.log(error))
		} 
		
		catch (error) {
			console.log(error)
		}
	}
}