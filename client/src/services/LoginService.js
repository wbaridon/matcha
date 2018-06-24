import Api from '@/services/Api'

export default {
  logIn (user) {
    return Api().post('login/', user).then(function (response) {
      console.log(response)
      var token = response.data
      localStorage.token = token
      return (response)
    })
  }
}
