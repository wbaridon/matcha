<template>
  <div class="profile">
    <h1>Mon profil</h1>
    <a href="#">Changer mes informations</a>
    <h2> {{firstname}} {{name}} </h2>
    {{email}}
    {{interests}}
    {{biography}}
    {{sexualOrientation}}
    {{type}}
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
      interests: '#php', // Liste possible sous forme de tags
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
</style>
