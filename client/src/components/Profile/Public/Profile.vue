<template>
  <div id="profile" v-if="user.userExist">
    <button @click.once="newLike" v-if="!like"> J'aime </button>
    <button v-if="like"> Je n'aime plus </button>
    <h1>{{user.firstname}} {{user.name}}</h1>
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
      like: ''
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
    newLike () {
      this.$socket.emit('profileNewAction', {
        token: this.$cookie.get('authToken'),
        receiver: this.$route.params.userId,
        action: 0
      })
      this.like = 1
    },
    getProfile () {
      Profile.viewProfile(this.user, callback => {
        this.user = callback
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
      console.log('a faire')
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
</style>
