<template>
  <div id="profile" v-if="user.userExist">
    <button> J'aime </button>
    <button> Je n'aime plus </button>
    <h1>{{user.firstname}} {{user.name}}</h1>

    Score de popularite: <br>
    {{user.sexuality}}<br>
    {{user.gender}}
    <h3>QUI SUIS JE? </h3>
    {{user.bio}}
    <h3>VOS PASSIONS</h3>
    <div id='interests'>
      <div v-for="interest in interests" v-bind:key="interest">
        <span class='sticker'>#{{interest}} &times;</span>
      </div>
      <div>
        <form class="" action="index.html" method="post">
          <input type="text" name="interest" value="">
          <input type="submit" name="submit" value="Ajouter">
        </form>
      </div>
    </div>
    <button @click="blockUser()"> Bloquer l'utilisateur </button>
    <button @click="fakeProfile()"> Signaler ce profil comme un fake </button>
  </div>
  <div id="profile" v-else>
    Aucun profil
  </div>
</template>

<script>
import Profile from '@/services/ProfileService'
export default {

  name: 'profile',
  data () {
    return {
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
      like: {
        status: '', // Si oui ou non on a liker l'user
        other: '' // Si l'autre nous a liker mettre yes
      },
      result: [ ],
      // Quand il y aura la sauvegarde enlever les valeurs par defaut
      interests: ['php', 'html'], // Liste possible sous forme de tags
      pictures: '' // 5 images max dont une pour le profil

    }
  },
  mounted () {
    this.user.id = this.$route.params.userId
    this.getProfile()
  },
  methods: {
    getProfile () {
      Profile.viewProfile(this.user, callback => {
        this.user = callback
      })
    },
    fakeProfile () {
      console.log('test')
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
