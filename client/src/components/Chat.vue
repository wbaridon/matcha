<template>
  <div id="chat">
    <div id="chat_feed">
      <!-- Sent messages output -->
      <div id="chat_output"></div>
      <!-- Says if someone is writting -->
      <div id="chat_typing"></div>
    </div>
    <form @submit.prevent="sendMessage">
      <input id="username" v-model="user" type="text" placeholder="username">
      <input id="message" v-model="message" type="text" placeholder="type in your message">
      <button id="submit" type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import Chat from '@/services/ChatService'
import io from 'socket.io-client'
export default {
  name: 'chat',
  components: {
    Chat
  },
  data () {
    return {
      user: '',
      message: '',
      messages: [],
      socket: io('http://localhost:8081')
    }
  },
  methods: {
    sendMessage (e) {
      // Chat.sendMessage(this.user, callback => {
      //   this.socket.emit('SEND_MESSAGE')
      // })
      e.preventDefault()
      /* this.socket.emit('SEND_MESSAGE', {
        user: this.username,
        message: this.message
      })
      this.message = ''
    } */
    }
  }
}
</script>
