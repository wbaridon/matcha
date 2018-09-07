<template>
  <div id="myprofile">
    <h1>Mon profil</h1>
    <a href="#">Changer mes informations</a><br><br>
    <h2> {{user.firstname}} {{user.name}} </h2>
    {{user.email}}<br>
    {{user.sexuality}}<br>
    {{user.gender}}
    <h3>QUI SUIS JE?</h3>
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
        age: '',
        sexuality: '',
        bio: '',
        gender: '',
        email: '',
        password: '',
      },
      // Quand il y aura la sauvegarde enlever les valeurs par defaut
      interests: ['php', 'html'], // Liste possible sous forme de tags
      pictures: '', // 5 images max dont une pour le profil
    }
  },
  mounted () {
    this.editProfile()
  },
  methods: {
    editProfile () {
      var token = this.$cookie.get('authToken')
      Profile.edit(this.user, token, callback => {
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
