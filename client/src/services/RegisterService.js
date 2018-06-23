import Api from '@/services/Api'

export default {
  newUser (user) {
    console.log(user)
    return Api().post('register', user).then(function (response) {
      return response.data
    })
  }
}
