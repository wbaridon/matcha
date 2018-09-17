<template>
  <div v-if="isAuth" id="suggestion">
    <h1>Liste suggestion</h1>
    <strong> Trier les resultats par: </strong>
    <select v-model="sort" @change="Sort">
      <option disabled value="">Choisir un filtre</option>
      <option> Age </option>
      <option> Popularite</option>
    </select>
    | popularitem tags en commun
      // Rajouter un filtre par intervale age, localisation, popularite et tags<br>
      // Bloquer la vue de la page si profil etendue non remplis
     <SuggestionList :listData="result"></SuggestionList>
  </div>
  <div v-else>Merci de vous connecter</div>
</template>

<script>
import Suggestion from '@/services/SuggestionService'
import SuggestionList from '@/components/Suggestion/SuggestionList'
export default {
  name: 'suggestion',
  components: {
    'SuggestionList': SuggestionList
  },
  data () {
    return {
      result: [],
      sort: ''
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
    Sort () {
      switch (this.sort) {
        case 'Age':
          this.result.sort((a, b) => a.age - b.age)
          break
        case 'Popularite':
          this.result.sort((a, b) => a.popularite - b.popularite)
          break
      }
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
