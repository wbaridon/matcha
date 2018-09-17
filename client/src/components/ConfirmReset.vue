<template>
  <div class="home">
    <h1>Reinitialisation mot de passe</h1>
    {{feedback}}
    <form class="" @submit.prevent="reset()" method="post">
      Login: <input type="text" name="login" v-model="user.login" required><br>
      Email: <input type="email" name="email" v-model="user.pass1" required><br>
      New password: <input type="text" name="login" v-model="user.pass1" required><br>
      Confirm New password: <input type="email" name="email" v-model="user.pass2" required><br>
      <input type="submit" name="submit" value="Confirmer">
    </form>
  </div>
</template>

<script>
import Login from '@/services/LoginService'
export default {
  name: 'ConfirmReset',
  data () {
    return {
      user: {
        login: '',
        email: '',
        pass1: '',
        pass2: '',
        key: ''
      },
      feedback: ''
    }
  },
  mounted () {
    this.user.key = this.$router.currentRoute.query
  },
  methods: {
    reset () {
      Login.reset(this.user).then(res => {
        this.feedback = res
      })
    }
  }
}
</script>

<style>
</style>
