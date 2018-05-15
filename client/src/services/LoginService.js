import Api from '@/services/Api'

export default {
  test (test) {
    return Api().post('login/test', test).then(function (response) { console.log(response) })
  }
}
