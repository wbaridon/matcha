<template>
  <header>
    <div id="branding">
      <h1><a href="/">Matcha</a></h1>
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
        {{error}}
      </div>
    </nav>
    <nav v-else>
        <div class="element">
      <a href="/profile">Mon profil</a>
      <a href="/suggestion">Suggestion</a>
    </div>
      <button @click="logOut()">Se deconnecter</button>
    </nav>
  </header>
</template>
<script>
import Login from '@/services/LoginService'
export default {
  props: ['isAuth'],
  data () {
    return {
      error: '',
      user: {
        login: '',
        password: ''
      }
    }
  },
  methods: {
    userLogin () {
      Login.logIn(this.user).then(res => {
        this.error = res
        if (res.error === 0) {
          this.error = 'Ok'
          this.$emit('log', 'logIn')
          this.$cookie.set('authToken', res.token, 1)
        }
      })
    },
    logOut () {
      this.$emit('log', 'logOut')
      this.$cookie.delete('authToken')
    }
  }
}
</script>
