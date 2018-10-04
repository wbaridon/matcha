<template>
  <div id="Footerchat">
    <!-- Sent messages output -->
    <div @click="close" id="topChat">Mes matches</div>
    <div id="all_discussions">
      <!-- Sent messages output -->
      <ul>
        <li class="match" v-for="match in matches" :key="match.id">
          <div class="linkBlock" @click="open(match.emitter)">
            <i v-if="match.isOnline" class="fa fa-circle fa-xs online" aria-hidden="true"></i>
            <i v-if="!match.isOnline" class="fa fa-circle fa-xs offline" aria-hidden="true"></i> {{match.firstname}}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import allMatches from '@/services/Profile/NotificationsService.js'
export default {
  name: 'chat',
  props: ['chatId'],
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
    },
    open (data) {
      this.$emit('openChat', data)
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
    text-align: center;
    display: block;
  }
  .linkBlock {
    display: block;
  }
  .match {
    list-style: none;
    padding: 5px;
    color: black;
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
  ul {
    padding: 5px;
  }
</style>
