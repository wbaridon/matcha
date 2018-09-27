import Api from '@/services/Api'

export default {
  getNotifications (action, id, callback) {
    return Api().post('notifications/get', {'action': action, 'id': id}, callback).then(function (response) {
      callback(response.data)
    })
  },

  getMatches (userid, callback) {
    return Api().post('matches/get', {'userid': userid}, callback).then(function (response) {
      callback(response.data)
    })
  }
}
