export default function({ store, redirect }) {
	if (!store.getters['isAuth']) {
		redirect('/auth/login?message=login')
	}
}