<template lang="pug">
	.text-center.ma-2
		v-snackbar(v-model='snackbar' top :color='message.color') {{ message.text }}
			template(v-slot:action='{ attrs }')
				v-btn(
					text
					v-bind='attrs'
					@click='snackbar = false'
				) Close
	
</template>

<script>
export default {
	data: () => ({
		snackbar: false
	}),

	computed: {
		message() {
			return this.$store.getters['getMessage']
		}
	},

	watch: {
		message: {
			handler() {
				this.snackbar = true
			}
		}
	}
}
</script>
