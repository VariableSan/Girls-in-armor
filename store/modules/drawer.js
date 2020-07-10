export default {
	state: {
		drawer: false
	},

	getters: {
		getDrawer(state) {
			return state.drawer
		}
	},

	mutations: {
		setDrawer(state) {
			state.drawer = !state.drawer
		}
	}
}