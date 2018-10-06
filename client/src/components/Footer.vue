<template>
  <footer>
    <Matches v-if="showMatches && isAuth"  @close="showMatches = false" @openChat="openChat"></Matches>
    <div id="showMatches" @click="showMatches = true" v-if="!showMatches && isAuth">Mes matches</div>
    <Discussion v-if="showDiscussion && isAuth"  @close="showDiscussion = false" :chatId="chatId"></Discussion>
    <p>wbaridon © 2018</p>
  </footer>
</template>

<script>
import Discussion from '@/components/Chat/FooterDiscussion'
import Matches from '@/components/Chat/FooterChat'
export default {
  components: {
    'Matches': Matches,
    'Discussion': Discussion
  },
  data () {
    return {
      showMatches: '',
      showDiscussion: '',
      chatId: ''
    }
  },
  computed: {
    isAuth () {
      return this.$store.state.isAuth
    }
  },
  methods: {
    openChat (data) {
      this.showDiscussion = true
      this.chatId = data
    }
  }
}
</script>

<style>
  footer {
    color: lightgrey;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #24292e;
    width: 100%;
    position: relative;
  }
  #Footerchat {
    position: absolute;
    background-color: white;
    border: solid black 1px;
    bottom: 0;
    right: 0;
    width: 200px;
  }
  #FooterDiscussion {
    position: absolute;
    background-color: white;
    border: solid black 1px;
    right: 220px;
    width: 200px;
    bottom: 0;
  }
  .discussionContent {
    overflow: scroll;
    display: flex;
    flex-direction: column-reverse;
    height: 250px;
  }
  #showMatches {
    position: absolute;
    bottom: 0;
    right: 25px;
    background-color: lightgrey;
    color: black;
    border: solid 1px black;
    box-shadow: 5px black;
    padding: 5px;

  }
</style>
