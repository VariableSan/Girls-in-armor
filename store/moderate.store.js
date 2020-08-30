export const state = () => ({
	pagination: 1,
	moderates: [],
	moderatesLength: 0
})

export const getters = {
	pagination: (state) => state.pagination,
	moderates: (state) => state.moderates
}

export const mutations = {
	setPagination(state, pagination) {
		state.pagination = pagination
	},

	setModerates(state, moderates) {
		state.moderates = moderates
	},

	setModeratesLength(state, length) {
		state.moderatesLength = length
	}
}

export const actions = {
	async getModeratesLength({ commit }) {
		try {
			commit('loadingStore/setFetchLoading', true, {
				root: true
			})

			const length = await this.$axios.$get('/api/moderate/length')

			commit('setModeratesLength', length)
		} 
		catch (error) {
			console.error(error)
		}
		finally {
			commit('loadingStore/setFetchLoading', false, {
				root: true
			})
		}
	},

	async getModerates({ commit }) {
		try {
			commit('loadingStore/setFetchLoading', true, {
				root: true
			})

			const moderates = await this.$axios.$get('/api/moderate/list')

			commit('setModerates', moderates)
		}
		catch (error) {
			console.error(error)	
		}
		finally {
			commit('loadingStore/setFetchLoading', false, {
				root: true
			})
		}
	}
}