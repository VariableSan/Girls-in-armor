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
	async getModerates({ commit, state }) {
		try {
			commit('loadingStore/setFetchLoading', true, {
				root: true
			})

			const moderates = await this.$axios.$post('/api/moderate/list', {
				page: state.pagination
			})

			commit('setModerates', moderates.docs)
			commit('setModeratesLength', moderates.totalPages)
		}
		catch (e) {
			console.error(e.response)

			commit('setMessage', e.response.data, {
				root: true
			})
		}
		finally {
			commit('loadingStore/setFetchLoading', false, {
				root: true
			})
		}
	}
}