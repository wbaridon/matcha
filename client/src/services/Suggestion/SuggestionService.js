import Api from '@/services/Api'

export default {
  getAll (token, callback) {
    return Api().post('suggestion/', {token: token}, callback).then(function (response) {
      callback(response)
    })
  }
}
