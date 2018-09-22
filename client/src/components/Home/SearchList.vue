<template>
  <div v-if="listData.length > 0">
    <div v-if="element.distance >= filter.minDistance && element.distance <= filter.maxDistance"
      v-for="element in paginatedData" :key="element.id" class="searchElement">
      <h2>{{element.firstname}} {{element.name}}</h2>
      {{element.gender}} {{element.age}} ans / Popularite: {{element.popularite}}<br> {{element.distance}}m
      <span v-for="(data, index) in element.interest" :key="index">#{{index}} </span>
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
  name: 'searchList',
  props: {
    listData: {
      type: Array,
      required: true
    },
    size: {
      type: Number,
      required: false,
      default: 10
    },
    filter: {
      required: true
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
