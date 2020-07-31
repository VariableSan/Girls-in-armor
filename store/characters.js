export const state = () => ({
	characters: [
		{
			name: 'Mordred',
			quote: 'I’ll do whatever I want, when I want and that’s that. But I’ll own up to my actions',
			image: 'mordred',
			backdropPosition: {
				bgX: '50%',
				bgY: '0'
			}
		}, {
			name: 'Okita Souji',
			quote: 'Engulfed in a warm light that narrowly lies ahead, I did not want to do something like looking up at the skies',
			image: 'okita',
			backdropPosition: {
				bgX: '60%',
				bgY: '0'
			}
		}, {
			name: "Jeanne d'Arc",
			quote: 'Your life to come is bound to make you smile',
			image: 'jeanne',
			backdropPosition: {
				bgX: '65%',
				bgY: '0'
			}
		}, {
			name: 'Scathach',
			quote: 'In the end, this body was wet with the blood of many victims, and became immortal. The territory under my rule, the "Land of Shadows", was ultimately forced out to the Outside of the World, and I ended up being promoted into an existence no different than that of a Divine Spirit',
			image: 'scathach',
			backdropPosition: {
				bgX: '56%',
				bgY: '0'
			}
		}, {
			name: 'Nagao Kagetora',
			quote: 'Fortune to the heavens, Armour upon my chest, Feats from my steps!',
			image: 'nagao',
			backdropPosition: {
				bgX: '66%',
				bgY: '0'
			}
		}, {
			name: 'Tomoe Gozen',
			quote: 'For you to take me at every opportunity. If I am being useful, I am happy. I will strive to do my best',
			image: 'tomoe',
			backdropPosition: {
				bgX: '70%',
				bgY: '60px'
			}
		}
	]
})

export const getters = {
	getCharacters(state) {
		return state.characters
	}
}