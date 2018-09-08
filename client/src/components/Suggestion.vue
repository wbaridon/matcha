<template>
  <div v-if="isAuth" id="suggestion">
    <h1>Liste suggestion</h1>
      Trier les profils par:
      <select id="sortProfile">
        <option value="age">Age</option>
        <option value="localisation">Localisation</option>
        <option value="popularite">Popularite</option>
        <option value="tag">Tags en commun</option>
      </select><br>
      // Rajouter un filtre par intervale age, localisation, popularite et tags<br>
      // Bloquer la vue de la page si profil etendue non remplis
      <div v-for="list in result" :key="list.id" class="card">
      <h2>{{list.login}}</h2><br>
      Pourcentage de compatibilite (A confirmer)
      Orientation Sexuel
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
      Suggestion.getAll(callback => {
        this.result = callback.data
      })
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
