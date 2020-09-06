export default function({ $axios, redirect, store }) {
	$axios.interceptors.request.use(request => {
		if (store.getters['userStore/isAuth'] && !request.headers.common.Authorization) {
			const token = store.getters['userStore/getToken']
			request.headers.common.Authorization = `Bearer ${token}`
		}

		return request
	})
	
	$axios.onError(error => {
		if (error.response) {
			if (error.response.status === 401) {
				redirect('/auth/login?message=session')
				store.dispatch('userStore/logout')
			}

			if (error.response.status === 500) {
				console.error('Server 500 error')
			}
		}
	})
}