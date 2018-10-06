<template>
  <div v-if="isAuth" id="userProfile" class="container">
    <aside>
        <UserProfilePic :images="images"></UserProfilePic><br>
        <router-link :to="'/profile/' + user.id" class="link">Voir mon profil public</router-link><br>
        <hr>
            <i class="far fa-star"></i>
            <strong>Popularite: {{user.popularite}}</strong><br>
    </aside>
    <section class="userProfile">
      <h2> {{user.firstname}} {{user.name}} </h2>
      <UserPersonal :user="user" :password="password" @changePerso="changePerso"></UserPersonal>
      <p v-if="password.feedback">{{password.feedback}}</p>
      <UserPictures @updatePic="updateGallery" :images="images" :userId="user.id"></UserPictures>
      <h3> Vos preferences </h3>
      <button @click="update.pref = true" v-if="!update.pref">Modifier mes preferences</button>
      <p v-if="!update.pref">
        <strong>Orientation sexuelle: </strong>{{user.sexuality}}<br>
        <strong>Ma localisation: </strong> {{user.city}} {{user.zipcode}} <button @click="locate">Mettre a jour</button><br><br>
        <strong>Localisation personalisé</strong><br>
        <span v-if="feedback">{{feedback}}</span><br>
        Ville: <input type="text" v-model="user.city"><br>
        Code postal: <input type="text" v-model="user.zipcode">
        <button @click="persoLoc">Modifier ma localisation</button>
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
      <UserLikes :userId="user.id" :likes="likes"></UserLikes>
      <UserVisits :userId="user.id" :visits="visits"></UserVisits>
    </section>
  </div>
  <div v-else>Merci de vous connecter</div>
</template>

<script>
import Profile from '@/services/ProfileService'
import Pictures from '@/services/Profile/PicturesService'
import Notifications from '@/services/Profile/NotificationsService'
import UserPersonal from '@/components/Profile/UserPersonal'
import UserPictures from '@/components/Profile/UserPictures'
import UserProfilePic from '@/components/Profile/UserProfilePic'
import UserInterests from '@/components/Profile/UserInterests'
import UserLikes from '@/components/Profile/UserLikes'
import UserVisits from '@/components/Profile/UserVisits'
export default {
  name: 'myprofile',
  components: {
    'UserPictures': UserPictures,
    'UserProfilePic': UserProfilePic,
    'UserInterests': UserInterests,
    'UserLikes': UserLikes,
    'UserVisits': UserVisits,
    'UserPersonal': UserPersonal
  },
  data () {
    return {
      images: {
        count: '',
        gallery: [],
        addFile: ''
      },
      update: {
        bio: false,
        pref: false
      },
      user: [],
      password: {
        oldpwd: '',
        newpwd: '',
        feedback: ''
      },
      interests: [],
      likes: [],
      visits: [],
      feedback: ''
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
    getNotifications (action, id) {
      Notifications.getNotifications(action, this.user.id, callback => {
        switch (callback.action) {
          case 'visits':
            this.visits = callback.callback
            break
          case 'likes':
            this.likes = callback.callback
            break
        }
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
          this.getNotifications('likes', this.user.id)
          this.getNotifications('visits', this.user.id)
          if (!this.user.city) { this.locate() }
        })
      }
    },

    changePerso (action, data) {
      switch (action) {
        case 'perso':
          Profile.updatePerso(data, this.user.id, callback => {
            this.user = callback
          })
          break
        case 'password':
          Profile.updatePwd(data, this.user.id, callback => {
            if (callback.error === 1) {
              this.password.feedback = 'Votre ancien mot de passe est faux'
            } else {
              this.password.feedback = ''
            }
          })
          break
      }
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
    persoLoc () {
      this.feedback = ''
      if (this.user.city !== '' && this.user.zipcode !== '') {
        Profile.persoLoc(this.user, callback => {
          if (callback.feedback) {
            this.feedback = callback.feedback
          } else { this.getProfile(this.$cookie.get('authToken')) }
        })
      } else { this.feedback = 'Merci de remplir tous les champs' }
    },
    locate () {
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
  .btBlue {
    background-color: #24292e;
    color: white;
    padding: 10px;
  }
  .btBlue:hover {
    opacity: 0.8;
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
