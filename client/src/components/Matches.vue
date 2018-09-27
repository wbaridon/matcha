<template>
  <div id="all_discussions">
    <!-- Sent messages output -->
    <div class="indiv_discussion" v-for="match in matches" :key="match.id">
      <p><span>{{ match.emitter }}: </span><router-link v-bind:to="match.emitter.toString()" append>click here to chat</router-link></p>
    </div>
  </div>
</template>

<script>
import allMatches from '@/services/Profile/NotificationsService.js'
export default {
  name: 'allChat',
  data () {
    return {
      matches: []
    }
  },
  mounted () {
    // Displays messages stored in database so far
    this.getMatches()
  },
  methods: {
    getMatches () {
      allMatches.getMatches(this.$cookie.get('authToken'), (response) => {
        this.matches = response
      })
    }
  }
}
</script>
<style>
</style>
