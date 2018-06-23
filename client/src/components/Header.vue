<template>
  <header>
    <div id="branding">
      <h1><a href="/">Matcha</a></h1>
    </div>
    <nav>
      <div class="element">
        <form class="form-inline" method='post' v-on:submit.prevent="userLogin">
          <input type="text" name="login" value="" v-model="login" placeholder="Login">
          <input type="password" name="password" v-model="password" value="" placeholder="Mot de passe">
          <input type="submit" name="submit" value="Se connecter">
        </form>
      </div>
      <div class="element">
        <a href="/login/reset">Mot de passe oublié?</a>
        <a href="/register">Inscription</a>
      </div>
    </nav>
  </header>
</template>

<script>
import Login from '@/services/LoginService'
export default {
  data () {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    userLogin () {
      Login.test({
        login: this.login,
        password: this.password
      })
    }
  }
}
</script>
