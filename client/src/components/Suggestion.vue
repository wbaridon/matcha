<template>
  <div id="suggestion">
    <h1>Liste suggestion</h1>
      <div v-for="list in result" :key="list.id">
      {{list.login}}
    </div>
  </div>
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

</style>
