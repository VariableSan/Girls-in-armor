<template lang="pug">
	v-container
		v-row
			v-col(:cols='6')
				v-form(ref='form' lazy-validation='')
					v-text-field(
						v-model='name'
						:counter='10'
						:rules='nameRules'
						label='Name'
						required
					)
					v-text-field(
						v-model='imgUrl'
						label='Image URL'
						required
					)
			v-col(:cols='6')
				v-img(dark :src='imgUrl' :lazy-src='imgUrl')
</template>

<script>
export default {
	data: () => ({
		name: '',
		imgUrl: '',
		description: '',

		nameRules: []
	}),
	
	methods: {
		saveWaifu() {
			this.$axios.$post('/api/add', {
				name, imgUrl, description
			})
			.then(response => {
				if (response) {
					this.$router.push('/')
				}
				else {
					console.log(response)
				}
			})
		}
	}
}
</script>