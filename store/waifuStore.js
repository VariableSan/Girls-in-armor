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
	},

	async removeWaifu({ commit, dispatch }, id) {
		try {
			const userConfirm = await this.$swal({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!',
				scrollbarPadding: false
			})

			if (!userConfirm.value) {
				return
			}
			
			commit('loadingStore/setLoading', true, {
				root: true
			})
			
			const message = await this.$axios.$delete('/api/list/remove', {
				data: {
					id
				}
			})

			dispatch('getWaifuListFromServer')

			commit('setMessage', message, {
				root: true
			})
		} 
		catch (e) {
			console.error(e)
			
			this.$store.commit('setMessage', e.response.data)
		}
		finally {
			commit('loadingStore/setLoading', false, {
				root: true
			})
		}
	}
}