export default function({ store, redirect }) {
	if (!store.getters['isAuth']) {
		redirect('/?login=false')
	}
}