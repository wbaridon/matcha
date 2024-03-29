import Api from '@/services/Api'

export default {
  getNotifications (action, id, callback) {
    return Api().post('notifications/get', {'action': action, 'id': id}, callback).then(function (response) {
      callback(response.data)
    })
  },
  getLikeStatus (action, token, receiver, callback) {
    return Api().post('notifications/getLikeStatus', {'action': action, 'token': token, 'receiver': receiver}, callback).then(function (response) {
      callback(response.data)
    })
  },
  getAllNotifications (token, callback) {
    return Api().post('notifications/getAll', {'token': token}, callback).then(function (response) {
      callback(response.data)
    })
  },
  getMatches (userid, callback) {
    return Api().post('matches/get', {'userid': userid}, callback).then(function (response) {
      callback(response.data)
    })
  },
  readNotifications (token, callback) {
    return Api().post('notifications/read', {'token': token}, callback).then(function (response) {
      callback(response.data)
    })
  },
  getNotifNumber (token, callback) {
    return Api().post('notifications/count', {'token': token}, callback).then(function (response) {
      callback(response.data)
    })
  }
}
