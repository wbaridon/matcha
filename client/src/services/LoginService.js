import Api from '@/services/Api'

export default {
  test (Data) {
    return Api().post('login/test', Data, {headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }}).then(r => console.log('r: ', JSON.stringify(r, null, 2)))
  }
}
