<template>
  <div id="notifications">
    <!-- Sent messages output -->
    <div class="messages" v-for="msg in messages" :key="msg.id">
      <p><span>{{ msg.login }}: </span>{{ msg.message }}</p>
    </div>
    <form @submit.prevent="sendMessage">
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
      message: '',
      messages: [],
      socket: io('http://localhost:8081')
    }
  },
  mounted () {
    // Displays messages stored in database so far
    this.getMessages()
    this.socket.on('GET_MESSAGES', (history) => {
      console.log(history)
      this.messages = history
    })
    // Displays messages received since connection
    this.socket.on('MESSAGE', (data) => {
      this.messages.push(data)
    })
  },
  methods: {
    getMessages () {
      this.socket.emit('GET_MESSAGES', {
        token: this.$cookie.get('authToken')
      })
    },
    sendMessage () {
      this.socket.emit('SEND_MESSAGE', {
        token: this.$cookie.get('authToken'),
        message: this.message
      })
      this.message = ''
    }
  }
}
</script>
