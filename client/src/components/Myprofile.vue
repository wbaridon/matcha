<template>
  <div v-if="isAuth" id="myprofile">
    <h1>Mon profil</h1>
    <router-link :to="'/profile/' + user.id">Voir mon profil public</router-link><br><br>
    <button v-if="!update" @click="modify()">Modifier mon profil</button>
    <div v-if="update">
      <form class="updateProfile" method='post' v-on:submit.prevent="validateForm">
      Prenom: <input type="text" name="firstname"  v-model="user.firstname">
      Nom: <input type="text" name="name" v-model="user.name">
      Email: <input type="text" name="email" v-model="user.email">
      <input type="submit" name="submit" value="Valider">
    </form>
    </div>
    <button>Ajouter des photos</button>
          <h2> {{user.firstname}} {{user.name}} </h2>
    <div id="topProfile">
        <div class="element">
            <img src="/static/images/noPicture.jpg" alt="Pas de photos" class="profilePic"/>
        </div>
        <div class="element">
          <h3> Vos informations perso </h3>
          <p><strong>Email:</strong> {{user.email}}</p>
          <strong>Sexe:</strong>  {{user.gender}}
        </div>
    </div>
    <h3> Vos preferences </h3>
    <strong>Orientation sexuelle: </strong>{{user.sexuality}}<br>
    <h3>Votre biographie</h3>
    <button v-if="!update.bio" @click="modify('bio')">Modifier ma bio</button>
    <p v-if="user.bio && !update.bio">"{{user.bio}}"</p>
    <form v-if="update.bio" class="" method="post" v-on:submit.prevent="changeBio()">
      <textarea name="bio" rows="8" cols="80" v-model="user.bio"></textarea>
      <input type="submit" name="submit" value="Valider">
    </form>
    <h3>Vos passions</h3>
    <div id='interests'>
      <div v-for="interest in interests" v-bind:key="interest">
        <span class='sticker'>#{{interest}} &times;</span>
      </div>
      <div>
        <form class="" method="post">
          <input type="text" name="interest" value="">
          <input type="submit" name="submit" value="Ajouter">
        </form>
      </div>
    </div>

  </div>
  <div v-else>Merci de vous connecter</div>
</template>

<script>
import Profile from '@/services/ProfileService'
export default {
  name: 'myprofile',
  data () {
    return {
      update: {
        perso: false,
        bio: false
      },
      user: {
        id: '',
        firstname: '',
        name: '',
        age: '',
        sexuality: '',
        bio: '',
        gender: '',
        email: '',
        password: ''
      },

      // Quand il y aura la sauvegarde enlever les valeurs par defaut
      interests: ['php', 'html'], // Liste possible sous forme de tags
      pictures: '' // 5 images max dont une pour le profil
    }
  },
  mounted () {
    this.editProfile()
  },
  computed: {
    isAuth () {
      return this.$store.state.isAuth
    }
  },
  methods: {
    editProfile () {
      var token = this.$cookie.get('authToken')
      if (token) {
        Profile.edit(this.user, token, callback => {
          this.user = callback
        })
      }
    },
    modify (data) {
    //   this.update.{{data}} = true, voir pour un chemin plus court
    if (data === 'bio') {
      this.update.bio = true }
      else {
        this.update.perso = true
      }
    },
    validateForm () {
      var token = this.$cookie.get('authToken')
      // Faire un controle des nouvelles valeur avant envoi comme pour register
      Profile.edit(this.user, token, callback => {
        this.user = callback
      })
    },
    changeBio () {
      Profile.updateBio(this.user.bio, this.user.id, callback => {
        this.user.bio = callback
        this.update.bio = false
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
  #topProfile {
    background-color: lightgrey;
    display: flex;
  }
  .profilePic {
    width: 200px;
  }
</style>
