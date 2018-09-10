<template>
  <div v-if="isAuth" id="myprofile">
    <h1>Mon profil</h1>
    <router-link :to="'/profile/' + user.id">Voir mon profil public</router-link><br><br>
    <button>Ajouter des photos</button>
          <h2> {{user.firstname}} {{user.name}} </h2>
    <div id="topProfile">
        <div class="element">
            <img src="/static/images/noPicture.jpg" alt="Pas de photos" class="profilePic"/>
        </div>
        <div class="element" v-if="!update.perso && !update.pwd">
          <h3> Vos informations perso </h3>
          <p><strong>Email:</strong> {{user.email}}</p>
          <p><strong>Sexe:</strong>  {{user.gender}}</p>
          <p><strong>Age:</strong> {{user.age}}</p>
          <button v-if="!update.perso && !update.pwd" @click="update.pwd = true">
            Modifier mon mot de passe
          </button> {{password.pwdString}}
        </div>
        <div class="element" v-if="update.perso">
          <form class="updateProfile" method='post' v-on:submit.prevent="changePerso()">
            <label for="firstname">Prenom:</label>
            <input type="text" name="firstname"  v-model="user.firstname"><br>
            <label for="name">Nom:</label>
            <input type="text" name="name" v-model="user.name"><br>
            <label for="email">Email:</label>
            <input type="text" name="email" v-model="user.email"><br>
            <label for="age">Age:</label>
            <input type="text" name="age" v-model="user.age"><br>
            <input type="submit" name="submit" value="Valider">
          </form>
        </div>
        <div class="element" v-if="update.pwd">
          <form class="updateProfile" method='post' v-on:submit.prevent="changePwd()">
            <label for="oldpwd">Ancien mot de passe:</label>
            <input type="password" name="oldpwd" v-model="password.oldpwd"><br>
            <label for="name">Nouveau mot de passe:</label>
            <input type="text" name="newpwd" v-model="password.newpwd"><br>
            <input type="submit" name="submit" value="Valider">
          </form>
        </div>
        <div class="element">
            <button v-if="!update.perso && !update.pwd" @click="update.perso = true">Modifier mes infos</button>
        </div>
    </div>

    <h3> Vos preferences </h3>
    <strong>Orientation sexuelle: </strong>{{user.sexuality}}<br>
    <h3>Votre biographie</h3>
    <button v-if="!update.bio" @click="update.bio = !update.bio">Modifier ma bio</button>
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
        bio: false,
        pwd: false
      },
      user: {
        id: '',
        firstname: '',
        name: '',
        age: '',
        sexuality: '',
        bio: '',
        gender: '',
        email: ''
      },
      password: {
        oldpwd: '',
        newpwd: '',
        pwdString: ''
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
    changePerso () {
      // Faire un controle des nouvelles valeur avant envoi comme pour register
      Profile.updatePerso(this.user, this.user.id, callback => {
        this.user = callback
        this.update.perso = false
      })
    },
    changeBio () {
      Profile.updateBio(this.user.bio, this.user.id, callback => {
        this.user.bio = callback
        this.update.bio = false
      })
    },
    changePwd () {
      Profile.updatePwd(this.password, this.user.id, callback => {
        this.pwdString = callback
        this.update.perso = false
        this.update.pwd = false
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
    justify-content: space-between;
  }
  .profilePic {
    width: 200px;
  }
</style>
