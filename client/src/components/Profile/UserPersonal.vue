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
        <label for="firstname">Prenom:</label><input type="text" name="firstname"  v-model="user.firstname"><br>
        <label for="name">Nom:</label><input type="text" name="name" v-model="user.name"><br>
        <label for="email">Email:</label><input type="text" name="email" v-model="user.email"><br>
        <label for="age">Age:</label><input type="text" name="age" v-model="user.age"><br>
        <label for="age">Genre:</label>
          <select v-model="user.gender" name='gender'>
             <option value="0">Homme</option>
             <option value="1">Femme</option>
          </select><br>
        <input type="submit" name="submit" value="Valider">
      </form>

    </div>

    <div class="element" v-if="update.pwd">

      <form class="updateProfile" method='post' v-on:submit.prevent="change('password')">
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
      }
    }
  },
  methods: {
    change (action, data) {
      this.$emit('changePerso', action, data)
      this.update.perso = false
      this.update.pwd = false
    }
  }
}
</script>
