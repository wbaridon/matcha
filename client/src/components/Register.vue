<template>
  <div>
    <h1>S'inscrire</h1>
    <form class="register"  action="index.html" method="post">
      <label for="login">Login</label>
      <input type="text" name="login" value="">
      <label for="email">Email </label>
      <input type="email" name="email" value="">
      <label for="password">Mot de passe </label>
      <input type="password" name="password" value="">
      <label for="firstname">Prenom </label>
      <input type="text" name="firstname" value="">
      <label for="name">Nom </label>
      <input type="text" name="name" value="">
      <input type="submit" name="submit" value="S'inscrire">
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return { }
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
</style>
