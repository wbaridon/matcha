<template>
  <div class="home" v-if='isAuth'>
    <h1>Recherche</h1>
    // Selection de 1 ou plusieurs criteres tel que:
    Intervalle Age / Intervalle score popularite / Localisation / un ou plusieurs tags interet
    ,localisation, popularite et par tags<br>
    <h2> Vos filtres </h2>
    <strong>Age</strong><br>
    De: <input type="number" name="minAge" v-model="ask.minAge">
    à: <input type="number" name="maxAge" v-model="ask.maxAge"> ans<br>
    <button @click="search">Rechercher</button><br>
    <h2> Trier les resultats par </h2>
    <button @click="ageSort">Age</button>
    <div v-for="element in array" :key="element.id">
      <h2>{{element.firstname}} {{element.name}}</h2>
      {{element.age}} ans
    </div>
  </div>
  <div v-else>
    <p>Merci de vous connecter ou vous inscrire</p>
  </div>
</template>

<script>
import Search from '@/services/SearchService'
export default {
  name: 'home',
  data () {
    return {
      ask: {
        minAge: '',
        maxAge: ''
      },
      array: []
    }
  },
  computed: {
    isAuth () {
      return this.$store.state.isAuth
    }
  },
  methods: {
    search () {
      Search.ask(this.$cookie.get('authToken'), this.ask, callback => {
        this.array = callback
      })
    },
    ageSort () {
      return this.array.sort((a, b) => a.age - b.age)
    }
  }
}
</script>

<style>
</style>
