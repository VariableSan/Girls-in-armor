<template lang='pug'>
	v-container
		fieldset
			legend {{waifu.name}}
</template>

<script>
export default {
	async asyncData({ $axios, params }) {
		const waifu = await $axios.$get(`/api/waifu/${params.id}`)
		return { waifu }
	}
}
</script>

<style>

</style>