import Api from '@/services/Api'

export default {
  checkMatch (data) {
    return Api().post('chat/checkmatch', data).then(function (response) {
      return (response.data)
    })
  }
}
