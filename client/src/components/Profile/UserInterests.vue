<template>
  <div class="profileInterest">
    <h3>Vos passions</h3>
    <div id='interests'>
      <div v-for="(data, index) in interests" v-bind:key="index">
        <div v-if="data===1 && index!='id_account' && index!='id'" class='sticker' @click="del(index)">#{{index}} &times;</div>
      </div>
      <div>
      <input type="text" name="interest" v-model="search"><button @click="add(search)">Ajouter</button>
      <p v-if="search"> Nos suggestions: </p>
      <div v-if="search" v-for="index in filteredTags" v-bind:key="index">
        <p @click="add(index)" class="sticker">#{{index}} +</p>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from '@/services/ProfileService'
export default {
  name: 'UserInterests',
  props: ['userId', 'interests'],
  data () {
    return {
      search: '',
      test: []
    }
  },
  computed: {
    filteredTags: function () {
      return this.test.filter((index) => {
        return index.match(this.search)
      })
    }
  },
  mounted () {
    this.getInterestsList()
  },
  watch: {
    interests: function () {
      this.getInterestsList()
    }
  },
  methods: {
    getInterestsList () {
      Profile.getInterestsList(callback => {
        this.test = callback
      })
    },
    add (id) {
      this.$emit('updateInterest', 'add', id)
      this.search = ''
    },
    del (id) {
      this.$emit('updateInterest', 'delete', id)
    }
  }
}
</script>
