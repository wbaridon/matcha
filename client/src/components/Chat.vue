<template>
  <div id="chat">
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
import checkMatch from '@/services/ChatService.js'
export default {
  name: 'chat',
  data () {
    return {
      message: '',
      messages: [],
      recipient: ''
    }
  },
  mounted () {
    // Gets recipient
    this.recipient = this.$route.params.userId
    // Checks if users matched
    this.checkMatch()
    // Displays messages stored in database so far
    this.getMessages()
    this.$socket.on('GET_MESSAGES', (history) => {
      this.messages = history
    })
    // Displays messages received while page not refreshed
    this.$socket.on('MESSAGE', (data) => {
      // Doesn't send MESSAGE if user isn't on right conversation
      if (this.recipient === data.userid.toString() || this.recipient === data.recipient) {
        this.messages.push(data)
      }
    })
  },
  methods: {
    getMessages () {
      this.$socket.emit('GET_MESSAGES', {
        token: this.$cookie.get('authToken'),
        recipient: this.recipient
      })
    },
    checkMatch () {
      checkMatch.checkMatch({
        recipient: this.recipient,
        token: this.$cookie.get('authToken')
      }).then(res => {
        // If user did not match, redirect to match page
        if (res === false) {
          this.$router.push('/chat')
        }
      })
    },
    sendMessage () {
      this.$socket.emit('SEND_MESSAGE', {
        token: this.$cookie.get('authToken'),
        message: this.message,
        recipient: this.recipient
      })
      this.message = ''
    }
  }
}
</script>

<style>

</style>
