<template>
  <div v-if="listData.length > 0">
    <div v-if="viewFilter(element) && filterInterest(element)" v-for="element in paginatedData" :key="element.id" class="card">
      <div class="pic">
          <img v-if="element.isProfile && !element.isFake" :src="'/static/images/uploads/'+element.filename"/>
          <img v-if="element.isProfile && element.isFake" :src="element.filename"/>
      </div>
      <div class="contentCard">
        <h2>{{element.firstname}} {{element.name}}</h2><br>
        {{element.age}} ans, {{element.gender}} {{element.sexuality}} à {{element.distance}} m<br>
        Compatible a {{element.compatibility}}% {{element.interests}}
        Interet commun {{element.tagCount}}
        Score de popularite
        <span v-for="(data, index) in element.interest" :key="index">#{{index}} </span>
        <br>
        <router-link :to="'/profile/' + element.id">Voir son profil >></router-link>
      </div>
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
    filter: {
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
    },
    viewFilter (element) {
      var count = 0
      if (element.age >= this.filter.minAge) { count++ }
      if (element.age <= this.filter.maxAge) { count++ }
      if (element.distance >= this.filter.minDistance) { count++ }
      if (element.distance <= this.filter.maxDistance) { count++ }
      if (element.popularite >= this.filter.minPop) { count++ }
      if (element.popularite <= this.filter.maxPop) { count++ }
      if (count === 6) { return true }
    },
    filterInterest (element) {
      var i = 0
      var count = 0
      for (i in this.filter.checkedInterests) {
        if (element.interest[this.filter.checkedInterests[i]]) { count++ }
      }
      if (this.filter.checkedInterests.length === count) {
        return true
      }
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
.card {
  display: flex;
  min-height: 150px;
  padding: 10px;
}
.contentCard {
  padding: 10px;
}
.pic img, .pic {
  width: 150px;
  height: 150px;
}
</style>
