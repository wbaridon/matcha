import Api from '@/services/Api'

export default {
  viewProfile (user, callback) {
    return Api().post('profile/view', user, callback).then(function (response) {
      callback(response.data)
    })
  },
  edit (user, token, callback) {
    return Api().post('profile/edit', {user, token}, callback).then(function (response) {
      callback(response.data)
    })
  },
  updateBio (bio, id, callback) {
    return Api().post('profile/updateBio', {bio, id}, callback).then(function (response) {
      callback(response.data)
    })
  },
  updatePerso (user, id, callback) {
    return Api().post('profile/updatePerso', {user, id}, callback).then(function (response) {
      callback(response.data)
    })
  },
  updatePref (user, id, callback) {
    return Api().post('profile/updatePref', {user, id}, callback).then(function (response) {
      callback(response.data)
    })
  },
  updateLocalisation (lat, long, user, callback) {
    return Api().post('profile/localisation', {lat, long, user}, callback).then(function (response) {
      console.log(response.data)
      callback(response.data)
    })
  },
  updatePwd (password, id, callback) {
    return Api().post('profile/updatePwd', {password, id}, callback).then(function (response) {
      callback(response.data)
    })
  }
}
