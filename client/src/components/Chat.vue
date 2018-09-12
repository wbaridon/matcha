<template>
  <div id="chat">
    <!-- Sent messages output -->
    <div class="messages" v-for="(msg, index) in messages" :key="index">
      <p><span>{{ msg.user }}: </span>{{ msg.message }}</p>
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
    sendMessage () {
      this.socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message
      })
      this.message = ''
    }
  },
  mounted () {
    this.socket.on('MESSAGE', (data) => {
      this.messages.push(data)
    })
  }
}
</script>
