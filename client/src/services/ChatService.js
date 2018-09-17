import Api from '@/services/Api'

export default {
  getMessages (user) {
    return Api().post('chat/', user).then(function (response) {
      return (response.data)
    })
  },
  sendMessage (user) {
    return Api().post('chat/', user).then(function (response) {
      return (response.data)
    })
  }
}
