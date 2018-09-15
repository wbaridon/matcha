<template>
  <div v-if="isAuth" id="myprofile">
    <h1>Mon profil</h1>
    <router-link :to="'/profile/' + user.id">Voir mon profil public</router-link><br><br>

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
            <label for="age">Genre:</label>
            <select v-model="user.gender" name='gender'>
               <option  value="0">Homme</option>
                <option value="1">Femme</option>
            </select><br>
            <input type="submit" name="submit" value="Valider">
          </form>
        </div>
        <div class="element" v-if="update.pwd">
          <form class="updateProfile" method='post' v-on:submit.prevent="changePwd()">
            <label for="oldpwd">Ancien mot de passe:</label>
            <input type="password" name="oldpwd" v-model="password.oldpwd"><br>
            <label for="name">Nouveau mot de passe:</label>
            <input type="password" name="newpwd" v-model="password.newpwd"><br>
            <input type="submit" name="submit" value="Valider">
          </form>
        </div>
        <div class="element">
            <button v-if="!update.perso && !update.pwd" @click="update.perso = true">Modifier mes infos</button>
        </div>
    </div>
    <h3>Ma gallerie</h3>

      <input type="file" @change="fileChanged">
      <button @click="upload()">Ajouter une photo</button>
    <div class="photos" v-for="image in images.gallery">
      {{image}}
    </div>

    <h3> Vos preferences </h3>
    <button @click="update.pref = true" v-if="!update.pref">Modifier mes preferences</button>
    <p v-if="!update.pref">
      <strong>Orientation sexuelle: </strong>{{user.sexuality}}<br>
      <strong>Ma localisation: </strong> {{user.city}} {{user.zipcode}} <button @click="locate">Mettre a jour</button>
    </p>
    <form v-if="update.pref" v-on:submit.prevent="changePref()">
      <select v-model="user.sexuality" name='sexuality'>
         <option  value="0">Hetero</option>
         <option value="1">Homo</option>
         <option value="2">Bisexuel</option>
      </select><br>
      <input type="submit" name="submit" value="Valider">
    </form>
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
        pwd: false,
        pref: false
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
        city: '',
        zipcode: ''
      },
      password: {
        oldpwd: '',
        newpwd: '',
        pwdString: ''
      },
      images: {
        count: '',
        gallery: [],
        addFile: ''
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
    fileChanged (event) {
      this.images.addFile = event.target.files[0]
    },
    upload () {
      const formData = new FormData()
      formData.append('userPic', this.images.addFile, this.images.addFile.name)
      Profile.uploadPic(formData, callback => {
        console.log(callback)
      })
    },
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
    changePref () {
      Profile.updatePref(this.user, this.user.id, callback => {
        this.user = callback
        this.update.pref = false
      })
    },
    changePwd () {
      Profile.updatePwd(this.password, this.user.id, callback => {
        this.pwdString = callback
        this.update.perso = false
        this.update.pwd = false
      })
    },
    locate () {
      /* Fonctionne que si geolocalisation active voir pour avec ip */
      if ('geolocation' in navigator) {
        var getPosition = (result) => {
          return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
          })
        }
        getPosition()
          .then((position) => {
            Profile.updateLocalisation(position.coords.latitude, position.coords.longitude, this.user, callback => {
              this.user = callback
            })
          })
          .catch((err) => {
            if (err) {
              Profile.getIp(callback => {
                Profile.updateLocalisation(callback.data.latitude, callback.data.longitude, this.user, callback => {
                  this.user = callback
                })
              })
            }
          })
      } else {
        Profile.getIp(callback => {
          Profile.updateLocalisation(callback.data.latitude, callback.data.longitude, this.user, callback => {
            this.user = callback
          })
        })
      }
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
