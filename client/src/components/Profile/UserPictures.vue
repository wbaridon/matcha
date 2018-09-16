<template>
  <div class="maGallerie">
    <h3>Ma gallerie</h3>
      <input type="file" @change="fileChanged" accept="image/*">
      <button @click="upload()">Ajouter une photo</button>
          {{feedback}}
    <div class="photos">
      <div v-for="image in images.gallery" v-if="!image.isProfile" :key="image.id" class='pic'>
        <div class="picBandeau">
            <a @click="newProfilePic(image.id)">Mettre a la une</a>
            <a @click="deletePic(image.id)">Supprimer</a>
        </div>
        <img :src="'/static/images/uploads/'+image.filename"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPictures',
  props: ['userId', 'images'],
  data () {
    return {
      feedback: ''
    }
  },
  methods: {
    fileChanged (event) {
      this.images.addFile = event.target.files[0]
    },
    deletePic (id) {
      this.$emit('updatePic', 'delete', id)
    },
    newProfilePic (id) {
      this.$emit('updatePic', 'setProfilePic', id)
    },
    upload () {
      this.feedback = ''
      var format = this.images.addFile.type

      function checkFormat (format) {
        switch (format) {
          case 'image/png': return true
          case 'image/jpeg': return true
          case 'image/jpg': return true
          default: return false
        }
      }
      function addFile (images, id, count, callback) {
        const formData = new FormData()
        formData.append('userPic', images, images.name)
        formData.append('id', id)
        if (!count) { formData.append('isProfile', 1) }
        callback(formData)
      }

      if (!checkFormat(format)) {
        this.feedback = 'Format de fichier invalide'
      } else if (this.images.count === 5) {
        this.feedback = 'Vous ne pouvez pas avoir plus de 5 photos'
      } else {
        addFile(this.images.addFile, this.userId, this.images.count, callback => {
          callback = this.$emit('updatePic', 'upload', callback)
        })
      }
    }
  }
}
</script>
