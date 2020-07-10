import Vue from 'vue'
import Vuex from 'vuex'

import waifuStore from './modules/waifuStore'
import linkStore from './modules/linkStore'
import drawer from './modules/drawer'

Vue.use(Vuex)

const store = () => new Vuex.Store({
	modules: {
		waifuStore,
		linkStore,
		drawer
	}
})

export default store