<template>
  <div v-if="isAuth" id="suggestion">
      <div v-if="!user.isFill">Merci de remplir votre profil pour pouvoir avoir accès a cette page</div>
      <div v-if="user.isFill">
        <h1>Liste suggestion</h1>
        <strong> Trier les resultats par: </strong>
        <select v-model="sort" @change="Sort">
          <option disabled value="">Choisir un filtre</option>
          <option> Age </option>
          <option> Popularite +</option>
          <option> Popularite -</option>
          <option> Localisation</option>
          <option> Tags en commun</option>
        </select>
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
                De: <input type="number" name="minDistance" v-model="ask.minDistance">
                à: <input type="number" name="maxDistance" v-model="ask.maxDistance"> mètres
              </div>
          </div>
          <div class="searchItem">
              <div class="searchTitle">
                <strong>Interets</strong>
              </div>
              <div class="searchContent searchInterests">
                    <span v-for="index in interests" v-bind:key="index">
                      <input type="checkbox" v-bind:value="index" v-model="ask.checkedInterests">{{index}}
                    </span>
              </div>
          </div>
        </div>
        <br>
         <SuggestionList :listData="array" :filter="ask"></SuggestionList>
      </div>
  </div>
  <div v-else>Merci de vous connecter</div>
</template>

<script>
import Suggestion from '@/services/Suggestion/SuggestionService'
import SuggestionList from '@/components/Suggestion/SuggestionList'
import Profile from '@/services/ProfileService'
export default {
  name: 'suggestion',
  components: {
    'SuggestionList': SuggestionList
  },
  data () {
    return {
      sort: '',
      ask: {
        minAge: '18',
        maxAge: '99',
        minPop: '0',
        maxPop: '1000',
        minDistance: '0',
        maxDistance: '5000',
        checkedInterests: []
      },
      array: [],
      interests: [],
      user: []
    }
  },
  watch: {
    ask: {
      handler: function (val, oldVal) {
        console.log('arrive')
        this.getAll()
      },
      deep: true
    }
  },
  mounted () {
    this.getUser(this.$cookie.get('authToken'))
    this.getAll()
    this.getInterestsList()
  },
  computed: {
    isAuth () {
      return this.$store.state.isAuth
    }
  },
  methods: {
    getUser (token) {
      Suggestion.getUser(token, callback => {
        this.user = callback
      })
    },
    getAll () {
      var token = this.$cookie.get('authToken')
      Suggestion.getAll(token, callback => {
        console.log('revient')
        if (callback.data.error !== 1) {
          this.array = callback.data
          this.array.sort((a, b) => b.compatibility - a.compatibility)
          this.user.isFill = 1
        }
      })
    },
    getInterestsList () {
      Profile.getInterestsList(callback => {
        this.interests = callback
      })
    },
    Sort () {
      switch (this.sort) {
        case 'Age':
          this.array.sort((a, b) => a.age - b.age || b.compatibility - a.compatibility)
          break
        case 'Popularite +':
          this.array.sort((a, b) => b.popularite - a.popularite || b.compatibility - a.compatibility)
          break
        case 'Popularite -':
          this.array.sort((a, b) => a.popularite - b.popularite || b.compatibility - a.compatibility)
          break
        case 'Localisation':
          this.array.sort((a, b) => a.distance - b.distance || b.compatibility - a.compatibility)
          break
        case 'Tags en commun':
          this.array.sort((a, b) => b.tagCount - a.tagCount || b.compatibility - a.compatibility)
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
