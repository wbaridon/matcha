<template>
  <div id="Footerchat">
    <!-- Sent messages output -->
    <div @click="close" id="topChat">Close X</div>
    <div id="all_discussions">
      <!-- Sent messages output -->
      <ul>
        <li class="match" v-for="match in matches" :key="match.id">
          <router-link class="linkBlock" :to="'/chat/' + match.emitter">
            <i :class="isOnline" aria-hidden="true"></i> {{match.firstname}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import allMatches from '@/services/Profile/NotificationsService.js'
export default {
  name: 'chat',
  props: ['totalMatches'],
  data () {
    return {
      matches: []
    }
  },
  mounted () {
    // Displays messages stored in database so far
    this.getMatches()
  },
  computed: {
    isOnline: function () {
      if (this.matches.online) {
        return 'fa fa-circle fa-xs online'
      } else { return 'fa fa-circle offline' }
    }
  },
  methods: {
    getMatches () {
      allMatches.getMatches(this.$cookie.get('authToken'), (response) => {
        this.matches = response
        this.$emit('totalMatches', this.matches.length)
      })
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style>
  #topChat {
    background-color: lightgrey;
    padding: 5px;
    color: black;
    text-align: right;
  }
  .linkBlock {
    display: block;
  }
  .match {
    list-style: none;
    padding: 5px;
  }
  .match:hover {
    background-color: lightgrey;
  }
  .online {
    color: green;
    font-size: 7px;
  }
  .offline {
    color: red;
    font-size: 7px;
  }
</style>
