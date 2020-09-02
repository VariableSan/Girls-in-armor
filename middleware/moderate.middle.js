export default function ({store, redirect}) {
	if (!store.getters['userStore/getPermission']) {
		redirect('/list?permission=true')
	}
}