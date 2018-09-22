import Api from '@/services/Api'

export default {
  ask (token, ask, interests, callback) {
    return Api().post('search/ask', {token, ask, interests}, callback).then(function (response) {
      callback(response.data)
    })
  }
}
