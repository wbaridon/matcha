<template>
  <div>
    <h1>S'inscrire</h1>
    <form class="register" method='post' v-on:submit.prevent="validateForm">
      <label for="login">Login</label>
      <input :class="{ 'is-invalid': attemptSubmit && missingLogin }" type="text" name="login" value="" v-model="user.login">
      <p class='error' v-if="missingLogin && attemptSubmit">Merci de renseigner un login.</p>
      <label for="email">Email </label>
      <input :class="{ 'is-invalid': attemptSubmit && missingEmail }" type="email" name="email" value="" v-model="user.email">
      <p class='error' v-if="missingEmail && attemptSubmit">Merci de renseigner un email.</p>
      <label for="password">Mot de passe </label>
      <input :class="{ 'is-invalid': attemptSubmit && missingPassword }" type="password" name="password" value="" v-model="user.password">
      <p class='error' v-if="missingPassword && attemptSubmit">Merci de renseigner un mot de passe.</p>
      <label for="firstname">Prenom </label>
      <input :class="{ 'is-invalid': attemptSubmit && missingFirstname }" type="text" name="firstname" value="" v-model="user.firstname">
      <p class='error' v-if="missingFirstname && attemptSubmit">Merci de renseigner un prenom.</p>
      <label for="name">Nom </label>
      <input :class="{ 'is-invalid': attemptSubmit && missingName }" type="text" name="name" value="" v-model="user.name">
      <p class='error' v-if="missingName && attemptSubmit">Merci de renseigner un nom.</p>
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
    missingLogin: function () { return this.user.login === '' },
    missingEmail: function () { return this.user.email === '' },
    missingPassword: function () { return this.user.password === '' },
    missingFirstname: function () { return this.user.firstname === '' },
    missingName: function () { return this.user.name === '' }
  },
  methods: {
    validateForm: function (event) {
      this.attemptSubmit = true
      if (this.missingLogin || this.missingEmail || this.missingPassword /
      this.missingFirstname || this.missingName) {
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
