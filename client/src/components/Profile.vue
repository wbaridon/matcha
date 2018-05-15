<template>
  <div class="profile">
    <h1>Mon profil</h1>
    <a href="#">Changer mes informations</a><br><br>
    <h2> {{firstname}} {{name}} </h2>
    {{email}}<br>
    {{sexualOrientation}}<br>
    {{type}}
    <h3>QUI SUIS JE?</h3>
    {{biography}}
    <h3>VOS PASSIONS</h3>
    <div id='interests'>
      <div v-for="interest in interests" v-bind:key="interest">
        <span class='sticker'>#{{interest}} &times;</span>
      </div>
      <div>
        <form class="" action="index.html" method="post">
          <input type="text" name="interest" value="">
          <input type="submit" name="submit" value="Ajouter">
        </form>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'profile',
  data () {
    return {
      // Quand il y aura la sauvegarde enlever les valeurs par defaut
      type: 'h',
      sexualOrientation: 'hetero',
      biography: 'Petit texte pour me presenter',
      interests: ['php', 'html'], // Liste possible sous forme de tags
      pictures: '', // 5 images max dont une pour le profil
      name: 'Dubois',
      firstname: 'Nicolas',
      email: 'wbaridon@gmail.com',
      password: 'test'
    }
  }
}
</script>

<style>
  #interests {
    display: flex;
    margin: 1%;
  }
  .sticker {
    background-color: green;
    border-radius: 15px;
    padding: 5px;
    color: white;
    margin: 3px;
  }
</style>
