<template>
  <div id="FooterDiscussion">
    <!-- Sent messages output -->
    <div @click="close" id="topChat">Close</div>
    <div class="discussionContent">
      <div class="messages" v-for="msg in messages.slice().reverse()" :key="msg.id">
          <p><span>{{ msg.login }}: </span>{{ msg.message }}</p>
      </div>
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
  props: ['chatId'],
  data () {
    return {
      message: '',
      recipient: ''
    }
  },
  watch: {
    chatId: function (newVal, oldVal) {
      this.recipient = this.chatId
      this.checkMatch()
      this.getMessages()
    }
  },
  computed: {
    messages () {
      return this.$store.state.messages[this.chatId]
    }
  },
  mounted () {
    // Gets recipient
    this.recipient = this.chatId
    // Checks if users matched
    this.checkMatch()
    // Displays messages stored in database so far
    this.getMessages()
  },
  methods: {
    getMessages () {
      this.$socket.emit('GET_MESSAGES', {
        token: this.$cookie.get('authToken'),
        recipient: this.chatId
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
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
