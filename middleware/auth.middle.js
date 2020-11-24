export default function ({ store, redirect }) {
  if (!store.getters['userStore/isAuth']) {
    redirect('/auth/login?message=login')
  }
}
