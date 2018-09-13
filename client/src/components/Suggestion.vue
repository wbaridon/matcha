<template>
  <div v-if="isAuth" id="suggestion">
    <h1>Liste suggestion</h1>
      <button @click="ageSort()">Trier par age</button> |
      <button @click="distanceSort()">Trier par Localisation</button> | popularitem tags en commun
      // Rajouter un filtre par intervale age, localisation, popularite et tags<br>
      // Bloquer la vue de la page si profil etendue non remplis
      <div v-for="list in result" :key="list.id" class="card">
      <h2>{{list.firstname}} {{list.name}}</h2><br>
      {{list.age}} ans, {{list.gender}} {{list.sexuality}} à {{list.distance}} m<br>
      Pourcentage de compatibilite (A confirmer)
      Proximite geographique
      Interet commun
      Score de popularite<br>
      <router-link :to="'/profile/' + list.id">Voir son profil >></router-link>
    </div>
  </div>
  <div v-else>Merci de vous connecter</div>
</template>

<script>
import Suggestion from '@/services/SuggestionService'
export default {
  name: 'suggestion',
  data () {
    return {
      result: []
    }
  },
  mounted () {
    this.getAll()
  },
  computed: {
    isAuth () {
      return this.$store.state.isAuth
    }
  },
  methods: {
    getAll () {
      var token = this.$cookie.get('authToken')
      Suggestion.getAll(token, callback => {
        this.result = callback.data
      })
    },
    ageSort () {
      return this.result.sort((a, b) => a.age - b.age)
    },
    distanceSort () {
      return this.result.sort((a, b) => a.distance - b.distance)
    }
  }
}
</script>

<style>
.card {
margin: 10px;
padding: 10px;
border: solid 2px lightgrey;
}
.card:hover {
background-color: rgba(192,192,192,0.2);

}
</style>
