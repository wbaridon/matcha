<template>
  <header>
    <div id="branding">
      <div id="siteTitle">
        <a href="/"><i class="far fa-kiss-wink-heart"></i>
        Matcha</a>
      </div>
    </div>
    <nav v-if="!isAuth">
      <div class="element">
        <form class="form-inline" method='post' v-on:submit.prevent="userLogin">
          <input type="text" name="login" value="" v-model="user.login" placeholder="Login">
          <input type="password" name="password" v-model="user.password" value="" placeholder="Mot de passe">
          <input type="submit" name="submit" value="Se connecter">
        </form>
      </div>
      <div class="element">
        <a href="/login/reset">Mot de passe oublié?</a>
        <a href="/register">Inscription</a>
        <modal v-if="showError" @close="showError = false">
          <div slot="title">
            <h1>Erreur</h1>
          </div>
          <div slot="content">
            {{error}}
          </div>
      </modal>

      </div>
    </nav>
    <nav v-else>
        <div class="element">
          <router-link :to="{ name: 'myprofile', params: {isAuth: isAuth } }">Mon profil</router-link>
          <router-link :to="{ name: 'suggestion', params: {isAuth: isAuth } }">Suggestions</router-link>
            {{notifNumber}}
            <i class="far fa-bell fa-lg" @click="openNotifications"></i>
          <Notifications v-if="showNotifications" :notifications='notifications' @close="showNotifications = false"></Notifications>
          <i @click="logOut()" class="fas fa-sign-out-alt fa-lg"></i>
        </div>
    </nav>
  </header>
</template>
<script>
import Login from '@/services/LoginService'
import Modal from '@/components/Modal'
import NotificationsService from '@/services/Profile/NotificationsService.js'
import Notifications from '@/components/Notifications'
export default {
  data () {
    return {
      error: '',
      user: {
        login: '',
        password: ''
      },
      showError: false,
      showNotifications: '',
      notifications: [],
      notifNumber: ''
    }
  },
  components: {
    'modal': Modal,
    'Notifications': Notifications
  },
  computed: {
    isAuth () {
      return this.$store.state.isAuth
    },
    notifState () {
      return this.$store.state.notifNumber
    }
  },
  watch: {
    isAuth: function (newValue, oldValue) {
      if (newValue === true) { this.getNotifications() }
    },
    notifState: function (newValue, oldValue) {
      this.getNotifNumber()
    }
  },
  mounted () {
    this.getNotifNumber()
  },
  methods: {
    openNotifications () {
      this.showNotifications = true
      NotificationsService.readNotifications(this.$cookie.get('authToken'), callback => {
        this.getNotifications()
        this.getNotifNumber()
      })
    },
    userLogin () {
      Login.logIn(this.user).then(res => {
        if (res.error === 0) {
          this.$store.commit('logIn')
          this.$cookie.set('authToken', res.token, 1)
          location.reload()
        } else {
          this.error = res
          this.showError = true
        }
      })
    },
    logOut () {
      this.$store.commit('logOut')
      this.$cookie.delete('authToken')
      location.reload()
    },
    getNotifications () {
      NotificationsService.getAllNotifications(this.$cookie.get('authToken'), callback => {
        this.notifications = callback
      })
    },
    getNotifNumber () {
      NotificationsService.getNotifNumber(this.$cookie.get('authToken'), callback => {
        this.notifNumber = callback.nb
      })
    }
  }
}
</script>

<style>

</style>
