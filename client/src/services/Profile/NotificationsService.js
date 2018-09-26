import Api from '@/services/Api'

export default {
  getNotifications (action, id, callback) {
    return Api().post('notifications/get', {'action': action, 'id': id}, callback).then(function (response) {
      callback(response.data)
    })
  }
}
