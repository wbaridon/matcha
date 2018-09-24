<template>
  <footer>
    <Chat v-if="showChat"  @close="showChat = false"></Chat>
    <div id="showChat" @click="showChat = true" v-if="!showChat">Discussion instantanée (0)</div>
    <p>wbaridon © 2018</p>
  </footer>
</template>

<script>
import Chat from '@/components/Chat/FooterChat'
export default {
  components: {
    'Chat': Chat
  },
  data () {
    return {
      showChat: ''
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
    width: 300px;
  }
  #showChat {
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
