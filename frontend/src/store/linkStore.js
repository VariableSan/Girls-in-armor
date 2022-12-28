export const state = () => ({
  links: [
    {
      title: 'Home',
      url: '/',
      icon: 'mdi-home'
    },
    {
      title: 'Waifu list',
      url: '/list',
      icon: 'mdi-format-list-bulleted'
    },
    {
      title: 'Add waifu',
      url: '/add',
      icon: 'mdi-plus',
      authRequire: true
    },
    {
      title: 'Moderate',
      url: '/moderate',
      icon: 'mdi-microsoft-access',
      onlyAdmin: true
    },
    {
      title: 'Logout',
      url: '/auth/logout',
      icon: 'mdi-logout',
      authRequire: true
    },
    {
      title: 'Login',
      url: '/auth/login',
      icon: 'mdi-login',
      onlyNoAuth: true
    },
    {
      title: 'Register',
      url: '/auth/register',
      icon: 'mdi-account-plus',
      onlyNoAuth: true
    }
  ]
})

export const getters = {
  getLinks: state => state.links
}
