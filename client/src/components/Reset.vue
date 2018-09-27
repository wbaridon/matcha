<template>
  <div class="reset" v-if="user.email && user.key ">
    <h1>Reinitialisation mot de passe</h1>
    {{feedback}}
    <form class="" @submit.prevent="reset('newPass')" method="post">
      Password: <input type="password" name="pass1" v-model="user.pass1" required><br>
      Confirmation Password: <input type="password" name="pass2" v-model="user.pass2" required><br>
      <input type="submit" name="submit" value="Confirmer">
    </form>
  </div>
  <div v-else>
    <h1>Reinitialisation mot de passe</h1>
    {{feedback}}
    <form class="" @submit.prevent="reset('askReset')" method="post">
      Login: <input type="text" name="login" v-model="user.login" required><br>
      Email: <input type="email" name="email" v-model="user.email" required><br>
      <input type="submit" name="submit" value="Confirmer">
    </form>
  </div>
</template>

<script>
import Login from '@/services/LoginService'
export default {
  name: 'reset',
  data () {
    return {
      user: {
        login: '',
        email: '',
        key: '',
        pass1: '',
        pass2: ''
      },
      feedback: ''
    }
  },
  mounted () {
    this.getParams()
  },
  computed: {
    weakPassword: function () {
      var number = /\d/.test(this.user.pass1)
      var alpha = /[a-zA-Z]/.test(this.user.pass1)
      if (!number || !alpha) {
        return 1
      }
    },
    lengthPassword: function () {
      if (this.user.pass1.length < 6) {
        return 1
      }
    }
  },
  methods: {
    reset (action) {
      this.feedback = ''
      switch (action) {
        case 'askReset':
          Login.reset(this.user).then(res => {
            this.feedback = res
          })
          break
        case 'newPass':
          if (this.weakPassword || this.lengthPassword || this.user.pass2 === '') {
            this.feedback = 'Votre mot de passe doit contenir au minimum 6 caracteres dont 1 chiffre'
          } else {
            Login.reset(this.user).then(res => {
              this.feedback = res
            })
          }
          break
      }
    },
    getParams () {
      this.user.email = this.$route.query.email
      this.user.key = this.$route.query.key
    }
  }
}
</script>

<style>
</style>
