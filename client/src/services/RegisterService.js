import Api from '@/services/Api'

export default {
  newUser (user) {
    return Api().post('register', user).then(function (response) {
      console.log(response)
      return response.data
    })
  }
}
