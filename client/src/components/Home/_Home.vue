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
    <strong> Trier les resultats par: </strong>
    <select v-model="sort" @change="Sort">
      <option disabled value="">Choisir un filtre</option>
      <option> Age </option>
      <option> Popularite</option>
    </select>
    <SearchList :listData="array"></SearchList>
  </div>
  <div v-else>
    <p>Merci de vous connecter ou vous inscrire</p>
  </div>
</template>

<script>
import Search from '@/services/SearchService'
import SearchList from '@/components/Home/SearchList'
export default {
  name: 'home',
  components: {
    'SearchList': SearchList
  },
  data () {
    return {
      sort: '',
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
        this.Sort()
      })
    },
    Sort () {
      switch (this.sort) {
        case 'Age':
          this.array.sort((a, b) => a.age - b.age)
          break
        case 'Popularite':
          this.array.sort((a, b) => a.popularite - b.popularite)
          break
      }
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
.searchElement {
  border: solid 1px lightgrey;
  margin: 2px;
  padding: 5px;
}
.searchElement:hover {
  background-color: rgba(227, 242, 253, 0.5);
}
</style>
