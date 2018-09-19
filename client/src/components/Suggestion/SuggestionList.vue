<template>
  <div v-if="listData.length > 0">
    <div v-for="element in paginatedData" :key="element.id" class="card">
      <h2>{{element.firstname}} {{element.name}}</h2><br>
      {{element.age}} ans, {{element.gender}} {{element.sexuality}} à {{element.distance}} m<br>
      Pourcentage de compatibilite (A confirmer) {{element.interests}}
      Interet commun
      Score de popularite<br>
      <router-link :to="'/profile/' + element.id">Voir son profil >></router-link>
    </div>
    <button @click="prevPage" :disabled="pageNumber===0">Precedent</button>
    <button @click="nextPage" :disabled="pageNumber > (pageCount -1)">Suivant</button>
  </div>
  <div v-else class="noContent">
    Aucun resultat
  </div>
</template>

<script>
export default {
  name: 'suggestionList',
  props: {
    listData: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 10
    }
  },
  data () {
    return {
      pageNumber: 0
    }
  },
  computed: {
    pageCount () {
      let l = this.listData.length
      let s = this.size
      return Math.floor(l / s)
    },
    paginatedData () {
      const start = this.pageNumber * this.size
      const end = start + this.size
      return this.listData.slice(start, end)
    }
  },
  methods: {
    nextPage () {
      this.pageNumber++
    },
    prevPage () {
      this.pageNumber--
    }
  }
}
</script>

<style>
.noContent {
  display: flex;
  justify-content: center;
  margin-top: 15px;
  padding:  5%;
  background-color: lightgrey;
}
</style>
