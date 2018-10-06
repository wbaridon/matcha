<template>
  <div class="home" v-if='isAuth'>
    <h1>Recherche</h1>
  <!-- Selection de 1 ou plusieurs criteres tel que:
    Localisation / un ou plusieurs tags interet
    ,localisation, popularite et par tags<br> -->
    <strong> Trier les resultats par: </strong>
    <select v-model="sort" @change="Sort">
      <option disabled value="">Choisir un filtre</option>
      <option> Age </option>
      <option> Popularite</option>
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
                <div v-for="index in interests" v-bind:key="index">
                  <input type="checkbox" v-bind:value="index" v-model="checkedInterests">{{index}}
                </div>
          </div>
      </div>
      <button @click="search">Rechercher</button><br>
    </div>
    <SearchList :listData="array" :filter="ask"></SearchList>
  </div>
  <div v-else>
    <p>Merci de vous connecter ou vous inscrire</p>
  </div>
</template>

<script>
import Search from '@/services/SearchService'
import Profile from '@/services/ProfileService'
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
        minAge: '18',
        maxAge: '99',
        minPop: '0',
        maxPop: '100',
        minDistance: '0',
        maxDistance: '5000'
      },
      array: [],
      interests: [],
      checkedInterests: []
    }
  },
  mounted () {
    this.getInterestsList()
  },
  computed: {
    isAuth () {
      return this.$store.state.isAuth
    }
  },
  methods: {
    search () {
      Search.ask(this.$cookie.get('authToken'), this.ask, this.checkedInterests, callback => {
        this.array = callback
        this.Sort()
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
          this.array.sort((a, b) => a.age - b.age)
          break
        case 'Popularite':
          this.array.sort((a, b) => a.popularite - b.popularite)
          break
        case 'Localisation':
          this.array.sort((a, b) => a.distance - b.distance)
          break
        case 'Tags en commun':
          this.array.sort((a, b) => b.tagCount - a.tagCount)
          break
      }
    }
  }
}
</script>

<style>
.search {
  margin-top: 15px;
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
.searchInterests {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

}
</style>
