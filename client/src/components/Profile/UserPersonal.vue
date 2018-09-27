<template>
  <div id="userPersonal">
    <div class="element" v-if="!update.perso && !update.pwd">

      <h3> Vos informations perso </h3>

      <p><strong>Email:</strong> {{user.email}}</p>
      <p><strong>Sexe:</strong>  {{user.gender}}</p>
      <p><strong>Age:</strong> {{user.age}}</p>

    </div>

    <div class="element" v-if="update.perso">

      <form class="updateProfile" method='post' v-on:submit.prevent="change('perso', user)">
        <p v-if="feedback">{{feedback}}</p>
        <label for="firstname">Prenom:</label><input type="text" name="firstname"  v-model="user.firstname"><br>
        <label for="name">Nom:</label><input type="text" name="name" v-model="user.name"><br>
        <label for="email">Email:</label><input type="text" name="email" v-model="user.email"><br>
        <label for="age">Age:</label><input type="text" name="age" v-model="user.age"><br>
        <label for="age">Genre:</label>
          <select v-model="user.gender" name='gender'>
            <option disabled value="">Choisir un genre</option>
             <option value="0">Homme</option>
             <option value="1">Femme</option>
          </select><br>
        <input type="submit" name="submit" value="Valider">
      </form>

    </div>

    <div class="element" v-if="update.pwd">

      <form class="updateProfile" method='post' v-on:submit.prevent="change('password', password)">
        <p v-if="feedback">{{feedback}}</p>
        <label for="oldpwd">Ancien mot de passe:</label>
        <input type="password" name="oldpwd" v-model="password.oldpwd"><br>
        <label for="name">Nouveau mot de passe:</label>
        <input type="password" name="newpwd" v-model="password.newpwd"><br>
        <input type="submit" name="submit" value="Valider">
      </form>

    </div>

    <div class="element" v-if="!update.perso && !update.pwd">
        <button @click="update.perso = true" class="btBlue">Modifier mes infos</button>
        <button @click="update.pwd = true" class="btBlue">  Modifier mon mot de passe </button>
    </div>
  </div>

</template>

<script>
export default {
  name: 'UserPersonal',
  props: ['user', 'password'],
  data () {
    return {
      update: {
        perso: false,
        pwd: false
      },
      feedback: ''
    }
  },
  computed: {
    weakPassword: function () {
      var number = /\d/.test(this.password.newpwd)
      var alpha = /[a-zA-Z]/.test(this.password.newpwd)
      if (!number || !alpha) {
        return 1
      }
    },
    lengthPassword: function () {
      if (this.password.newpwd < 6) {
        return 1
      }
    }
  },
  methods: {
    change (action, data) {
      if (action === 'perso' && (data.name === '' || data.firstname === '' || data.email === '' || data.age < 18)) {
        this.feedback = 'Merci de verifier que tous les champs sont remplis et que vous avez un age de 18 ans au minimum'
      } else if (action === 'password' && (this.weakPassword || this.lengthPassword)) {
        this.feedback = 'Votre mot de passe doit contenir 6 caracteres au minimum dont 1 chiffre'
      } else {
        this.$emit('changePerso', action, data)
        this.update.perso = false
        this.update.pwd = false
        this.feedback = ''
      }
    }
  }
}
</script>
