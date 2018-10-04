<template>
  <div id="profile" v-if="user.userExist" class="container">
    <aside>
        <div v-for="picture in images.gallery" :key="picture.id" class="pic">
            <img v-if="picture.isProfile" :src="'/static/images/uploads/'+picture.filename"/>
        </div>
            <i class="far fa-star"></i>
            <strong>Popularite: {{user.popularite}}</strong><br>
            <span v-if="user.isOnline"><strong>Ce membre est en ligne</strong><br></span>
            <span v-if="!user.isOnline">Derniere visite: <strong>{{lastVisit}}</strong><br></span>
    </aside>
    <section class="userProfile">
    <button @click="setLike(0)" v-if="!like && images.count > 0"> J'aime </button>
    <button @click="setLike(4)" v-if="like && images.count > 0"> Je n'aime plus </button>
    <h1>{{user.firstname}} {{user.name}}</h1>
    <span v-if="likeUs"> Cet utilisateur vous a like.</span>
    <div v-for="picture in images.gallery" :key="picture.id" class="pic">
        <img v-if="!picture.isProfile" :src="'/static/images/uploads/'+picture.filename"/>
    </div>
    {{user.gender}}, {{user.age}} ans,     {{user.sexuality}}<br>
      Localisation: {{user.city}} {{user.zipcode}}<br>
    <h3>QUI SUIS JE? </h3>
    {{user.bio}}
    <h3>VOS PASSIONS</h3>
    <div v-for="(data, interest) in interests" v-bind:key="interest">
      <span v-if="data === 1 && interest!='id_account' && interest!='id'">#{{interest}}</span>
    </div><br>
    <button @click="blockUser()"> Bloquer l'utilisateur </button>
    {{feedback}}
    <button @click.once="fakeProfile()"> Signaler ce profil comme un fake </button>
  </section>
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
      user: {},
      interests: [],
      images: {
        count: '',
        gallery: []
      },
      like: false,
      likeUs: ''
    }
  },
  mounted () {
    this.newVisit()
    this.user.id = this.$route.params.userId
    this.getProfile()
    this.getLikeStatus()
  },
  computed: {
    lastVisit: function () {
      var visit = this.user.lastVisit.split('-')
      var visit2 = visit[2].split('T')
      return (visit2[0] + '/' + visit[1] + '/' + visit[0])
    }
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
        this.getInterests(this.user.id)
        this.userLikeUs(this.user.id)
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
    userLikeUs () {
      Profile.userLikeUs(this.user.id, callback => {
        this.likeUs = callback
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
    },
    getInterests (id) {
      Profile.getInterests(id, callback => {
        this.interests = callback
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
  .container {
    display: flex;
  }

  .userProfile {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 15px;
  }

</style>
