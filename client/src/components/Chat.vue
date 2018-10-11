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
      recipient: ''
    }
  },
  mounted () {
    this.recipient = this.$route.params.userId
    this.checkMatch()
    this.getMessages()
  },
  computed: {
    messages () {
      return this.$store.state.messages[this.$route.params.userId]
    }
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
