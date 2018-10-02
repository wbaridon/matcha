<template>
  <div id="profile" v-if="user.userExist">
    <button @click="setLike(0)" v-if="!like && images.count > 0"> J'aime </button>
    <button @click="setLike(4)" v-if="like && images.count > 0"> Je n'aime plus </button>
    <h1>{{user.firstname}} {{user.name}}</h1>
    <div v-for="picture in images.gallery" :key="picture.id" class="pic">
        <img :src="'/static/images/uploads/'+picture.filename"/>
    </div>
    {{user.gender}}, {{user.age}} ans,     {{user.sexuality}}<br>
      Score de popularite: <br>
    <h3>QUI SUIS JE? </h3>
    {{user.bio}}
    <h3>VOS PASSIONS</h3>

    <button @click="blockUser()"> Bloquer l'utilisateur </button>
    {{feedback}}
    <button @click.once="fakeProfile()"> Signaler ce profil comme un fake </button>
  </div>
  <div id="profile" v-else>
    Aucun profil
  </div>
</template>

<script>
import Profile from '@/services/ProfileService'
import Notifications from '@/services/Profile/NotificationsService'
import Pictures from '@/services/Profile/PicturesService'
export default {

  name: 'Profile',
  data () {
    return {
      feedback: '',
      user: {
        userExist: '',
        id: '',
        firstname: '',
        name: '',
        age: '',
        sexuality: '',
        bio: '',
        gender: '',
        email: ''
      },
      images: {
        count: '',
        gallery: []
      },
      like: false
    }
  },
  mounted () {
    this.newVisit()
    this.user.id = this.$route.params.userId
    this.getProfile()
    this.getLikeStatus()
  },
  methods: {
    newVisit () {
      this.$socket.emit('profileNewAction', {
        token: this.$cookie.get('authToken'),
        receiver: this.$route.params.userId,
        action: 1
      })
    },
    setLike (newAction) {
      this.$socket.emit('profileNewAction', {
        token: this.$cookie.get('authToken'),
        receiver: this.$route.params.userId,
        action: newAction
      })
      this.like = !this.like
    },
    getProfile () {
      Profile.viewProfile(this.user, callback => {
        this.user = callback
        this.getPic(this.user.id)
      })
    },
    getPic (id) {
      Pictures.getPic(id, callback => {
        this.images.count = callback.count
        this.images.gallery = callback.gallery
      })
    },
    getLikeStatus () {
      Notifications.getLikeStatus(0, this.$cookie.get('authToken'), callback => {
        this.like = callback.like
      })
    },
    fakeProfile () {
      Profile.fakeReport(this.$route.params.userId, callback => {
        this.feedback = 'Merci pour votre signalement'
      })
    },
    blockUser () {
      Profile.blockUser(this.$route.params.userId, this.$cookie.get('authToken'), callback => {
        this.feedback = 'Utilisateur bloque'
      })
    }
  }
}
</script>

<style>
  #interests {
    display: flex;
    margin: 1%;
  }
  .sticker {
    background-color: green;
    border-radius: 15px;
    padding: 5px;
    color: white;
    margin: 3px;
  }
  .pic img {
    width: 200px;
    height: 200px;
  }
</style>
