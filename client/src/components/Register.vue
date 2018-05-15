<template>
  <div>
    <h1>S'inscrire</h1>
    <form class="register" method='post' v-on:submit.prevent="validateForm">
      <label for="login">Login</label>
      <input :class="{ 'is-invalid': attemptSubmit && missingLogin }" type="text" name="login" value="" v-model="user.login">
      <p class='error' v-if="missingLogin && attemptSubmit">Un login est necessaire</p>
      <label for="email">Email </label>
      <input type="email" name="email" value="" v-model="user.email">
      <label for="password">Mot de passe </label>
      <input type="password" name="password" value="" v-model="user.password">
      <label for="firstname">Prenom </label>
      <input type="text" name="firstname" value="" v-model="user.firstname">
      <label for="name">Nom </label>
      <input type="text" name="name" value="" v-model="user.name">
      <input type="submit" name="submit" value="S'inscrire">
    </form>
  </div>
</template>

<script>
import Register from '@/services/RegisterService'
export default {
  data () {
    return {
      user: {
        login: '',
        email: '',
        password: '',
        firstname: '',
        name: ''
      },
      attemptSubmit: false
    }
  },
  computed: {
    missingLogin: function () { return this.user.login === '' }
  },
  methods: {
    validateForm: function (event) {
      this.attemptSubmit = true
      if (this.missingLogin) {
        event.preventDefault()
      } else {
        Register.newUser(this.user)
      }
    }
  }
}
</script>

<style>
  .register {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2%;
  }
  .register input {
    width: 250px;
    padding: 5px;
    margin: 5px;
  }
  .register label {
    font-weight: bold;
  }
  .register input[type=submit] {
    background-color: lightgrey;
    margin-top: 15px;
    font-weight: bold;
  }
  .is-invalid {
    border: solid 2px red;
  }
  .error {
    color: red;
    font-size: 0.7em;
    margin-top: 0
  }
</style>
