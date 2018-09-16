<template>
  <div class="maGallerie">
    <h3>Ma gallerie</h3>
      <input type="file" @change="fileChanged">
      <button @click="upload()">Ajouter une photo</button>

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
      const formData = new FormData()
      formData.append('userPic', this.images.addFile, this.images.addFile.name)
      formData.append('id', this.userId)
      if (!this.images.count) { formData.append('isProfile', 1) }
      this.$emit('updatePic', 'upload', formData)
    }
  }
}
</script>
