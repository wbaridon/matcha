import Api from '@/services/Api'

export default {
  newUser (user) {
    console.log(user)
    return Api().post('register/test', user).then(function (response) { console.log(response) })
  }
}
