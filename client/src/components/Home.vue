<template>
  <div class="home" v-if='isAuth'>
    <h1>Recherche</h1>
  <!-- Selection de 1 ou plusieurs criteres tel que:
    Localisation / un ou plusieurs tags interet
    ,localisation, popularite et par tags<br> -->
    <div class="search">
      <h2> Vos filtres </h2>
      <div class="searchItem">
          <div class="searchTitle">
            <strong>Age</strong>
          </div>
          <div class="searchContent">
            De: <input type="number" name="minAge" v-model="ask.minAge">
            à: <input type="number" name="maxAge" v-model="ask.maxAge"> ans
          </div>
      </div>
      <div class="searchItem">
          <div class="searchTitle">
            <strong>Score de popularite</strong>
          </div>
          <div class="searchContent">
            De: <input type="number" name="minPop" v-model="ask.minPop">
            à: <input type="number" name="maxPop" v-model="ask.maxPop">
          </div>
      </div>
      <div class="searchItem">
          <div class="searchTitle">
            <strong>Localisation</strong>
          </div>
          <div class="searchContent">

          </div>
      </div>
      <div class="searchItem">
          <div class="searchTitle">
            <strong>Interets</strong>
          </div>
          <div class="searchContent">

          </div>
      </div>
      <button @click="search">Rechercher</button><br>
    </div>
    <h2> Trier les resultats par </h2>
    <button @click="ageSort">Age</button>
    <div v-for="element in array" :key="element.id">
      <h2>{{element.firstname}} {{element.name}}</h2>
      {{element.age}} ans / Popularite: {{element.popularite}}<br>
      <router-link :to="'/profile/' + element.id">Voir son profil >></router-link>
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
        maxAge: '',
        minPop: '',
        maxPop: ''
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
.search {
  background-color: lightgrey;
  padding: 15px;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.searchItem {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5px;
}
.searchTitle {
  background-color: grey;
  padding: 10px;
  flex-basis: 25%;
}
.searchContent {
  background-color: white;
  padding: 10px;
  flex-grow: 1;
}
</style>
