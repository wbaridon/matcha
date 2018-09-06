import Api from '@/services/Api'

export default {
  logIn (user) {
    return Api().post('login/', user).then(function (response) {
      return (response.data)
    })
  }
}
