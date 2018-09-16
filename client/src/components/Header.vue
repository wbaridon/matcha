<template>
  <header>
    <div id="branding">
      <div id="siteTitle"><a href="/">Matcha</a></div>
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
    </div>
      <button @click="logOut()">Se deconnecter</button>
    </nav>
  </header>
</template>
<script>
import Login from '@/services/LoginService'
import Modal from '@/components/Modal'
export default {
  data () {
    return {
      error: '',
      user: {
        login: '',
        password: ''
      },
      showError: false
    }
  },
  components: {
    'modal': Modal
  },
  computed: {
    isAuth () {
      return this.$store.state.isAuth
    }
  },
  methods: {
    userLogin () {
      Login.logIn(this.user).then(res => {
        if (res.error === 0) {
          this.$store.commit('logIn')
          this.$cookie.set('authToken', res.token, 1)
        } else {
          this.error = res
          this.showError = true
        }
      })
    },
    logOut () {
      this.$store.commit('logOut')
      this.$cookie.delete('authToken')
    }
  }
}
</script>
