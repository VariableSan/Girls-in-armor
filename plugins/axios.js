export default function({ $axios, redirect, store }) {
	$axios.interceptors.request.use(request => {
		if (store.getters['userStore/isAuth'] && !request.header.common.Authorization) {
			const token = store.getters['userStore/getToken']
			request.header.common.Authorization = `Bearer ${token}`
		}

		return request
	})
	
	$axios.onError(error => {
		if (error.response) {
			if (error.response.status === 401) {
				redirect('/auth/login?message=session')
				store.dispatch('auth/logout')
			}

			if (error.response.status === 500) {
				console.error('Server 500 error')
			}
		}
	})
}