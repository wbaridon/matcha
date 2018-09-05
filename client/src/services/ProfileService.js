import Api from '@/services/Api'

export default {
  viewProfile (user, callback) {
    return Api().post('profile/view', user, callback).then(function (response) {
      callback(response)
    })
  }
}
