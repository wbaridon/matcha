<template>
  <div id="myprofile">
    <h1>Mon profil</h1>
    <h2> {{user.firstname}} {{user.name}} </h2>
    {{user.email}}<br>
    {{sexualOrientation}}<br>
    {{type}}
    <h3>QUI SUIS JE? </h3>
    {{biography}}
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

  </div>
</template>

<script>
import Profile from '@/services/ProfileService'
export default {
  name: 'myprofile',
  data () {
    return {
      user: {
        id: '',
        firstname: '',
        name: '',
        email: ''
      },
      result: [ ],
      // Quand il y aura la sauvegarde enlever les valeurs par defaut
      type: 'h',
      sexualOrientation: 'hetero',
      biography: 'Petit texte pour me presenter',
      interests: ['php', 'html'], // Liste possible sous forme de tags
      pictures: '', // 5 images max dont une pour le profil
      name: 'Dubois',
      firstname: 'Nicolas',
      email: 'wbaridon@gmail.com',
      password: 'test'
    }
  },
  mounted () {
    this.user.id = this.$route.params.userId,
    this.getProfile()
  },
  methods: {
    getProfile () {
      Profile.viewProfile(this.user, callback => {
        this.user = callback
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
</style>
