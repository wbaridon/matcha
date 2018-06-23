import Api from '@/services/Api'

export default {
  newUser (user) {
    console.log(user)
    return Api().post('register', user).then(function (response) {
      if (response.data === 'Ok') {
      console.log('c est bon')
    } else {
      console.log(response.data)
      return response.data
    }
    })
  }
}
