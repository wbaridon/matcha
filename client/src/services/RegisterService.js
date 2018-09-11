import Api from '@/services/Api'

export default {
  newUser (user) {
    return Api().post('register', user).then(function (response) {
      return response.data
    })
  },
  activate (token) {
    return Api().post('activate', token).then(function (response) {
      return response.data
    })
  }
}
