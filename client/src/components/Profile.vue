<template>
  <div id="profile">
    <h1>{{user.firstname}} {{user.name}}</h1>
    {{user.email}}<br>
    Score de popularite: <br>
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
  name: 'profile',
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
