import Api from '@/services/Api'

export default {
  getAll (callback) {
    return Api().post('suggestion/', callback).then(function (response) {
      callback(response)
    })
  }
}
