export default {
	state: {
		links: [
			{
				title: 'Home',
				url: '/'
			},
			{
				title: 'Waifu list',
				url: '/list'
			},
			{
				title: 'Add waifu',
				url: '/add'
			}
		]
	},

	getters: {
		getLinks(state) {
			return state.links
		}
	}
}