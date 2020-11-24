export default function ({ store, redirect }) {
  if (store.getters['userStore/getUser']) {
    redirect('/?message=already')
  }
}
