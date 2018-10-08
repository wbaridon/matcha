import Api from '@/services/Api'

export default {
  getAll (token, ask, callback) {
    return Api().post('suggestion/', {token: token, ask}, callback).then(function (response) {
      callback(response)
    })
  },
  getUser (token, callback) {
    return Api().post('suggestion/getUser', {token: token}, callback).then(function (response) {
      callback(response.data)
    })
  }
}
