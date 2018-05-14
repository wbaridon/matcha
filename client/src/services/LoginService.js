import Api from '@/services/Api'

export default {
  test (Data) {
    Api().post('login/test', Data, function (err, res) {
      console.log('test')
      res = 'test'
      err = 'no'
    })
  }
}
