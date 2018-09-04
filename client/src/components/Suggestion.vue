<template>
  <div id="suggestion">
    <h1>Liste suggestion</h1>
    {{result}}
  </div>
</template>

<script>
import Suggestion from '@/services/SuggestionService'
export default {
  name: 'suggestion',
  data () {
    return {
      result: ''
    }
  },
  mounted () {
    this.getAll()
  },
  methods: {
    getAll () {
      Suggestion.getAll(callback => {
        console.log(callback)
        this.result = callback
      })
    }
  }
}
</script>

<style>

</style>
