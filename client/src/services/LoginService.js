import Api from '@/services/Api'

export default {
  logIn (user) {
    return Api().post('login/', user).then(function (response) {
      return (response.data)
    })
  },
  checkAuth (token) {
    return Api().post('login/checkAuth', {key: token}).then(function (response) {
      return (response.data)
    })
  }
}
