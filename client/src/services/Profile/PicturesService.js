import Api from '@/services/Api'

export default {
  uploadPic (formData, callback) {
    return Api().post('profile/uploadPic', formData, callback).then(function (response) {
      callback(response.data)
    })
  },
  getPic (id, callback) {
    return Api().post('profile/getPic', {'id': id}, callback).then(function (response) {
      callback(response.data)
    })
  },
  deletePic (idAccount, id, callback) {
    return Api().post('profile/deletePic', {'idAccount': idAccount, 'id': id}, callback).then(function (response) {
      callback(response.data)
    })
  },
  newProfilePic (idAccount, id, callback) {
    return Api().post('profile/newProfilePic', {'idAccount': idAccount, 'id': id}, callback).then(function (response) {
      callback(response.data)
    })
  }
}
