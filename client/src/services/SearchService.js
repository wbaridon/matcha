import Api from '@/services/Api'

export default {
  ask (token, ask, callback) {
    return Api().post('search/ask', {token, ask}, callback).then(function (response) {
      callback(response.data)
    })
  }
}
