<template>
  <div v-if="isAuth" id="myprofile">
    <h1>Mon profil</h1>
    <router-link :to="'/profile/' + user.id" class="link">Voir mon profil public</router-link><br><br>

          <h2> {{user.firstname}} {{user.name}} </h2>
    <div id="topProfile">
        <div class="element">
        <UserProfilePic :images="images"></UserProfilePic>
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
    <UserPictures @updatePic="updateGallery" :images="images" :userId="user.id"></UserPictures>
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
    <UserInterests @updateInterest="updateInterest" :userId="user.id" :interests="interests"></UserInterests>
  </div>
  <div v-else>Merci de vous connecter</div>
</template>

<script>
import Profile from '@/services/ProfileService'
import Pictures from '@/services/Profile/PicturesService'
import UserPictures from '@/components/Profile/UserPictures'
import UserProfilePic from '@/components/Profile/UserProfilePic'
import UserInterests from '@/components/Profile/UserInterests'
export default {
  name: 'myprofile',
  components: {
    'UserPictures': UserPictures,
    'UserProfilePic': UserProfilePic,
    'UserInterests': UserInterests
  },
  data () {
    return {
      images: {
        count: '',
        gallery: [],
        addFile: ''
      },
      update: {
        perso: false,
        bio: false,
        pwd: false,
        pref: false
      },
      user: [],
      password: {
        oldpwd: '',
        newpwd: '',
        pwdString: ''
      },
      interests: []
    }
  },
  mounted () {
    this.getProfile(this.$cookie.get('authToken'))
  },
  computed: {
    isAuth () {
      return this.$store.state.isAuth
    }
  },
  methods: {
    getPic (id) {
      Pictures.getPic(id, callback => {
        this.images.count = callback.count
        this.images.gallery = callback.gallery
      })
    },
    getInterests (id) {
      Profile.getInterests(id, callback => {
        this.interests = callback
      })
    },
    updateGallery (name, data) {
      switch (name) {
        case 'delete':
          Pictures.deletePic(this.user.id, data, callback => {
            callback = this.getPic(this.user.id)
          })
          break
        case 'upload':
          Pictures.uploadPic(data, callback => {
            callback = this.getPic(this.user.id)
          })
          break
        case 'setProfilePic':
          Pictures.newProfilePic(this.user.id, data, callback => {
            callback = this.getPic(this.user.id)
          })
          break
      }
    },
    updateInterest (name, data) {
      switch (name) {
        case 'add':
          Profile.addInterest(this.user.id, data, callback => {
            callback = this.getInterests(this.user.id)
          })
          break
        case 'delete':
          Profile.deleteInterest(this.user.id, data, callback => {
            callback = this.getInterests(this.user.id)
          })
          break
      }
    },
    getProfile (token) {
      if (token) {
        Profile.edit(this.user, token, callback => {
          this.user = callback
          this.getPic(this.user.id)
          this.getInterests(this.user.id)
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
  .pic {
    font-size: 0.8em;
    text-align: center;
  }
  .pic img {
    width: 150px;
    height: 150px;
    margin: 8px;
    border: solid 1px black;
  }
  .photos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .link {
    color: black;
  }
</style>
